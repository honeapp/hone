'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';

export default function IntentionsSection() {
    const cards = [
        {
            text: 'Here to date',
            icon: '🎯',
            background: 'bg-white'
        },
        {
            text: 'Ready for a relationship',
            icon: '💝',
            background: 'bg-white/80'
        },
        {
            text: 'Open to chat',
            icon: '💭',
            background: 'bg-white/60'
        }
    ];

    return (
        <div className="bg-gradient-to-b from-[#F3EAFF] to-[#FBF8F1] py-16 md:py-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Left side - Image with floating cards */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-[640px]"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src="/images/dating-intentions.png"
                                alt="Dating Intentions"
                                fill
                                className="object-cover rounded-[20px] md:rounded-[40px] shadow-2xl"
                            />
                        </motion.div>
                       
                        {/* Floating cards */}
                        <div className="absolute right-[-5%] md:right-[-10%] top-1/2 -translate-y-1/2 space-y-4 md:space-y-8">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.text}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.2,
                                        duration: 0.8,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className={`
                                        ${card.background} backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6
                                        flex items-center space-x-3 md:space-x-6 shadow-xl
                                        transform hover:scale-105 transition-transform duration-300
                                        max-w-[240px] md:max-w-none
                                    `}
                                >
                                    <span className="text-2xl md:text-3xl">{card.icon}</span>
                                    <span className={`text-[#100F0A] text-base md:text-xl ${relative.medium.className}`}>
                                        {card.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center space-y-8 md:space-y-12"
                    >
                        <h2 className={`text-[#100F0A] text-3xl md:text-5xl leading-tight ${relative.bold.className}`}>
                            Meet people who want
                            <span className="block">the same thing.</span>
                        </h2>
                       
                        <div className="space-y-6 md:space-y-8 text-[#100F0A]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                            >
                                <p className={`text-xl md:text-2xl ${relative.medium.className}`}>
                                    Get what you want out of dating.
                                </p>
                                <p className={`text-xl md:text-2xl ${relative.medium.className}`}>
                                    No need to apologise.
                                </p>
                            </motion.div>
                           
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="space-y-2"
                            >
                                <p className={`text-xl md:text-2xl ${relative.medium.className}`}>
                                    Just want to chat? That's OK.
                                </p>
                                <p className={`text-xl md:text-2xl ${relative.medium.className}`}>
                                    Ready to settle down? Love that.
                                </p>
                                <p className={`text-xl md:text-2xl ${relative.medium.className}`}>
                                    And if you ever change your mind, you absolutely can.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
