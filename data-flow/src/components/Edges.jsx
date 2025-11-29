import React from 'react';
import { motion } from 'framer-motion';

export const Edge = ({ start, end, active = false }) => {
    // Calculate path
    // Simple bezier curve
    const controlPoint1 = { x: start.x + (end.x - start.x) / 2, y: start.y };
    const controlPoint2 = { x: start.x + (end.x - start.x) / 2, y: end.y };

    const path = `M ${start.x} ${start.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${end.x} ${end.y}`;

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
            {/* Background Line */}
            <path
                d={path}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
                fill="none"
            />

            {/* Animated Line */}
            {active && (
                <motion.path
                    d={path}
                    stroke="#00F0FF"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 0.5
                    }}
                />
            )}
        </svg>
    );
};
