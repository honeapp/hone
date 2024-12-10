'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { relative } from '@/app/fonts';
import ClientOnly from '../ClientOnly';
import { signIn } from 'next-auth/react';
import MultiStepForm from './MultiStepForm';
import { SocialButton } from './components/SocialButton';
import { Divider } from './components/Divider';
import { AuthMethodButton } from './components/AuthMethodButton';
import { AuthInput } from './components/AuthInput';
import { AppDownload } from './components/AppDownload';
import CookieConsent from '../common/CookieConsent';



type AuthMethod = 'email' | 'phone' | null;

export default function RegisterContainer() {
    const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState({
        google: false,
        facebook: false,
        email: false
    });
    const [error, setError] = useState('');
    const [showMultiStep, setShowMultiStep] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone: string) => {
        const regex = /^\+?[1-9]\d{1,14}$/;
        return regex.test(phone);
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(prev => ({ ...prev, google: true }));
            await signIn('google', {
                callbackUrl: '/onboarding',
                redirect: true,
                prompt: 'select_account'
            });
        } catch (error) {
            setError('Google sign in failed. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, google: false }));
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            setLoading(prev => ({ ...prev, facebook: true }));
            await signIn('facebook', { callbackUrl: '/onboarding' });
        } catch (error) {
            setError('Facebook sign in failed. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, facebook: false }));
        }
    };

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(prev => ({ ...prev, email: true }));
    
        try {
            if (authMethod === 'email') {
                if (!validateEmail(email)) {
                    throw new Error('Please enter a valid email address');
                }
                    
    // Check if user exists with any provider
    const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!data.available) {
        // If user exists, redirect to login
        window.location.href = '/auth/login';
        return;
    }

    setShowMultiStep(true);
}
} catch (error: any) {
setError(error.message);
} finally {
setLoading(prev => ({ ...prev, email: false }));
}
};
    
    const checkEmailAvailability = async (email: string) => {
        try {
            const response = await fetch('/api/auth/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            return data.available;
        } catch (error) {
            console.error('Email check failed:', error);
            return false;
        }
    };
    
    return (
        <ClientOnly>
            <div className="min-h-screen bg-gradient-to-br from-[#FBF8F1] to-white">
                <div className="absolute inset-0 bg-black/48">
                    <AnimatePresence mode="wait">
                        {!showMultiStep ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="container mx-auto px-4 py-12"
                            >
                                
<div className="max-w-[480px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-[#100F0A]">

                                    <div className="p-8">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`text-4xl font-bold text-center mb-8 ${relative.bold.className}`}
                                        >
                                            Find Your Soulmate
                                        </motion.h1>

                                        {/* Social Login Buttons */}
                                        <div className="space-y-4 mb-8">
                                            <SocialButton
                                                icon={<FcGoogle className="w-5 h-5" />}
                                                text="Continue with Google"
                                                onClick={handleGoogleSignIn}
                                                loading={loading.google}
                                            />
                                            <SocialButton
                                                icon={<FaFacebook className="w-5 h-5" />}
                                                text="Continue with Facebook"
                                                onClick={handleFacebookSignIn}
                                                loading={loading.facebook}
                                                className="bg-[#1877F2]"
                                            />
                                        </div>

                                        <Divider text="or" />

                                        {/* Auth Method Selection */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <AuthMethodButton
                                                method="email"
                                                current={authMethod}
                                                onClick={() => setAuthMethod('email')}
                                                icon={<HiMail className="w-5 h-5" />}
                                            />
                                            <AuthMethodButton
                                                method="phone"
                                                current={authMethod}
                                                onClick={() => setAuthMethod('phone')}
                                                icon={<HiPhone className="w-5 h-5" />}
                                            />
                                        </div>

                                        {/* Auth Input Form */}
                                        {authMethod && (
                                            <motion.form
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                onSubmit={handleContinue}
                                                className="space-y-4"
                                            >
                                                {/* The relevant section where you're handling form input */}
                                                <AuthInput
            type={authMethod}
            value={authMethod === 'email' ? email : phone}
            onChange={(value) => {
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
            className={`w-full bg-[#100F0A] text-white rounded-xl p-4 ${
                loading.email ? 'opacity-50' : 'hover:bg-[#2d2d2d]'
            } transition-all duration-300`}
        >
            {loading.email ? 'Please wait...' : 'Continue'}
        </button>
    </motion.form>
)}

                                        {/* App Download Section */}
                                        <AppDownload />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <MultiStepForm initialEmail={email} />
                        )}
                    </AnimatePresence>

                    <CookieConsent />
                </div>
            </div>
        </ClientOnly>
    );
}
