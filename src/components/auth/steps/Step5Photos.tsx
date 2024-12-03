'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';

export default function Step5Photos({ formData, setFormData, errors, setErrors }: any) {
    const [uploading, setUploading] = useState(false);

    const validateFields = () => {
        const newErrors = {};
        if (!formData.about) newErrors.about = 'Please tell us about yourself';
        if (formData.about && formData.about.length < 50) newErrors.about = 'Please write at least 50 characters';
        return newErrors;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setErrors({ ...errors, photos: 'Image size should be less than 5MB' });
                return;
            }
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, photos: 'Please upload only image files' });
                return;
            }
            // Handle image upload logic here
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <div>
                <label className={`block mb-4 text-[#100F0A] ${relative.medium.className}`}>
                    Profile Photos (Up to 5)
                </label>
                <div className="grid grid-cols-3 gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#100F0A] transition-colors relative overflow-hidden"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <FiUpload className="w-6 h-6 text-gray-400" />
                        </div>
                    ))}
                </div>
                {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
            </div>
            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    About Me
                </label>
                <textarea
                    value={formData.about}
                    onChange={(e) => {
                        setFormData({ ...formData, about: e.target.value });
                        if (errors.about) setErrors({ ...errors, about: '' });
                    }}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A] h-32 resize-none"
                    placeholder="Tell us about yourself..."
                />
                {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
                <p className={`text-sm text-gray-500 mt-1 ${relative.book.className}`}>
                    {formData.about.length}/500 characters
                </p>
            </div>
        </motion.div>
    );
}
