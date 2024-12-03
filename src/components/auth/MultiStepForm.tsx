'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { relative } from '@/app/fonts';
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
          photos: ''
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
          if (!validateStep()) {
              return;
          }

          if (step === 5) {
              try {
                  const response = await fetch('/api/auth/register', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                  });

                  const data = await response.json();

                  if (!response.ok) {
                      throw new Error(data.message || 'Registration failed');
                  }

                  // Handle successful registration
                  window.location.href = '/dashboard';
              } catch (error) {
                  console.error('Registration error:', error);
                  setErrors(prev => ({
                      ...prev,
                      submit: error.message
                  }));
              }
          } else {
              setStep(step + 1);
          }
      };

      const steps = [
          { number: 1, title: "Basic Info" },
          { number: 2, title: "Personal Details" },
          { number: 3, title: "Faith Journey" },
          { number: 4, title: "Lifestyle" },
          { number: 5, title: "Photos & Bio" }
      ];

      const calculateProgress = () => {
          return (step / steps.length) * 100;
      };

      return (
          <div className="container mx-auto px-4 py-12 relative">
              <div className="max-w-[480px] mx-auto bg-[#FBF8F1] rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-8">
                      {/* Enhanced Progress Indicator */}
                      <div className="mb-8">
                          <div className="flex justify-between mb-4">
                              {steps.map((stepItem) => (
                                  <div
                                      key={stepItem.number}
                                      className={`flex flex-col items-center ${
                                          step >= stepItem.number ? 'text-[#100F0A]' : 'text-gray-400'
                                      }`}
                                  >
                                      <div
                                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                                              step >= stepItem.number 
                                                  ? 'bg-[#100F0A] text-white' 
                                                  : 'bg-gray-200'
                                          }`}
                                      >
                                          {step > stepItem.number ? '✓' : stepItem.number}
                                      </div>
                                      <span className={`text-xs ${relative.medium.className} hidden sm:block`}>
                                          {stepItem.title}
                                      </span>
                                  </div>
                              ))}
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                              <motion.div
                                  className="h-full bg-[#100F0A] rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${calculateProgress()}%` }}
                                  transition={{ duration: 0.3 }}
                              />
                          </div>
                      </div>

                      <motion.h2
                          className={`text-2xl font-bold text-center mb-6 text-[#100F0A] ${relative.bold.className}`}
                      >
                          {step === 1 && "Create your account"}
                          {step === 2 && "Tell us about yourself"}
                          {step === 3 && "Your faith journey"}
                          {step === 4 && "Lifestyle & Interests"}
                          {step === 5 && "Almost there!"}
                      </motion.h2>

                      <AnimatePresence mode="wait">
                          {renderStep()}
                      </AnimatePresence>
                   
                      <div className="flex justify-between mt-8">
                          {step > 1 && (
                              <button
                                  onClick={() => setStep(step - 1)}
                                  className={`px-6 py-2 text-[#100F0A] hover:bg-[#100F0A]/5 rounded-xl transition-all duration-300 ${relative.medium.className}`}
                              >
                                  Back
                              </button>
                          )}
                          <button
                              onClick={handleSubmit}
                              disabled={!validateStep()}
                              className={`ml-auto px-6 py-2 bg-[#100F0A] text-white rounded-xl hover:bg-[#2d2d2d] transition-all duration-300 ${
                                  validateStep() ? '' : 'opacity-50 cursor-not-allowed'
                              } ${relative.medium.className}`}
                          >
                              {step === 5 ? 'Complete' : 'Continue'}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
