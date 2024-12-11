'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';
import { useState } from 'react';
import { HiHeart, HiX } from 'react-icons/hi';

interface Profile {
    id: number;
    name: string;
    age: number;
    location: string;
    bio: string;
    images: string[];
    denomination: string;
}

export default function SwipeableCards() {
    const [currentProfile, setCurrentProfile] = useState<Profile>({
        id: 1,
        name: "Sarah Johnson",
        age: 28,
        location: "New York, USA",
        bio: "Walking with faith and looking for a meaningful connection.",
        images: ["/images/profiles/sarah1.jpg"],
        denomination: "Catholic"
    });

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    return (
        <div className="relative h-[600px] flex items-center justify-center">
            <motion.div
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: -1000, right: 1000 }}
                onDragEnd={(event, info) => {
                    if (Math.abs(info.offset.x) > 100) {
                        // Handle swipe
                        console.log(info.offset.x > 0 ? 'liked' : 'passed');
                    }
                }}
                className="absolute w-[380px] cursor-grab active:cursor-grabbing"
            >
                <div className="relative h-[580px] rounded-3xl overflow-hidden bg-white shadow-xl">
                    <Image
                        src={currentProfile.images[0]}
                        alt={currentProfile.name}
                        fill
                        className="object-cover"
                    />
                    
                    {/* Profile Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className={`text-2xl text-white mb-2 ${relative.bold.className}`}>
                            {currentProfile.name}, {currentProfile.age}
                        </h3>
                        <p className={`text-white/80 mb-4 ${relative.book.className}`}>
                            {currentProfile.location}
                        </p>
                        <p className={`text-white/90 ${relative.medium.className}`}>
                            {currentProfile.denomination}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500"
                >
                    <HiX className="w-8 h-8" />
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-green-500"
                >
                    <HiHeart className="w-8 h-8" />
                </motion.button>
            </div>
        </div>
    );
}
