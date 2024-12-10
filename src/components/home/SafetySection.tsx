'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';

export default function SafetySection() {
    return (
        <div className="bg-[#F3EAFF] py-16 md:py-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Left side - Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 md:order-1"
                    >
                        <div className="bg-[#B492DE] rounded-[20px] md:rounded-[30px] overflow-hidden aspect-[517/368]">
                            <Image
                                src="/images/safety-first.png"
                                alt="Safety First"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center order-1 md:order-2"
                    >
                        <h2 className={`text-[#121212] text-3xl md:text-4xl leading-tight mb-6 md:mb-8 ${relative.bold.className}`}>
                            Safety first,
                            <br />
                            second, and always.
                        </h2>
                       
                        <div className="space-y-4 md:space-y-6">
                            <p className={`text-[#121212] text-lg md:text-xl ${relative.book.className}`}>
                                Your safety is our number one priority.
                            </p>
                           
                            <p className={`text-[#121212] text-lg md:text-xl leading-relaxed ${relative.book.className}`}>
                                Our Safety Centre is a knowledge hub, containing all the support you need to date with confidence.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
