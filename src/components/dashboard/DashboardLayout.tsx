'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import SideNavigation from './navigation/SideNavigation';
import MainContent from './main/MainContent';
import RightSidebar from './sidebar/RightSidebar';

export default function DashboardLayout() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <div className="flex h-screen bg-[#F3EAFF]">
            {/* Left Navigation - 10% */}
            <SideNavigation 
                isExpanded={isNavExpanded} 
                onExpandChange={setIsNavExpanded} 
            />

            {/* Main Content - 60% */}
            <main className={`flex-grow max-w-[60%] transition-all duration-300 ${
                isNavExpanded ? 'ml-64' : 'ml-20'
            }`}>
                <MainContent />
            </main>

            {/* Right Sidebar - 30% */}
            <aside className="w-[30%] border-l border-[#B492DE]/20">
                <RightSidebar />
            </aside>
        </div>
    );
}
