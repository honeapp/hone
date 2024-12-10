'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { FaMars, FaVenus } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';


export default function Step2Personal({ formData, setFormData, errors, setErrors }: any) {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const autoCompleteRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scriptLoaded && autoCompleteRef.current && window.google) {
            const autocomplete = new google.maps.places.Autocomplete(autoCompleteRef.current, {
                types: ['(cities)'],
                fields: ['formatted_address']
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    setFormData(prev => ({ ...prev, location: place.formatted_address }));
                    if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                }
            });
        }
    }, [scriptLoaded]);

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                onLoad={() => setScriptLoaded(true)}
            />
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
            >
                {/* Date of Birth */}
                <div>
                    <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                        Date of Birth
                    </label>
                    <DatePicker
                        selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                        onChange={(date) => {
                            setFormData(prev => ({ ...prev, dateOfBirth: date }));
                            setErrors(prev => ({ ...prev, dateOfBirth: '' }));
                        }}
                        maxDate={new Date()}
                        minDate={new Date('1923-01-01')}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        placeholderText="Select your birth date"
                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                        wrapperClassName="w-full"
                        calendarClassName="rounded-xl border shadow-lg"
                        dateFormat="MMMM d, yyyy"
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                </div>

                {/* Gender Selection */}
                <div>
                    <label className={`block mb-4 text-[#100F0A] ${relative.medium.className}`}>
                        Gender
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: 'male', icon: FaMars, label: 'Male', bgColor: '#4B6BFB', textColor: '#FFFFFF' },
                            { value: 'female', icon: FaVenus, label: 'Female', bgColor: '#FB4B97', textColor: '#FFFFFF' }
                        ].map((option) => (
                            <motion.div
                                key={option.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, gender: option.value }));
                                    setErrors(prev => ({ ...prev, gender: '' }));
                                }}
                                style={{
                                    backgroundColor: formData.gender === option.value ? option.bgColor : 'white',
                                }}
                                className={`
                                    cursor-pointer p-6 rounded-xl
                                    flex flex-col items-center justify-center gap-3
                                    transition-all duration-300
                                    ${formData.gender === option.value 
                                        ? 'border-2 border-transparent shadow-lg' 
                                        : 'border-2 border-gray-200 hover:border-[#100F0A]'}
                                `}
                            >
                                <option.icon 
                                    className="w-8 h-8" 
                                    style={{ 
                                        color: formData.gender === option.value ? option.textColor : option.bgColor 
                                    }} 
                                />
                                <span 
                                    className={`text-lg ${relative.medium.className}`}
                                    style={{ 
                                        color: formData.gender === option.value ? option.textColor : '#100F0A' 
                                    }}
                                >
                                    {option.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Location Selection */}
                <div>
                    <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                        Location
                    </label>
                    <div className="relative">
                        <input
                            ref={autoCompleteRef}
                            type="text"
                            value={formData.location}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, location: e.target.value }));
                                if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                            }}
                            placeholder="Enter your city..."
                            className="w-full p-4 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                        />
                        <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                </div>
            </motion.div>
        </>
    );
}
