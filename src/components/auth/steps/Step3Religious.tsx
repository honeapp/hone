'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';

export default function Step3Religious({ formData, setFormData }: any) {
    const denominations = [
        "Catholic", "Protestant", "Orthodox", "Pentecostal", 
        "Baptist", "Methodist", "Lutheran", "Anglican",
        "Presbyterian", "Other"
    ];

    const maritalStatuses = [
        "Single", "Divorced", "Widowed", "Single Parent"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
        >
            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Church Denomination
                </label>
                <select
                    value={formData.churchDenomination}
                    onChange={(e) => setFormData({ ...formData, churchDenomination: e.target.value })}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                >
                    <option value="">Select denomination</option>
                    {denominations.map(denom => (
                        <option key={denom} value={denom} className="text-[#100F0A]">{denom}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Marital Status
                </label>
                <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                >
                    <option value="">Select status</option>
                    {maritalStatuses.map(status => (
                        <option key={status} value={status} className="text-[#100F0A]">{status}</option>
                    ))}
                </select>
            </div>
        </motion.div>
    );
}
