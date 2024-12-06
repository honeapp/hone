'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { useState, useEffect, useRef } from 'react';
import * as Icons from 'react-icons/fa';
import debounce from 'lodash/debounce';

interface Interest {
    name: string;
    icon: string;
}

interface InterestCategory {
    category: string;
    interests: Interest[];
}

export default function Step4Lifestyle({ formData, setFormData, errors, setErrors }: any) {
    const [occupationSuggestions, setOccupationSuggestions] = useState<string[]>([]);
    const [interestCategories, setInterestCategories] = useState<InterestCategory[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const debouncedSearch = useRef(
        debounce(async (search: string) => {
            if (search.length < 2) return;
            const res = await fetch(`/api/occupations/search?q=${search}`);
            const data = await res.json();
            setOccupationSuggestions(data);
            setShowSuggestions(true);
        }, 300)
    ).current;

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const res = await fetch('/api/interests');
                const data = await res.json();
                setInterestCategories(data);
            } catch (error) {
                console.error('Failed to fetch interests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterests();
    }, []);

    const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, occupation: value });
        debouncedSearch(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            {/* Occupation Autocomplete */}
            <div className="relative">
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Occupation
                </label>
                <input
                    type="text"
                    value={formData.occupation}
                    onChange={handleOccupationChange}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                    placeholder="Enter your occupation"
                />
                {showSuggestions && occupationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
                        {occupationSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => {
                                    setFormData({ ...formData, occupation: suggestion });
                                    setShowSuggestions(false);
                                }}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Interests Grid */}
            <div>
                <label className={`block mb-4 text-[#100F0A] ${relative.medium.className}`}>
                    Interests & Hobbies
                </label>
                {interestCategories.map((category, idx) => (
                    <div key={idx} className="mb-6">
                        <h3 className={`text-sm text-[#100F0A]/70 mb-3 ${relative.medium.className}`}>
                            {category.category}
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {category.interests.map((interest, index) => {
                                const IconComponent = Icons[interest.icon as keyof typeof Icons];
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            const newInterests = formData.interests.includes(interest.name)
                                                ? formData.interests.filter((i: string) => i !== interest.name)
                                                : [...formData.interests, interest.name];
                                            setFormData({ ...formData, interests: newInterests });
                                        }}
                                        className={`
                                            cursor-pointer p-3 rounded-xl
                                            flex flex-col items-center justify-center gap-2
                                            transition-all duration-300
                                            ${formData.interests.includes(interest.name)
                                                ? 'bg-[#100F0A] text-white'
                                                : 'bg-white border border-gray-200 hover:border-[#100F0A] text-[#100F0A]'}
                                        `}
                                    >
                                        {IconComponent && <IconComponent className="w-5 h-5" />}
                                        <span className={`text-xs text-center ${relative.medium.className}`}>
                                            {interest.name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
