'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';

export default function RecentMessages() {
    const messages = [
        {
            id: 1,
            name: 'Sarah Johnson',
            message: 'Hey, how are you doing?',
            time: '2m ago',
            image: '/images/profiles/1.jpg',
            unread: true
        },
        {
            id: 2,
            name: 'Michael Smith',
            message: 'Would you like to join...',
            time: '1h ago',
            image: '/images/profiles/2.jpg',
            unread: false
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
        >
            <h3 className={`text-lg mb-4 ${relative.bold.className}`}>Recent Messages</h3>
            <div className="space-y-4">
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 cursor-pointer"
                    >
                        <div className="relative">
                            <Image
                                src={message.image}
                                alt={message.name}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            {message.unread && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm ${relative.medium.className}`}>{message.name}</p>
                            <p className={`text-xs text-gray-500 ${relative.book.className}`}>{message.message}</p>
                        </div>
                        <span className={`text-xs text-gray-400 ${relative.book.className}`}>{message.time}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
