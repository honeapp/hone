'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';

export default function CookieConsent() {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white"
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
                <div className={`flex-1 min-w-[280px] ${relative.book.className}`}>
                    <p className="text-sm text-[#100F0A]">
                        By clicking "I agree", you accept the use of cookies to optimize user experience.
                        <a href="#" className="underline ml-1">See our list of partners</a>
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className={`bg-[#100F0A] text-white px-6 py-2 rounded-xl hover:bg-[#2d2d2d] transition-all duration-300 ${relative.medium.className}`}>
                        Accept
                    </button>
                    <button className={`text-sm text-[#100F0A] hover:underline transition-all duration-300 ${relative.book.className}`}>
                        Continue without accepting
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
