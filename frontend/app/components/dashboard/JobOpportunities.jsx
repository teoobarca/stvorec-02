"use client";

import { useState, useEffect } from "react";
import { Briefcase, TrendingUp, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useProfessionData from "../../hooks/useProfessionData";

export default function JobOpportunities() {
    const { data: professionData, loading, error } = useProfessionData();
    const [jobs, setJobs] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        if (!professionData || !professionData.career_recommendations) return;
        setJobs(professionData.career_recommendations);
    }, [professionData]);

    if (loading) {
        return (
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-zinc-400">Loading job opportunities...</div>
                </div>
            </div>
        );
    }

    if (error || jobs.length === 0) {
        return (
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-zinc-400">{error || "No job recommendations available"}</div>
                </div>
            </div>
        );
    }

    const getTransitionColor = (ease) => {
        if (ease === "Easy") return { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400" };
        if (ease === "Medium") return { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400" };
        return { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400" };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">Career Opportunities</h2>
                </div>
                <p className="text-sm text-zinc-400">
                    Alternative career paths based on your transferable skills
                </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
                {jobs.map((job, index) => {
                    const colors = getTransitionColor(job.ease_of_transition);
                    const isExpanded = expandedIndex === index;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
                        >
                            {/* Job Header */}
                            <button
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                className=" hover:cursor-pointer w-full p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white">
                                                {job.job_title}
                                            </h3>
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.border} ${colors.text} border`}>
                                                {job.ease_of_transition} Transition
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-300 leading-relaxed">
                                            {job.reason}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-zinc-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-zinc-400" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-white/10"
                                    >
                                        <div className="p-6 space-y-6">
                                            {/* Transferable Skills */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                                    <h4 className="font-semibold text-white">Your Transferable Skills</h4>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-2">
                                                    {job.transferable_skills.map((skill, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-start gap-2 text-sm text-zinc-300 bg-green-500/5 border border-green-500/20 rounded-lg px-3 py-2"
                                                        >
                                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                            <span>{skill}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* New Skills Needed */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                                    <h4 className="font-semibold text-white">Skills to Develop</h4>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-2">
                                                    {job.new_skills_needed.map((skill, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-start gap-2 text-sm text-zinc-300 bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2"
                                                        >
                                                            <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                                            <span>{skill}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Transition Summary */}
                                            <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
                                                <div className="flex items-start gap-3">
                                                    <Briefcase className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                                                    <div>
                                                        <h5 className="font-semibold text-white mb-1">Transition Path</h5>
                                                        <p className="text-sm text-zinc-300">
                                                            This role leverages <strong>{job.transferable_skills.length} of your existing skills</strong> and
                                                            requires learning <strong>{job.new_skills_needed.length} new competencies</strong>.
                                                            The transition difficulty is rated as <strong className={colors.text}>{job.ease_of_transition}</strong>.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
