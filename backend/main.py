import asyncio
import json
from typing import List, Dict, Any, Union, Literal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.agents.structured_output import ProviderStrategy
from dotenv import load_dotenv
from prompts import (
    TASKS_DECOMPOSITION_SYSTEM_PROMPT, 
    TASKS_REPLACABILITY_SYSTEM_PROMPT,
    SKILLS_DECOMPOSITION_SYSTEM_PROMPT,
    SKILLS_REPLACABILITY_SYSTEM_PROMPT,
    SCENARIO_GENERATION_SYSTEM_PROMPT,
    CAREER_RECOMMENDATIONS_SYSTEM_PROMPT
)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserProfile(BaseModel):
    age: str
    gender: str
    job_title: str
    job_description: str
    daily_routine: str
    location: str
    education: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "age": "25 rokov",
                    "gender": "muz",
                    "job_title": "psycholog",
                    "job_description": "Pomaham klientom s ich mentalnym stavom na zaklade medziludskej komunikacie.",
                    "daily_routine": "Skoro rano pridem do prace, citam si diar, pride klient, s ktorym prekonzultujem ich problemy, zanalyzujem ich situaciu, pinpointujem nihc zivotne problemy a postupne casom sa snazim ezlepsit ich mentalny stav",
                    "location": "kancelaria v Kosiciach",
                    "education": "univerzita komenskeho v Bratislave, psychologia"
                }
            ]
        }
    }

# Renamed models for clarity
class Task(BaseModel):
    task_name: str = Field(description="Name of the specific task performed in the job")
    time_share: float = Field(description="Fraction of total work time spent on this task (must verify all tasks sum to 1.0)")

class Skill(BaseModel):
    skill_name: str = Field(description="Name of the specific skill required for the job")
    importance: float = Field(description="Importance weight of this skill (must verify all skills sum to 1.0)")

class AutomationScore(BaseModel):
    score: float = Field(description="Automation score 0.0-1.0 (1.0 being fully automatable)")

class TaskDecomposition(BaseModel):
    tasks: List[Task] = Field(description="List of decomposed tasks that make up the job profile", min_length=3, max_length=20)

class SkillDecomposition(BaseModel):
    skills: List[Skill] = Field(description="List of decomposed skills that make up the job profile", min_length=3, max_length=15)

class FutureScenario(BaseModel):
    title: str = Field(description="Title of the scenario")
    description: str = Field(description="Description of how the job role evolves in this scenario")
    likelihood: Literal["low", "medium", "high"] = Field(description="Estimated likelihood: Low, Medium, High")

class FutureScenarios(BaseModel):
    scenarios: List[FutureScenario] = Field(description="List of 1 to 3 different future scenarios", min_length=1, max_length=3)

class CareerOption(BaseModel):
    job_title: str = Field(description="Title of the recommended alternative career")
    reason: str = Field(description="Explanation of why this is a good fit")
    transferable_skills: List[str] = Field(description="List of skills the user already possesses that are relevant")
    new_skills_needed: List[str] = Field(description="List of new skills the user needs to acquire")
    ease_of_transition: Literal["Low", "Medium", "High"] = Field(description="Estimated difficulty of transitioning to this role")

class CareerRecommendations(BaseModel):
    recommendations: List[CareerOption] = Field(description="List of 3 to 5 recommended career options", min_length=3, max_length=5)


llm = ChatOpenAI(
    model="gpt-5.1",
    # temperature=1
)

async def evaluate_automation_potential(
    item: Union[Task, Skill], 
    job_context: str, 
    item_type: str, 
    semaphore: asyncio.Semaphore
) -> float:
    """
    Generic function to evaluate automation potential for either a Task or a Skill.
    """
    async with semaphore:
        llm_evaluator = ChatOpenAI(
            model="gpt-5.1",
            reasoning={
                "effort": "high"
            }
        )
        structured_llm = llm_evaluator.with_structured_output(AutomationScore)
        
        if item_type == "task":
            system_prompt = TASKS_REPLACABILITY_SYSTEM_PROMPT
            user_prompt = f"""
            Job Context: {job_context}
            
            Task to Analyze:
            Name: {item.task_name}
            Time Share: {item.time_share}
            
            Judge the automation potential of this specific task by AI in the future.
            """
        else: # skill
            system_prompt = SKILLS_REPLACABILITY_SYSTEM_PROMPT
            user_prompt = f"""
            Job Context: {job_context}
            
            Skill to Analyze:
            Name: {item.skill_name}
            Importance: {item.importance}
            
            Judge the automation potential of this specific skill by AI in the future.
            """
        
        messages = [
            ("system", system_prompt),
            ("human", user_prompt)
        ]
        
        analysis = await structured_llm.ainvoke(messages)
        return analysis.score


