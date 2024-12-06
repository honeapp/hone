'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { useEffect, useState } from 'react';
import { Denomination, MaritalStatus } from '@/types';

interface Step3Props {
    formData: any;
    setFormData: (data: any) => void;
    errors?: any;
    setErrors?: (errors: any) => void;
}

export default function Step3Religious({ formData, setFormData, errors, setErrors }: Step3Props) {
    const [denominations, setDenominations] = useState<Denomination[]>([]);
    const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [denomResponse, statusResponse] = await Promise.all([
                    fetch('/api/denominations'),
                    fetch('/api/marital-statuses')
                ]);

                const [denomData, statusData] = await Promise.all([
                    denomResponse.json(),
                    statusResponse.json()
                ]);

                setDenominations(denomData);
                setMaritalStatuses(statusData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
            >
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-200 rounded-xl" />
                    <div className="h-10 bg-gray-200 rounded-xl" />
                </div>
            </motion.div>
        );
    }

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
                    onChange={(e) => {
                        setFormData({ ...formData, churchDenomination: e.target.value });
                        if (errors?.churchDenomination) {
                            setErrors?.({ ...errors, churchDenomination: '' });
                        }
                    }}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                >
                    <option value="">Select denomination</option>
                    {denominations.map(denom => (
                        <option key={denom._id} value={denom.name} className="text-[#100F0A]">
                            {denom.name}
                        </option>
                    ))}
                </select>
                {errors?.churchDenomination && (
                    <p className="text-red-500 text-sm mt-1">{errors.churchDenomination}</p>
                )}
            </div>

            <div>
                <label className={`block mb-2 text-[#100F0A] ${relative.medium.className}`}>
                    Marital Status
                </label>
                <select
                    value={formData.maritalStatus}
                    onChange={(e) => {
                        setFormData({ ...formData, maritalStatus: e.target.value });
                        if (errors?.maritalStatus) {
                            setErrors?.({ ...errors, maritalStatus: '' });
                        }
                    }}
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#100F0A] text-[#100F0A]"
                >
                    <option value="">Select status</option>
                    {maritalStatuses.map(status => (
                        <option key={status._id} value={status.name} className="text-[#100F0A]">
                            {status.name}
                        </option>
                    ))}
                </select>
                {errors?.maritalStatus && (
                    <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>
                )}
            </div>
        </motion.div>
    );
}
