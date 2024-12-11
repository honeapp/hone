'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import ProfileCircles from './ProfileCircles';
import SwipeableCards from './SwipeableCards';

export default function MainContent() {
    return (
        <div className="h-full p-8 space-y-8 overflow-y-auto">
            {/* Horizontal scrolling profile circles */}
            <ProfileCircles />
            
            {/* Swipeable cards section */}
            <SwipeableCards />
        </div>
    );
}
