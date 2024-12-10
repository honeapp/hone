'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { relative } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { AuthInput } from '@/components/auth/components/AuthInput';
import { SocialButton } from '@/components/auth/components/SocialButton';
import { Divider } from '@/components/auth/components/Divider';

type AuthMethod = 'email' | 'phone' | null;

export default function LoginPage() {
    const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState({
        email: false,
        google: false,
        facebook: false
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(prev => ({ ...prev, email: true }));
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: authMethod === 'email' ? email : phone 
                })
            });

            const data = await response.json();

            if (data.success) {
                router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, email: false }));
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        try {
            setLoading(prev => ({ ...prev, [provider]: true }));
            await signIn(provider, {
                callbackUrl: '/profile',
                redirect: true
            });
        } catch (error) {
            setError(`${provider} login failed`);
        } finally {
            setLoading(prev => ({ ...prev, [provider]: false }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FBF8F1] to-white">
            <div className="absolute inset-0 bg-black/48">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-4 py-12 relative"
                >
                    <div className="max-w-[480px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8">
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-4xl font-bold text-center mb-8 text-[#100F0A] ${relative.bold.className}`}
                            >
                                Welcome Back!
                            </motion.h1>

                            {/* Social Login Buttons */}
                            <div className="space-y-4 mb-8">
                                <SocialButton
                                    icon={<FcGoogle className="w-5 h-5" />}
                                    text="Continue with Google"
                                    onClick={() => handleSocialLogin('google')}
                                    loading={loading.google}
                                />
                                <SocialButton
                                    icon={<FaFacebook className="w-5 h-5" />}
                                    text="Continue with Facebook"
                                    onClick={() => handleSocialLogin('facebook')}
                                    loading={loading.facebook}
                                    className="bg-[#1877F2]"
                                />
                            </div>

                            <Divider text="or continue with" />

                            {/* Auth Method Toggle */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {['email', 'phone'].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setAuthMethod(method as AuthMethod)}
                                        className={`p-4 rounded-xl flex items-center justify-center space-x-2 transition-all
                                            ${authMethod === method 
                                                ? 'bg-[#100F0A] hover:bg-[#100F0A]/20 text-[#fff]'
                                                : 'bg-gray-100 hover:bg-gray-200 text-[#000]'
                                            }`}
                                    >
                                        {method === 'email' ? <HiMail className="w-5 h-5" /> : <HiPhone className="w-5 h-5" />}
                                        <span className="capitalize">{method}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Login Form */}
                            <motion.form
                                onSubmit={handleEmailLogin}
                                className="space-y-4"
                            >
                                <AuthInput
                                    type={authMethod || 'email'}
                                    value={authMethod === 'email' ? email : phone}
                                    onChange={(value) => {
                                        setError('');
                                        if (authMethod === 'email') {
                                            setEmail(value);
                                        } else {
                                            setPhone(value);
                                        }
                                    }}
                                    error={error}
                                    loading={loading.email}
                                />

                                <button
                                    type="submit"
                                    disabled={loading.email}
                                    className={`w-full bg-[#100F0A] text-white rounded-xl p-4 flex items-center justify-center space-x-3 
                                        ${loading.email ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2d2d2d]'} 
                                        transition-all duration-300 ${relative.medium.className}`}
                                >
                                    {loading.email ? 'Please wait...' : 'Continue'}
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
