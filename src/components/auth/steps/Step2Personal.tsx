'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { FaMars, FaVenus } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

export default function Step2Personal({ formData, setFormData, errors, setErrors }: any) {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const autoCompleteRef = useRef<HTMLInputElement>(null);

    const validateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        if (age < 18) {
            setErrors({ ...errors, dateOfBirth: 'You must be at least 18 years old' });
            return false;
        }
        
        if (age > 80) {
            setErrors({ ...errors, dateOfBirth: 'Please enter a valid date of birth' });
            return false;
        }
        
        setErrors({ ...errors, dateOfBirth: '' });
        return true;
    };

    useEffect(() => {
        if (scriptLoaded && autoCompleteRef.current && window.google) {
            try {
                const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
                    types: ['(cities)'],
                    fields: ['formatted_address', 'geometry']
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place.formatted_address) {
                        setFormData({ ...formData, location: place.formatted_address });
                        setErrors({ ...errors, location: '' });
                    }
                });
            } catch (error) {
                console.log('Google Places API not enabled yet');
            }
        }
    }, [scriptLoaded]);

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, location: value });
        
        if (!value) {
            setErrors({ ...errors, location: 'Location is required' });
        } else if (value.length < 2) {
            setErrors({ ...errors, location: 'Location must be at least 2 characters' });
        } else {
            setErrors({ ...errors, location: '' });
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, dateOfBirth: value });
        validateAge(value);
    };

    return (
        <div className="space-y-6">
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                onLoad={() => setScriptLoaded(true)}
                strategy="afterInteractive"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
            >
                <div>
                    <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleDateChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                </div>

                <div>
                    <label className={`block mb-4 text-[#100F0A] ${relative.medium.className}`}>
                        Gender
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: 'male', icon: <FaMars className="w-8 h-8" />, label: 'Male' },
                            { value: 'female', icon: <FaVenus className="w-8 h-8" />, label: 'Female' }
                        ].map((option) => (
                            <motion.div
                                key={option.value}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setFormData({ ...formData, gender: option.value });
                                    setErrors({ ...errors, gender: '' });
                                }}
                                className={`
                                    cursor-pointer p-6 rounded-xl
                                    flex flex-col items-center justify-center gap-3
                                    transition-all duration-300
                                    ${formData.gender === option.value
                                        ? 'bg-[#100F0A] text-white'
                                        : 'bg-white border-2 border-gray-200 hover:border-[#100F0A] text-[#100F0A]'}
                                `}
                            >
                                {option.icon}
                                <span className={`text-lg ${relative.medium.className}`}>
                                    {option.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                    {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                    )}
                </div>

                <div>
                    <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                        Location
                    </label>
                    <div className="relative">
                        <input
                            ref={autoCompleteRef}
                            type="text"
                            value={formData.location}
                            onChange={handleLocationChange}
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
        </div>
    );
}
