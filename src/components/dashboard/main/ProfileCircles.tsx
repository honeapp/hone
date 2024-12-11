'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';
import { useRef } from 'react';

export default function ProfileCircles() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const profiles = [
        { id: 1, name: 'Sarah', location: 'New York', image: '/images/profiles/1.jpg' },
        { id: 2, name: 'Rachel', location: 'London', image: '/images/profiles/2.jpg' },
        { id: 3, name: 'Jessica', location: 'Paris', image: '/images/profiles/3.jpg' },
        // Add more profiles
    ];

    return (
        <div className="relative">
            <motion.div 
                ref={scrollRef}
                className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            >
                {profiles.map((profile) => (
                    <motion.div
                        key={profile.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0"
                    >
                        <div className="relative w-20 h-20">
                            <Image
                                src={profile.image}
                                alt={profile.name}
                                fill
                                className="rounded-full object-cover border-2 border-white shadow-lg"
                            />
                        </div>
                        <div className="mt-2 text-center">
                            <p className={`text-sm text-[#100F0A] ${relative.medium.className}`}>
                                {profile.name}
                            </p>
                            <p className={`text-xs text-[#100F0A]/60 ${relative.book.className}`}>
                                {profile.location}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
