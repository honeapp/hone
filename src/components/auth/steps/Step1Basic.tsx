'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Step1Basic({ formData, setFormData, errors, setErrors }: any) {
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) return 'Password must be at least 8 characters';
        if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
        if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
        if (!hasNumbers) return 'Password must contain at least one number';
        if (!hasSpecialChar) return 'Password must contain at least one special character';
        return '';
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setFormData({ ...formData, password });
        const passwordError = validatePassword(password);
        setErrors({ ...errors, password: passwordError });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fullName = e.target.value;
        setFormData({ ...formData, fullName });
        if (fullName.length < 2) {
            setErrors({ ...errors, fullName: 'Name must be at least 2 characters long' });
        } else if (!/^[a-zA-Z\s]*$/.test(fullName)) {
            setErrors({ ...errors, fullName: 'Name can only contain letters and spaces' });
        } else {
            setErrors({ ...errors, fullName: '' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
        >
            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handlePasswordChange}
                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                        placeholder="Create a strong password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#100F0A]"
                    >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>
            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Full Name
                </label>
                <input
                    type="text"
                    value={formData.fullName}
                    onChange={handleNameChange}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                    placeholder="Your full name"
                />
                {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
            </div>
        </motion.div>
    );
}
