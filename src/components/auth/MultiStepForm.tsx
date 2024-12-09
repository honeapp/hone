'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { relative } from '@/app/fonts';
import { HiCheck, HiChevronLeft } from 'react-icons/hi';
import Step1Basic from './steps/Step1Basic';
import Step2Personal from './steps/Step2Personal';
import Step3Religious from './steps/Step3Religious';
import Step4Lifestyle from './steps/Step4Lifestyle';
import Step5Photos from './steps/Step5Photos';

interface MultiStepFormProps {
    initialEmail: string;
}

export default function MultiStepForm({ initialEmail }: MultiStepFormProps) {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({
        password: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        location: '',
        churchDenomination: '',
        maritalStatus: '',
        interests: '',
        occupation: '',
        about: '',
        photos: '',
        submit: ''
    });

    const [formData, setFormData] = useState({
        email: initialEmail,
        password: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        location: '',
        churchDenomination: '',
        maritalStatus: '',
        interests: [] as string[],
        occupation: '',
        about: '',
        photos: [] as string[]
    });

    const steps = [
        { number: 1, title: "Basic Info", description: "Set up your account" },
        { number: 2, title: "Personal Details", description: "Tell us about yourself" },
        { number: 3, title: "Faith Journey", description: "Your spiritual path" },
        { number: 4, title: "Lifestyle", description: "Your interests & habits" },
        { number: 5, title: "Photos & Bio", description: "Show yourself" }
    ];

    const validateStep = () => {
        switch(step) {
            case 1:
                return !errors.password && !errors.fullName && formData.password && formData.fullName;
            case 2:
                return !errors.dateOfBirth && !errors.gender && !errors.location && 
                     formData.dateOfBirth && formData.gender && formData.location;
            case 3:
                return !errors.churchDenomination && !errors.maritalStatus && 
                     formData.churchDenomination && formData.maritalStatus;
            case 4:
                return !errors.occupation && !errors.interests && 
                     formData.occupation && formData.interests.length > 0;
            case 5:
                return !errors.about && formData.about;
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return <Step1Basic formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 2:
                return <Step2Personal formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 3:
                return <Step3Religious formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 4:
                return <Step4Lifestyle formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            case 5:
                return <Step5Photos formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        if (step === 5) {
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Registration failed');
                window.location.href = '/auth/login';
            } catch (error: any) {
                console.error('Registration error:', error);
                setErrors(prev => ({ ...prev, submit: error.message }));
            }
        } else {
            setStep(step + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FBF8F1] to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Vertical Progress - Desktop */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-8 space-y-8">
                            {steps.map((stepItem, index) => (
                                <div key={stepItem.number} className="relative">
                                    <div className="flex items-start">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            step >= stepItem.number ? 'bg-[#100F0A] text-white' : 'bg-gray-200'
                                        }`}>
                                            {step > stepItem.number ? <HiCheck className="w-6 h-6" /> : stepItem.number}
                                        </div>
                                        <div className="ml-4">
                                            <p className={`font-medium ${step >= stepItem.number ? 'text-[#100F0A]' : 'text-gray-400'}`}>
                                                {stepItem.title}
                                            </p>
                                            <p className="text-sm text-[#100F0A]/60">{stepItem.description}</p>
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="absolute left-5 top-10 h-16 w-[2px] bg-gray-200">
                                            <div className="bg-[#100F0A] w-full transition-all duration-300"
                                                style={{ height: step > stepItem.number ? '100%' : '0%' }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            {/* Horizontal Progress - Mobile */}
                            <div className="flex overflow-x-auto lg:hidden mb-8 pb-4">
                                {steps.map((stepItem) => (
                                    <div key={stepItem.number} 
                                         className={`flex-shrink-0 w-1/3 px-2 ${step === stepItem.number ? 'opacity-100' : 'opacity-50'}`}>
                                        <div className="h-2 bg-gray-200 rounded-full">
                                            <div className={`h-full rounded-full transition-all duration-300 ${
                                                step >= stepItem.number ? 'bg-[#100F0A]' : ''
                                            }`} />
                                        </div>
                                        <p className="text-xs mt-2 text-[#000]">{stepItem.title}</p>
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className={`text-3xl font-bold text-[#000] mb-8 ${relative.bold.className}`}>
                                        {steps[step - 1].title}
                                        <p className="text-sm text-[#000] mt-2 font-normal">
                                        {steps[step - 1].description}
                                        </p>
                                    </h2>

                                    {renderStep()}

                                    {errors.submit && (
                                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl">
                                            {errors.submit}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-8 pt-8 border-t">
                                        {step > 1 && (
                                            <button
                                                onClick={() => setStep(step - 1)}
                                                className="flex items-center px-6 py-3 text-[#100F0A] hover:bg-[#100F0A]/5 rounded-xl transition-all duration-300"
                                            >
                                                <HiChevronLeft className="w-5 h-5 mr-2" />
                                                Back
                                            </button>
                                        )}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!validateStep()}
                                            className={`ml-auto px-8 py-3 bg-[#100F0A] text-white rounded-xl
                                                ${validateStep() 
                                                    ? 'hover:bg-[#2d2d2d] transform hover:scale-105' 
                                                    : 'opacity-50 cursor-not-allowed'
                                                } transition-all duration-300`}
                                        >
                                            {step === 5 ? 'Complete Registration' : 'Continue'}
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
