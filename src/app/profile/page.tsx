'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import { useState, useEffect } from 'react';
import { HiCamera, HiPencil, HiShieldCheck, HiCog, HiHeart, HiChat, HiHome } from 'react-icons/hi';
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
    const [activeTab, setActiveTab] = useState('profile');
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
        fetchProfile();
    }, []);

    const calculateAge = (dateOfBirth: string) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: HiHome },
        { id: 'matches', label: 'Matches', icon: HiHeart },
        { id: 'messages', label: 'Messages', icon: HiChat },
        { id: 'photos', label: 'Photos', icon: HiCamera },
        { id: 'edit', label: 'Edit Profile', icon: HiPencil },
        { id: 'verify', label: 'Verification', icon: HiShieldCheck },
        { id: 'settings', label: 'Settings', icon: HiCog }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF8F1] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#100F0A]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF8F1] flex">
            {/* Vertical Navigation */}
            <div className="w-64 bg-white shadow-xl fixed h-full left-0 top-0">
                <div className="p-6">
                    <h2 className={`text-xl font-bold text-[#100F0A] mb-8 ${relative.bold.className}`}>
                        Menu
                    </h2>
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ x: 5 }}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    activeTab === item.id 
                                        ? 'bg-[#100F0A] text-white' 
                                        : 'text-[#100F0A] hover:bg-[#100F0A]/5'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className={relative.medium.className}>{item.label}</span>
                            </motion.button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
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

                {/* Profile Content */}
                <div className="container mx-auto px-8 pt-24">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center mb-8"
                    >
                        <h1 className={`text-3xl font-bold text-[#100F0A] ${relative.bold.className}`}>
                            {profile?.fullName}
                            {profile?.dateOfBirth && (
                                <span className="ml-2">{calculateAge(profile.dateOfBirth)}</span>
                            )}
                        </h1>
                        <p className={`text-[#100F0A]/60 mt-2 ${relative.book.className}`}>
                            {profile?.location}
                        </p>
                        {profile?.isVerified && (
                            <span className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mt-3">
                                <HiShieldCheck className="w-4 h-4 mr-1" />
                                Verified Profile
                            </span>
                        )}
                    </motion.div>

                    {/* Dynamic Content Area */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                    >
                        {/* Content based on activeTab */}
                        {activeTab === 'photos' && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {(profile?.photos || [])
                                    .concat(Array(5 - (profile?.photos?.length || 0)).fill(null))
                                    .map((photo, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md"
                                        >
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
                                        </motion.div>
                                    ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
