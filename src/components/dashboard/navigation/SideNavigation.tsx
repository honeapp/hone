'use client';

import { motion } from 'framer-motion';
import { relative } from '@/app/fonts';
import Image from 'next/image';
import { 
    HiHome, 
    HiChat, 
    HiUser, 
    HiBell, 
    HiPuzzle, 
    HiCash 
} from 'react-icons/hi';
import Link from 'next/link';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    href: string;
    isExpanded: boolean;
}

const NavItem = ({ icon, label, isActive, href, isExpanded }: NavItemProps) => (
    <Link href={href}>
        <motion.div
            className={`
                flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer
                ${isActive ? 'bg-[#100F0A] text-white' : 'text-[#100F0A] hover:bg-[#100F0A]/5'}
                transition-all duration-300
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="text-2xl">{icon}</div>
            {isExpanded && (
                <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className={`whitespace-nowrap ${relative.medium.className}`}
                >
                    {label}
                </motion.span>
            )}
        </motion.div>
    </Link>
);

interface SideNavigationProps {
    isExpanded: boolean;
    onExpandChange: (expanded: boolean) => void;
}

export default function SideNavigation({ isExpanded, onExpandChange }: SideNavigationProps) {
    const navItems = [
        { icon: <HiHome />, label: 'Dashboard', href: '/dashboard' },
        { icon: <HiChat />, label: 'Messages', href: '/dashboard/messages' },
        { icon: <HiUser />, label: 'Profile', href: '/dashboard/profile' },
        { icon: <HiBell />, label: 'Notifications', href: '/dashboard/notifications' },
        { icon: <HiPuzzle />, label: 'Personality Test', href: '/dashboard/personality' },
        { icon: <HiCash />, label: 'Earn', href: '/dashboard/earn' },
    ];

    return (
        <motion.nav
            className={`
                fixed left-0 h-screen bg-white shadow-lg
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'w-64' : 'w-20'}
            `}
            onMouseEnter={() => onExpandChange(true)}
            onMouseLeave={() => onExpandChange(false)}
            initial={false}
        >
            {/* Logo */}
            <div className="p-6 mb-8">
                <Image
                    src="/images/logo.svg"
                    alt="HOEC Logo"
                    width={isExpanded ? 120 : 32}
                    height={32}
                    className="transition-all duration-300"
                />
            </div>

            {/* Navigation Items */}
            <div className="px-3 space-y-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        isExpanded={isExpanded}
                        isActive={item.href === '/dashboard'} // We'll implement active state logic later
                    />
                ))}
            </div>
        </motion.nav>
    );
}