@app.post("/analyze")
async def analyze_profile(profile: UserProfile):
    job_context = f"""Age: {profile.age}
Gender: {profile.gender}
Job Title: {profile.job_title}
Job Description: {profile.job_description}
Daily Routine: {profile.daily_routine}
Location: {profile.location}
Education: {profile.education}"""

    # 1. Decomposition Agents (Parallel)
    agent_tasks = create_agent(
        llm,
        response_format=ProviderStrategy(TaskDecomposition),
        tools=[{"type": "web_search_preview"}]
    )
    
    agent_skills = create_agent(
        llm,
        response_format=ProviderStrategy(SkillDecomposition),
        tools=[{"type": "web_search_preview"}]
    )
    
    task_future = agent_tasks.ainvoke({
        "messages": [
            ("system", TASKS_DECOMPOSITION_SYSTEM_PROMPT),
            ("human", f"User Profile:\n{job_context}")
        ]
    })
    
    skill_future = agent_skills.ainvoke({
        "messages": [
            ("system", SKILLS_DECOMPOSITION_SYSTEM_PROMPT),
            ("human", f"User Profile:\n{job_context}")
        ]
    })
    
    result_tasks, result_skills = await asyncio.gather(task_future, skill_future)
    
    tasks: List[Task] = result_tasks["structured_response"].tasks
    skills: List[Skill] = result_skills["structured_response"].skills
    
    # 2. Automation Analysis (Parallel)
    semaphore = asyncio.Semaphore(10)
    
    # We gather scores directly instead of creating Analyzed objects
    task_scores_future = asyncio.gather(*[
        evaluate_automation_potential(task, job_context, "task", semaphore) 
        for task in tasks
    ])
    
    skill_scores_future = asyncio.gather(*[
        evaluate_automation_potential(skill, job_context, "skill", semaphore) 
        for skill in skills
    ])
    
    task_scores_list, skill_scores_list = await asyncio.gather(task_scores_future, skill_scores_future)
    
    # 3. Calculate Results
    
    # Tasks
    task_automation_breakdown = {}
    total_task_automation = 0.0
    
    for task, score in zip(tasks, task_scores_list):
        weighted_val = task.time_share * score
        task_automation_breakdown[task.task_name] = {
            "score": score,
            "weighted_score": weighted_val,
            "time_share": task.time_share
        }
        total_task_automation += weighted_val

    # Skills
    skill_automation_breakdown = {}
    total_skill_automation = 0.0
    
    for skill, score in zip(skills, skill_scores_list):
        weighted_val = skill.importance * score
        skill_automation_breakdown[skill.skill_name] = {
            "score": score,
            "weighted_score": weighted_val,
            "importance": skill.importance
        }
        total_skill_automation += weighted_val
    
    weighted_final_score = (total_task_automation * 0.4) + (total_skill_automation * 0.6)
    
    # 4. Generate Future Scenarios & Career Recommendations (Concurrent)
    
    # Prepare detailed data for generation
    analysis_summary = {
        "job_context": job_context,
        "tasks_analysis": task_automation_breakdown,
        "skills_analysis": skill_automation_breakdown,
        "total_automation_score": weighted_final_score
    }
    analysis_summary_json = json.dumps(analysis_summary, indent=2)
    
    # Scenario Agent
    agent_scenarios = create_agent(
        llm,
        response_format=ProviderStrategy(FutureScenarios),
        tools=[{"type": "web_search_preview"}]
    )
    
    # Career Recommendation Agent
    agent_careers = create_agent(
        llm,
        response_format=ProviderStrategy(CareerRecommendations),
        tools=[{"type": "web_search_preview"}]
    )
    
    # Launch both concurrently
    scenarios_future = agent_scenarios.ainvoke({
        "messages": [
            ("system", SCENARIO_GENERATION_SYSTEM_PROMPT),
            ("human", f"Full Job Analysis Data:\n{analysis_summary_json}")
        ]
    })
    
    careers_future = agent_careers.ainvoke({
        "messages": [
            ("system", CAREER_RECOMMENDATIONS_SYSTEM_PROMPT),
            ("human", f"Full Job Analysis Data:\n{analysis_summary_json}")
        ]
    })
    
    result_scenarios, result_careers = await asyncio.gather(scenarios_future, careers_future)
    
    return {
        "task_automation_breakdown": task_automation_breakdown,
        "total_task_automation": total_task_automation,
        "skill_automation_breakdown": skill_automation_breakdown,
        "total_skill_automation": total_skill_automation,
        "weighted_final_score": weighted_final_score,
        "future_scenarios": result_scenarios["structured_response"].scenarios,
        "career_recommendations": result_careers["structured_response"].recommendations
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
