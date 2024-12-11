'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { HiHeart } from 'react-icons/hi';

export default function PrayerCard() {
    const prayer = {
        verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        reference: "Jeremiah 29:11",
        prayer: "Dear Lord, guide me in my journey to find meaningful connections. Help me to be patient and trust in Your perfect timing. Amen."
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#3F3F94] to-[#B492DE] rounded-2xl p-6 text-white shadow-sm"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className={`text-lg ${relative.bold.className}`}>Prayer of the Day</h3>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/80 hover:text-white"
                >
                    <HiHeart className="w-5 h-5" />
                </motion.button>
            </div>

            <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                    <p className={`text-sm italic mb-2 ${relative.medium.className}`}>
                        "{prayer.verse}"
                    </p>
                    <p className={`text-xs text-white/80 ${relative.book.className}`}>
                        {prayer.reference}
                    </p>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                    <p className={`text-sm ${relative.book.className}`}>
                        {prayer.prayer}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
