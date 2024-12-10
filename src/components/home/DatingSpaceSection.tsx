'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';

export default function DatingSpaceSection() {
    return (
        <div className="bg-gradient-to-b from-[#3F3F94] to-[rgba(63,63,148,0.70)] py-16 md:py-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Left side - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center order-2 md:order-1"
                    >
                        <h2 className={`text-white text-3xl md:text-5xl leading-tight mb-8 md:mb-12 ${relative.bold.className}`}>
                            A space just for Dating.
                        </h2>
                       
                        <p className={`text-white text-lg md:text-2xl leading-relaxed ${relative.book.className}`}>
                            Your HOEC Dating profile and conversations won't be shared with anyone outside of Dating.
                            And everything you need to start your separate Dating profile is already on the app you know.
                        </p>
                    </motion.div>

                    {/* Right side - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[300px] md:h-[508px] order-1 md:order-2"
                    >
                        <Image
                            src="/images/dating-space.png"
                            alt="Dating Space"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
