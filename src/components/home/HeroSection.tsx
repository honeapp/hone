'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';
import Link from 'next/link';


export default function HeroSection() {
    return (
        <div className="relative h-screen">
            <Image
                src="/images/hero-bg.jpg"
                alt="Hero Background"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40">
                {/* Navigation Bar */}
                <div className="absolute top-0 w-full py-4 md:py-6 px-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Image
                            src="/images/logo-white.svg"
                            alt="HOEC Logo"
                            width={120}
                            height={40}
                            className="h-8 md:h-10 w-auto"
                        />
                        <div className="flex items-center space-x-4 md:space-x-8">
    <Link href="/auth/login">
        <button className={`text-white text-sm md:text-base ${relative.medium.className}`}>
            Sign In
        </button>
    </Link>
    
    <Link href="/register">
        <button className={`bg-white text-[#100F0A] px-4 md:px-6 py-2 rounded-xl text-sm md:text-base ${relative.medium.className}`}>
            Join Now
        </button>
    </Link>
</div>

                    </div>
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white max-w-4xl"
                    >
                        <h1 className={`text-4xl md:text-6xl lg:text-[90px] font-black leading-tight mb-4 md:mb-6 ${relative.bold.className}`}>
                            <span>Cr</span>
                            <span className="italic">o</span>
                            <span>ss pa</span>
                            <span className="italic">t</span>
                            <span>hs.</span>
                            <br />
                            <span>Da</span>
                            <span className="italic">t</span>
                            <span>e lo</span>
                            <span className="italic">ca</span>
                            <span>l.</span>
                        </h1>
                       
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`text-lg md:text-2xl mb-8 md:mb-12 ${relative.book.className}`}
                        >
                            Make it happn.
                        </motion.p>

                        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white text-[#100F0A] px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition-colors"
                            >
                                <Image
                                    src="/images/appstore-dark.svg"
                                    alt="App Store"
                                    width={24}
                                    height={24}
                                    className="w-5 md:w-6"
                                />
                                <span className={`text-sm md:text-base ${relative.medium.className}`}>App Store</span>
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white text-[#100F0A] px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-100 transition-colors"
                            >
                                <Image
                                    src="/images/googleplay-dark.svg"
                                    alt="Google Play"
                                    width={24}
                                    height={24}
                                    className="w-5 md:w-6"
                                />
                                <span className={`text-sm md:text-base ${relative.medium.className}`}>Google Play</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
