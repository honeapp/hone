'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { relative } from '@/app/fonts';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import OTPInput from '@/components/auth/components/OTPInput';

export default function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');

    const handleVerify = async () => {
        if (loading || otp.some(digit => !digit)) return;
        
        setLoading(true);
        setError('');
    
        try {
            console.log('Attempting verification with:', {
                email,
                otp: otp.join('')
            });
    
            const result = await signIn('credentials', {
                email,
                otp: otp.join(''),
                redirect: false,
                callbackUrl: '/profile' // Add explicit callback URL
            });
    
            console.log('SignIn result:', result);
    
            if (result?.error) {
                setError('Invalid or expired code');
                return;
            }
    
            if (result?.url) {
                router.push(result.url);
            }
        } catch (error) {
            console.error('Verification error:', error);
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleResendOTP = async () => {
        if (resendDisabled) return;
        
        setResendDisabled(true);
        setCountdown(30);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setError('New code sent successfully');
                setOtp(['', '', '', '']);
                
                // Start countdown
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setResendDisabled(false);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        } catch (error) {
            setError('Failed to resend code');
            setResendDisabled(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FBF8F1] to-white">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-4 py-12"
                >
                    <div className="max-w-[480px] mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-8"
                            >
                                <h1 className={`text-3xl font-bold mb-4 text-[#100F0A] ${relative.bold.className}`}>
                                    Verify Your Email
                                </h1>
                                <p className={`text-[#100F0A]/60 ${relative.book.className}`}>
                                    Enter the 4-digit code sent to <br/>
                                    <span className="font-medium text-[#100F0A]">{email}</span>
                                </p>
                            </motion.div>

                            <OTPInput
                                value={otp}
                                onChange={(index, value) => {
                                    const newOtp = [...otp];
                                    newOtp[index] = value;
                                    setOtp(newOtp);
                                    setError('');
                                }}
                                onComplete={handleVerify}
                            />

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-red-500 mt-4"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.button
                                onClick={handleVerify}
                                disabled={loading || otp.some(digit => !digit)}
                                className={`w-full mt-8 bg-[#100F0A] text-white rounded-xl p-4
                                    ${loading || otp.some(digit => !digit) 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:bg-[#2d2d2d] hover:shadow-lg transform hover:-translate-y-0.5'
                                    } transition-all duration-300`}
                            >
                                {loading ? 'Verifying...' : 'Verify Email'}
                            </motion.button>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleResendOTP}
                                    disabled={resendDisabled}
                                    className={`text-sm ${
                                        resendDisabled 
                                            ? 'text-gray-400 cursor-not-allowed' 
                                            : 'text-[#100F0A]/60 hover:text-[#100F0A]'
                                    } transition-colors`}
                                >
                                    {resendDisabled 
                                        ? `Resend code in ${countdown}s` 
                                        : 'Resend code'}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
