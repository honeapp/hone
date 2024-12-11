'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';

export default function ProfileViews() {
    const recentViews = [
        {
            id: 1,
            name: 'Rachel Adams',
            time: '2 hours ago',
            image: '/images/profiles/3.jpg',
            mutualConnections: 3
        },
        {
            id: 2,
            name: 'David Chen',
            time: '5 hours ago',
            image: '/images/profiles/4.jpg',
            mutualConnections: 1
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg ${relative.bold.className}`}>Profile Views</h3>
                <span className={`text-sm text-[#3F3F94] ${relative.medium.className}`}>
                    Last 24h
                </span>
            </div>
            
            <div className="space-y-4">
                {recentViews.map((view) => (
                    <motion.div
                        key={view.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 cursor-pointer"
                    >
                        <Image
                            src={view.image}
                            alt={view.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                        <div className="flex-1">
                            <p className={`text-sm ${relative.medium.className}`}>{view.name}</p>
                            <p className={`text-xs text-gray-500 ${relative.book.className}`}>
                                {view.mutualConnections} mutual connection{view.mutualConnections > 1 ? 's' : ''}
                            </p>
                        </div>
                        <span className={`text-xs text-gray-400 ${relative.book.className}`}>
                            {view.time}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
