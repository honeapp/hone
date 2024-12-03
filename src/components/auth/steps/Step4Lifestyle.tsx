'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { 
    FaBible, FaChurch, FaHandsHelping, FaGlobeAmericas,
    FaUsers, FaMusic, FaRunning, FaBook, FaPlane,
    FaUtensils, FaPaintBrush, FaLeaf
} from 'react-icons/fa';

export default function Step4Lifestyle({ formData, setFormData, errors, setErrors }: any) {
    const interestCategories = {
        'Faith & Ministry': [
            { id: "Bible Study", icon: <FaBible /> },
            { id: "Worship", icon: <FaChurch /> },
            { id: "Community Service", icon: <FaHandsHelping /> },
            { id: "Mission Work", icon: <FaGlobeAmericas /> },
            { id: "Youth Ministry", icon: <FaUsers /> },
        ],
        'Lifestyle & Hobbies': [
            { id: "Music", icon: <FaMusic /> },
            { id: "Sports", icon: <FaRunning /> },
            { id: "Reading", icon: <FaBook /> },
            { id: "Travel", icon: <FaPlane /> },
        ],
        'Creative & Outdoors': [
            { id: "Cooking", icon: <FaUtensils /> },
            { id: "Art", icon: <FaPaintBrush /> },
            { id: "Nature", icon: <FaLeaf /> }
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Occupation
                </label>
                <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => {
                        setFormData({ ...formData, occupation: e.target.value });
                        if (errors.occupation) setErrors({ ...errors, occupation: '' });
                    }}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                    placeholder="Your occupation"
                />
                {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
            </div>

            <div>
                <label className={`block mb-4 text-[#100F0A] ${relative.medium.className}`}>
                    Interests & Hobbies
                </label>
                {Object.entries(interestCategories).map(([category, interests]) => (
                    <div key={category} className="mb-6">
                        <h3 className={`text-sm text-[#100F0A]/70 mb-3 ${relative.medium.className}`}>
                            {category}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {interests.map(({ id, icon }) => (
                                <motion.div
                                    key={id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        const newInterests = formData.interests.includes(id)
                                            ? formData.interests.filter((i: string) => i !== id)
                                            : [...formData.interests, id];
                                        setFormData({ ...formData, interests: newInterests });
                                        if (errors.interests) setErrors({ ...errors, interests: '' });
                                    }}
                                    className={`
                                        cursor-pointer p-6 rounded-xl
                                        flex flex-col items-center justify-center gap-3
                                        transition-all duration-300
                                        ${formData.interests.includes(id)
                                            ? 'bg-[#100F0A] text-white'
                                            : 'bg-white border-2 border-gray-200 hover:border-[#100F0A] text-[#100F0A]'}
                                    `}
                                >
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {icon}
                                    </div>
                                    <span className={`text-sm text-center ${relative.medium.className}`}>
                                        {id}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
                {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests}</p>}
                <p className={`text-sm text-gray-500 mt-2 ${relative.book.className}`}>
                    Select all that apply
                </p>
            </div>
        </motion.div>
    );
}
