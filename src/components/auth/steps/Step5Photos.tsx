'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { FiUpload, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Step5Photos({ formData, setFormData, errors, setErrors }: any) {
    const [uploading, setUploading] = useState<boolean[]>([false, false, false, false, false]);
    const [uploadProgress, setUploadProgress] = useState<number[]>([0, 0, 0, 0, 0]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5000000) {
                setErrors(prev => ({ ...prev, photos: 'Image size should be less than 5MB' }));
                return;
            }

            try {
                setUploading(prev => prev.map((val, i) => i === index ? true : val));
                
                const uploadData = new FormData();
                uploadData.append('file', file);
                uploadData.append('upload_preset', 'hone_profile_photos');
                
                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/db8lnhf7s/image/upload',
                    {
                        method: 'POST',
                        body: uploadData
                    }
                );

                const data = await response.json();
                
                if (data.secure_url) {
                    const newPhotos = [...(formData.photos || [])];
                    newPhotos[index] = data.secure_url;
                    setFormData(prev => ({
                        ...prev,
                        photos: newPhotos
                    }));
                    setErrors(prev => ({ ...prev, photos: '' }));
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                setErrors(prev => ({ ...prev, photos: 'Failed to upload image' }));
            } finally {
                setUploading(prev => prev.map((val, i) => i === index ? false : val));
                setUploadProgress(prev => prev.map((val, i) => i === index ? 0 : val));
            }
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = [...(formData.photos || [])];
        newPhotos[index] = '';
        setFormData(prev => ({
            ...prev,
            photos: newPhotos.filter(Boolean)
        }));
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
                            {formData.photos?.[index] ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={formData.photos[index]}
                                        alt={`Profile photo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
                                    >
                                        <FiX className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, index)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={uploading[index]}
                                    />
                                    {uploading[index] ? (
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#100F0A]" />
                                            <span className="text-sm mt-2">Uploading...</span>
                                        </div>
                                    ) : (
                                        <FiUpload className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                            )}
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
                        setFormData(prev => ({ ...prev, about: e.target.value }));
                        if (errors.about) setErrors(prev => ({ ...prev, about: '' }));
                    }}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A] h-32 resize-none"
                    placeholder="Tell us about yourself..."
                    maxLength={500}
                />
                {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
                <p className={`text-sm text-gray-500 mt-1 ${relative.book.className}`}>
                    {formData.about?.length || 0}/500 characters
                </p>
            </div>
        </motion.div>
    );
}
