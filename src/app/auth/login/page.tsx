'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiMail } from 'react-icons/hi';
import { relative } from '@/app/fonts';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white relative">
            <div className="absolute inset-0 bg-black/48">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 py-12 relative"
                >
                    <div className="max-w-[480px] mx-auto bg-[#FBF8F1] rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-4xl font-bold text-center mb-8 text-[#100F0A] ${relative.bold.className}`}
                            >
                                Welcome Back!
                            </motion.h1>
                            
                            <div className="space-y-4">
                                <motion.form 
                                    onSubmit={handleEmailLogin}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-[#100F0A] text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-[#2d2d2d] transition-all duration-300 ${
                                            loading ? 'opacity-50 cursor-not-allowed' : ''
                                        } ${relative.medium.className}`}
                                    >
                                        <HiMail className="w-5 h-5" />
                                        <span>{loading ? 'Sending...' : 'Continue with Email'}</span>
                                    </button>
                                </motion.form>

                                <div className={`text-center text-[#100F0A]/60 ${relative.book.className}`}>
                                    or
                                </div>

                                <motion.button
                                    onClick={() => signIn('google', { callbackUrl: '/profile' })}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className={`w-full bg-[#100F0A] text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:bg-[#2d2d2d] transition-all duration-300 ${relative.medium.className}`}
                                >
                                    <FcGoogle className="w-5 h-5" />
                                    <span>Continue with Google</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
