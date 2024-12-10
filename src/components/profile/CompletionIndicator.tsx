'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';

interface CompletionIndicatorProps {
    percentage: number;
}

export default function CompletionIndicator({ percentage }: CompletionIndicatorProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg text-[#100F0A] ${relative.medium.className}`}>
                    Profile Completion
                </h3>
                <span className={`text-2xl text-[#100F0A] ${relative.bold.className}`}>
                    {percentage}%
                </span>
            </div>
            
            <div className="h-2 bg-[#100F0A]/10 rounded-full">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full bg-[#100F0A] rounded-full"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            {percentage < 100 && (
                <p className="mt-4 text-sm text-[#100F0A]/60">
                    Complete your profile to increase your chances of finding matches
                </p>
            )}
        </div>
    );
}
