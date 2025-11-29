import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputNode, DecompositionNode, AgentNode, ScoringNode, ScenarioNode } from './Nodes';
import { Edge } from './Edges';

// Mock Data matching main.py models
const MOCK_DATA = {
    profile: {
        age: "25 rokov",
        gender: "muz",
        jobTitle: "psycholog",
        jobDescription: "Pomaham klientom s ich mentalnym stavom na zaklade medziludskej komunikacie.",
        dailyRoutine: "Skoro rano pridem do prace, citam si diar, pride klient...",
        location: "kancelaria v Kosiciach",
        education: "univerzita komenskeho v Bratislave, psychologia"
    },
    tasks: [
        { task_name: "Individuálne terapeutické sedenia", time_share: 0.45, score: 0.15 },
        { task_name: "Diagnostické rozhovory", time_share: 0.10, score: 0.25 },
        { task_name: "Vedenie klinickej dokumentácie", time_share: 0.08, score: 0.85 },
        { task_name: "Príprava terapeutických plánov", time_share: 0.06, score: 0.60 },
    ],
    skills: [
        { skill_name: "Aktívne počúvanie", importance: 0.20, score: 0.05 },
        { skill_name: "Empatická komunikácia", importance: 0.20, score: 0.10 },
        { skill_name: "Analytické myslenie", importance: 0.15, score: 0.65 },
        { skill_name: "Práca s dokumentáciou", importance: 0.10, score: 0.90 },
    ],
    scenarios: [
        {
            title: "Hybridný Terapeut",
            description: "AI preberá administratívu a diagnostiku (30% práce), terapeut sa sústredí na hlbokú intervenciu.",
            likelihood: "high"
        },
        {
            title: "Supervízor AI Agentov",
            description: "Terapeut manažuje AI, ktorá robí prvotný kontakt a základnú terapiu.",
            likelihood: "medium"
        }
    ]
};

const DataFlow = () => {
    const [step, setStep] = useState(0); // 0: Input, 1: Decomp, 2: Agents, 3: Scoring, 4: Scenarios

    // Calculate totals for visualization
    const totalTaskAutomation = MOCK_DATA.tasks.reduce((acc, t) => acc + (t.time_share * t.score), 0);
    const totalSkillAutomation = MOCK_DATA.skills.reduce((acc, s) => acc + (s.importance * s.score), 0);
    const finalScore = (totalTaskAutomation * 0.4) + (totalSkillAutomation * 0.6);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                setStep(s => Math.min(s + 1, 4));
            } else if (e.key === 'ArrowLeft') {
                setStep(s => Math.max(s - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Node Positions
    const positions = {
        input: { x: 100, y: 300 },
        tasks: { x: 400, y: 150 },
        skills: { x: 400, y: 450 },
        agent1: { x: 700, y: 100 },
        agent2: { x: 700, y: 300 },
        agent3: { x: 700, y: 500 },
        scoring: { x: 1000, y: 300 },
        scenario1: { x: 1300, y: 200 },
        scenario2: { x: 1300, y: 400 },
    };

    return (
        <div className="relative w-full h-screen bg-void overflow-hidden flex items-center justify-center">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative w-[1600px] h-[800px]">
                {/* Edges */}
                <AnimatePresence>
                    {step >= 1 && (
                        <>
                            <Edge start={{ x: 350, y: 300 }} end={{ x: 400, y: 150 }} active={true} />
                            <Edge start={{ x: 350, y: 300 }} end={{ x: 400, y: 450 }} active={true} />
                        </>
                    )}
                    {step >= 2 && (
                        <>
                            <Edge start={{ x: 650, y: 150 }} end={{ x: 700, y: 100 }} active={true} />
                            <Edge start={{ x: 650, y: 150 }} end={{ x: 700, y: 300 }} active={true} />
                            <Edge start={{ x: 650, y: 450 }} end={{ x: 700, y: 500 }} active={true} />
                        </>
                    )}
                    {step >= 3 && (
                        <>
                            <Edge start={{ x: 950, y: 100 }} end={{ x: 1000, y: 300 }} active={true} />
                            <Edge start={{ x: 950, y: 300 }} end={{ x: 1000, y: 300 }} active={true} />
                            <Edge start={{ x: 950, y: 500 }} end={{ x: 1000, y: 300 }} active={true} />
                        </>
                    )}
                    {step >= 4 && (
                        <>
                            <Edge start={{ x: 1200, y: 300 }} end={{ x: 1300, y: 200 }} active={true} />
                            <Edge start={{ x: 1200, y: 300 }} end={{ x: 1300, y: 400 }} active={true} />
                        </>
                    )}
                </AnimatePresence>

                {/* Nodes */}
                <div className="absolute" style={{ left: positions.input.x, top: positions.input.y - 50 }}>
                    <InputNode data={MOCK_DATA.profile} />
                </div>

                {step >= 1 && (
                    <>
                        <div className="absolute" style={{ left: positions.tasks.x, top: positions.tasks.y - 50 }}>
                            <DecompositionNode title="Tasks" items={MOCK_DATA.tasks} type="tasks" />
                        </div>
                        <div className="absolute" style={{ left: positions.skills.x, top: positions.skills.y - 50 }}>
                            <DecompositionNode title="Skills" items={MOCK_DATA.skills} type="skills" />
                        </div>
                    </>
                )}

                {step >= 2 && (
                    <>
                        <div className="absolute" style={{ left: positions.agent1.x, top: positions.agent1.y - 50 }}>
                            <AgentNode taskName={MOCK_DATA.tasks[0].task_name} status={step >= 3 ? "complete" : "analyzing"} score={MOCK_DATA.tasks[0].score} />
                        </div>
                        <div className="absolute" style={{ left: positions.agent2.x, top: positions.agent2.y - 50 }}>
                            <AgentNode taskName={MOCK_DATA.tasks[2].task_name} status={step >= 3 ? "complete" : "analyzing"} score={MOCK_DATA.tasks[2].score} />
                        </div>
                        <div className="absolute" style={{ left: positions.agent3.x, top: positions.agent3.y - 50 }}>
                            <AgentNode taskName={MOCK_DATA.skills[0].skill_name} status={step >= 3 ? "complete" : "analyzing"} score={MOCK_DATA.skills[0].score} />
                        </div>
                    </>
                )}

                {step >= 3 && (
                    <div className="absolute" style={{ left: positions.scoring.x, top: positions.scoring.y - 50 }}>
                        <ScoringNode
                            taskScore={totalTaskAutomation}
                            skillScore={totalSkillAutomation}
                            finalScore={finalScore}
                        />
                    </div>
                )}

                {step >= 4 && (
                    <>
                        <div className="absolute" style={{ left: positions.scenario1.x, top: positions.scenario1.y - 50 }}>
                            <ScenarioNode {...MOCK_DATA.scenarios[0]} />
                        </div>
                        <div className="absolute" style={{ left: positions.scenario2.x, top: positions.scenario2.y - 50 }}>
                            <ScenarioNode {...MOCK_DATA.scenarios[1]} />
                        </div>
                    </>
                )}
            </div>

            {/* Controls Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                <p className="text-gray-500 font-mono text-xs mb-2">USE ARROW KEYS TO NAVIGATE</p>
                <div className="flex gap-1 justify-center">
                    {[0, 1, 2, 3, 4].map(s => (
                        <div
                            key={s}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${step >= s ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataFlow;
