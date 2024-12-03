'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { relative } from '@/app/fonts';
import ClientOnly from '../ClientOnly';
import { signIn } from 'next-auth/react';
import MultiStepForm from './MultiStepForm';

export default function RegisterContainer() {
    const [showEmail, setShowEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showMultiStep, setShowMultiStep] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleGoogleSignIn = async () => {
        await signIn('google', { 
            callbackUrl: '/onboarding',
            redirect: true,
            prompt: 'select_account'
        });
    };


    

    const handleFacebookSignIn = () => {
        signIn('facebook', { callbackUrl: '/onboarding' });
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError('');
        setShowMultiStep(true);
    };

    return (
        <ClientOnly>
            <div className="min-h-screen bg-white relative">
                <div className="absolute inset-0 bg-black/48">
                    <AnimatePresence mode="wait">
                        {!showMultiStep ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="container mx-auto px-4 py-12 relative"
                            >
                                <div className="max-w-[480px] mx-auto bg-[#FBF8F1] rounded-2xl shadow-2xl overflow-hidden">
                                    {/* Existing header */}
                                    <div className="p-8">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className={`text-4xl font-bold text-center mb-8 text-[#100F0A] ${relative.bold.className}`}
                                        >
                                            Let's go!
                                        </motion.h1>
                                        
                                        <div className="space-y-4">
                                            {/* Google Button */}
                                            <motion.button
                                                onClick={handleGoogleSignIn}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className={`w-full bg-[#100F0A] text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-[#2d2d2d] transition-all duration-300 ${relative.medium.className}`}
                                            >
                                                <div className="w-6 flex justify-center">
                                                    <FcGoogle className="w-5 h-5" />
                                                </div>
                                                <span>Continue with Google</span>
                                            </motion.button>

                                            {/* Facebook Button */}
                                            <motion.button
                                                onClick={handleFacebookSignIn}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className={`w-full bg-[#1877F2] text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-[#1864d4] transition-all duration-300 ${relative.medium.className}`}
                                            >
                                                <div className="w-6 flex justify-center">
                                                    <FaFacebook className="w-5 h-5" />
                                                </div>
                                                <span>Continue with Facebook</span>
                                            </motion.button>

                                            {/* Email Form */}
                                            <AnimatePresence>
                                                {showEmail && (
                                                    <motion.form
                                                        onSubmit={handleEmailSignIn}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="space-y-4"
                                                    >
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Enter your email"
                                                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A] placeholder:text-gray-400"
                                                        />
                                                        {emailError && (
                                                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                                        )}
                                                        <button
                                                            type="submit"
                                                            className={`w-full bg-[#100F0A] text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-[#2d2d2d] transition-all duration-300 ${relative.medium.className}`}
                                                        >
                                                            <div className="w-6 flex justify-center">
                                                                <HiMail className="w-5 h-5" />
                                                            </div>
                                                            <span>Continue with Email</span>
                                                        </button>
                                                    </motion.form>
                                                )}
                                            </AnimatePresence>

                                            {/* More options button */}
                                            {!showEmail && (
                                                <motion.button
                                                    onClick={() => setShowEmail(true)}
                                                    className={`w-full text-center text-sm text-[#100F0A]/60 hover:text-[#100F0A] transition-all duration-300 ${relative.book.className}`}
                                                >
                                                    More options
                                                </motion.button>
                                            )}
                                        </div>

                                        {/* App download section */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="mt-12 bg-[#100F0A]/8 p-8 rounded-xl"
                                        >
                                            <h2 className={`text-xl font-bold text-center mb-6 text-[#100F0A] ${relative.bold.className}`}>Or get the app</h2>
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
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <MultiStepForm initialEmail={email} />
                        )}
                    </AnimatePresence>

                    {/* Cookie consent banner */}
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
                </div>
            </div>
        </ClientOnly>
    );
}
