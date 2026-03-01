import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import {
    LayoutDashboard,
    Users,
    Shield,
    Activity,
    Settings,
    User,
    LogOut,
    MessageSquare,
    Calendar,
    DollarSign,
    Wrench
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const { user, logout } = useAuthStore();

    const adminLinks = [
        { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
        { to: '/admin/users', icon: Users, label: 'User Management' },
        { to: '/admin/providers', icon: Wrench, label: 'Provider Management' },
        { to: '/admin/roles', icon: Shield, label: 'Roles & Permissions' },
        { to: '/admin/activity', icon: Activity, label: 'Activity Logs' },
        { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const userLinks = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
        { to: '/dashboard/profile', icon: User, label: 'Profile' },
        { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    const providerLinks = [
        { to: '/provider', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/provider/schedule', icon: Calendar, label: 'Schedule' },
        { to: '/provider/earnings', icon: DollarSign, label: 'Earnings' },
        { to: '/provider/messages', icon: MessageSquare, label: 'Messages' },
        { to: '/dashboard/profile', icon: User, label: 'Profile' },
        { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    let links = userLinks;
    if (user?.role === 'Admin') links = adminLinks;
    if (user?.role === 'ServiceProvider') links = providerLinks;

    return (
        <motion.aside
            initial={false}
            animate={{ width: isOpen ? 280 : 80 }}
            className="fixed left-0 top-0 h-screen bg-white dark:bg-dark-card border-r border-gray-100 dark:border-gray-800 z-30 transition-all duration-300 flex flex-col pt-20 pb-6 hidden md:flex"
        >
            <div className="flex-1 px-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }
            `}
                    >
                        <link.icon className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                        {isOpen && <span className="font-medium whitespace-nowrap">{link.label}</span>}
                    </NavLink>
                ))}
            </div>

            <div className="px-4 mt-auto">
                <button
                    onClick={() => logout()}
                    className="flex items-center w-full px-4 py-3 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                    <LogOut className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isOpen && <span className="font-medium">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};
