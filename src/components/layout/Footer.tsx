'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    const footerSections = [
        {
            title: "About HOEC",
            links: ["Our Story", "Careers", "Media", "Success Stories"]
        },
        {
            title: "HOEC for all",
            links: ["Dating Tips", "Safety", "Community Guidelines", "Support"]
        },
        {
            title: "The legal stuff",
            links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Intellectual Property"]
        }
    ];

    const socialLinks = [
        { icon: <FaTwitter />, href: "#", label: "Twitter" },
        { icon: <FaInstagram />, href: "#", label: "Instagram" },
        { icon: <FaFacebook />, href: "#", label: "Facebook" },
        { icon: <FaYoutube />, href: "#", label: "YouTube" }
    ];

    return (
        <footer className="bg-[#100F0A]">
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-8 md:mb-16">
                    {/* Logo and Social Section */}
                    <div className="col-span-1">
                        <Image
                            src="/images/logo-white.svg"
                            alt="HOEC Logo"
                            width={120}
                            height={87}
                            className="mb-6 md:mb-8"
                        />
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-white hover:text-[#B492DE] text-lg md:text-xl transition-colors"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="col-span-1">
                            <h3 className={`text-white text-base md:text-lg mb-4 md:mb-6 ${relative.bold.className}`}>
                                {section.title}
                            </h3>
                            <ul className="space-y-3 md:space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className={`text-white/80 hover:text-white transition-colors text-sm md:text-base ${relative.book.className}`}
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* App Store Buttons */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8 md:mb-16">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border border-white/20 rounded-xl p-3 md:p-4 flex items-center justify-center md:justify-start space-x-3"
                    >
                        <Image
                            src="/images/app-store-icon.svg"
                            alt="App Store"
                            width={20}
                            height={20}
                            className="w-5 md:w-6"
                        />
                        <span className={`text-white text-sm md:text-base ${relative.medium.className}`}>
                            Download on the App Store
                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black border border-white/20 rounded-xl p-3 md:p-4 flex items-center justify-center md:justify-start space-x-3"
                    >
                        <Image
                            src="/images/google-play-icon.svg"
                            alt="Google Play"
                            width={20}
                            height={20}
                            className="w-5 md:w-6"
                        />
                        <span className={`text-white text-sm md:text-base ${relative.medium.className}`}>
                            Get it on Google Play
                        </span>
                    </motion.button>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className={`text-white/60 text-xs md:text-sm text-center md:text-left ${relative.book.className}`}>
                        © 2024 Heaven on Earth Connections. All rights reserved.
                    </p>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
                        <Link
                            href="#"
                            className={`text-white/60 hover:text-white text-xs md:text-sm text-center transition-colors ${relative.book.className}`}
                        >
                            Accessibility
                        </Link>
                        <Link
                            href="#"
                            className={`text-white/60 hover:text-white text-xs md:text-sm text-center transition-colors ${relative.book.className}`}
                        >
                            Modern Slavery Statement
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
