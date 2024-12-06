'use client';

import { relative } from '@/app/fonts';
import { motion } from 'framer-motion';

export function AppDownload() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-[#100F0A]/8 p-8 rounded-xl"
        >
            <h2 className={`text-xl font-bold text-center mb-6 text-[#100F0A] ${relative.bold.className}`}>
                Or get the app
            </h2>
            <div className="flex justify-center items-center space-x-4">
                <img
                    src="/images/appstore-dark.svg"
                    alt="Download on App Store"
                    className="h-[45px] w-auto cursor-pointer hover:opacity-90 transition-opacity"
                />
                <img
                    src="/images/googleplay-dark.svg"
                    alt="Get it on Google Play"
                    className="h-[45px] w-auto cursor-pointer hover:opacity-90 transition-opacity object-contain"
                />
            </div>
        </motion.div>
    );
}
