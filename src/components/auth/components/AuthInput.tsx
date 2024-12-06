'use client';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface AuthInputProps {
    type: 'email' | 'phone';
    value: string;
    onChange: (value: string) => void;
    error?: string;
    loading?: boolean;
}

export function AuthInput({ type, value, onChange, error, loading }: AuthInputProps) {
    return (
        <div>
            {type === 'email' ? (
                <input
                    type="email"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A] placeholder:text-gray-400"
                />
            ) : (
                <PhoneInput
                    international
                    defaultCountry="US"
                    value={value || ''}
                    onChange={onChange}
                    disabled={loading}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                />
            )}
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
