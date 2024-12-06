'use client';

import { relative } from '@/app/fonts';

interface SocialButtonProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
    loading: boolean;
    className?: string;
}

export function SocialButton({ icon, text, onClick, loading, className = 'bg-[#100F0A]' }: SocialButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`w-full ${className} text-white rounded-xl p-4 flex items-center justify-center space-x-3 hover:opacity-90 transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
            } ${relative.medium.className}`}
        >
            <div className="w-6 flex justify-center">
                {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : icon}
            </div>
            <span>{text}</span>
        </button>
    );
}
