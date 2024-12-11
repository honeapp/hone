'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { HiStar, HiHeart, HiChat } from 'react-icons/hi';

export default function Achievements() {
    const achievements = [
        { icon: <HiStar className="w-5 h-5" />, label: 'Profile Complete', progress: 80 },
        { icon: <HiHeart className="w-5 h-5" />, label: 'Matches Made', count: 5 },
        { icon: <HiChat className="w-5 h-5" />, label: 'Active Chats', count: 3 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
        >
            <h3 className={`text-lg mb-4 ${relative.bold.className}`}>Achievements</h3>
            <div className="space-y-4">
                {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#F3EAFF] rounded-full flex items-center justify-center text-[#3F3F94]">
                            {achievement.icon}
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm ${relative.medium.className}`}>{achievement.label}</p>
                            {'progress' in achievement ? (
                                <div className="h-2 bg-gray-100 rounded-full mt-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${achievement.progress}%` }}
                                        className="h-full bg-[#3F3F94] rounded-full"
                                    />
                                </div>
                            ) : (
                                <p className={`text-sm text-gray-500 ${relative.book.className}`}>
                                    {achievement.count}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
