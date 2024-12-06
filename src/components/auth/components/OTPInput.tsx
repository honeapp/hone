'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface OTPInputProps {
    value: string[];
    onChange: (index: number, value: string) => void;
    onComplete?: () => void;
}

export default function OTPInput({ value, onChange, onComplete }: OTPInputProps) {
    const refs = Array(4).fill(0).map(() => useRef<HTMLInputElement>(null));

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            refs[index - 1].current?.focus();
        }
    };

    useEffect(() => {
        if (value.every(v => v !== '')) {
            onComplete?.();
        }
    }, [value, onComplete]);

    return (
        <div className="flex justify-center space-x-4">
            {value.map((digit, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <input
                        ref={refs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                            onChange(index, e.target.value);
                            if (e.target.value && index < 3) {
                                refs[index + 1].current?.focus();
                            }
                        }}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        // Update the input className to use text-[#100F0A] instead of gray
className="w-16 h-16 text-center text-2xl font-semibold 
bg-white border-2 border-gray-200 rounded-xl
focus:border-[#100F0A] focus:outline-none
transition-all duration-300 shadow-sm
hover:border-gray-300 text-[#100F0A]"

                    />
                </motion.div>
            ))}
        </div>
    );
}
