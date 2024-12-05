'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';

import { useState, useEffect } from 'react';
import { HiCamera, HiPencil, HiShieldCheck, HiCog } from 'react-icons/hi';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface UserProfile {
    fullName: string;
    dateOfBirth: string;
    location: string;
    photos: string[];
    churchDenomination: string;
    maritalStatus: string;
    interests: string[];
    occupation: string;
    about: string;
    isVerified: boolean;
}

export default function ProfileDashboard() {
    const [activeTab, setActiveTab] = useState('photos');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile(); // Remove the session check since we're using middleware
    }, []); // Remove session dependency
    const calculateAge = (dateOfBirth: string) => {
        const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        return age;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF8F1] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#100F0A]" />
            </div>
        );
    }

    const tabs = [
        { id: 'photos', label: 'Photos', icon: HiCamera },
        { id: 'edit', label: 'Edit Profile', icon: HiPencil },
        { id: 'verify', label: 'Verification', icon: HiShieldCheck },
        { id: 'settings', label: 'Settings', icon: HiCog }
    ];

    return (
        <div className="min-h-screen bg-[#FBF8F1]">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[300px] bg-gradient-to-r from-[#100F0A] to-[#2d2d2d] relative"
            >
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <Image

                            src={profile?.photos?.[0] || "/default-avatar.png"}
                            alt="Profile"
                            width={150}
                            height={150}

                            className="rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <button className="absolute bottom-2 right-2 bg-[#100F0A] p-2 rounded-full text-white hover:bg-[#2d2d2d] transition-all">
                            <HiCamera className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Profile Info */}
            <div className="container mx-auto px-4 pt-24">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <h1 className={`text-2xl font-bold text-[#100F0A] ${relative.bold.className}`}>

                        {profile?.fullName}, {profile?.dateOfBirth && calculateAge(profile.dateOfBirth)}
                    </h1>
                    <p className={`text-[#100F0A]/60 ${relative.book.className}`}>

                        {profile?.location}
                    </p>
                    {profile?.isVerified && (
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full mt-2">
                            <HiShieldCheck className="w-4 h-4 mr-1" />
                            Verified
                        </span>
                    )}
                </motion.div>

                {/* Navigation Tabs */}
                <div className="flex justify-center space-x-4 mb-8">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                                activeTab === tab.id 
                                    ? 'bg-[#100F0A] text-white' 
                                    : 'bg-white text-[#100F0A] hover:bg-[#100F0A]/5'
                            } transition-all duration-300 ${relative.medium.className}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-6 mb-8"
                >
                    {/* Dynamic content based on active tab */}
                    {activeTab === 'photos' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">



                            {(profile?.photos || []).concat(Array(5 - (profile?.photos?.length || 0)).fill(null)).map((photo, index) => (
                                <div key={index} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                    {photo ? (
                                        <Image
                                            src={photo}
                                            alt={`Photo ${index + 1}`}
                                            width={300}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <HiCamera className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
