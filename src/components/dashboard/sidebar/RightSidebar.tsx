'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import RecentMessages from './RecentMessages';
import Achievements from './Achievements';
import ProfileViews from './ProfileViews';
import PrayerCard from './PrayerCard';

export default function RightSidebar() {
    return (
        <div className="h-full p-6 space-y-6 overflow-y-auto">
            <RecentMessages />
            <Achievements />
            <ProfileViews />
            <PrayerCard />
        </div>
    );
}
