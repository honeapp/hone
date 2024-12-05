'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { HiCheckCircle } from 'react-icons/hi';
import Link from 'next/link';

export default function VerifiedPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-[480px] mx-auto bg-[#FBF8F1] rounded-2xl shadow-2xl p-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <HiCheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`text-3xl font-bold mt-6 mb-4 text-[#100F0A] ${relative.bold.className}`}
                >
                    Email Verified!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`text-[#100F0A]/60 mb-8 ${relative.book.className}`}
                >
                    Your account has been successfully verified. You can now access all features.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                >
                    <Link href="/dashboard" 
                        className={`block w-full bg-[#100F0A] text-white rounded-xl py-4 hover:bg-[#2d2d2d] transition-all duration-300 ${relative.medium.className}`}
                    >
                        Go to Dashboard
                    </Link>
                    
                    <Link href="/profile" 
                        className={`block w-full bg-white text-[#100F0A] rounded-xl py-4 hover:bg-[#100F0A]/5 transition-all duration-300 ${relative.medium.className}`}
                    >
                        Complete Your Profile
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
