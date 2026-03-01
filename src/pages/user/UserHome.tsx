import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import {
    Calendar,
    CreditCard,
    Star,
    Wrench,
    Zap,
    Droplets,
    Hammer,
    Thermometer,
    Bell,
    CheckCircle,
    MapPin,
    ArrowRight
} from 'lucide-react';

export const UserHome = () => {
    const { user, isNewUser, resetNewUser } = useAuthStore();

    useEffect(() => {
        return () => {
            if (isNewUser) {
                resetNewUser();
            }
        };
    }, [isNewUser, resetNewUser]);

    const services = [
        { icon: Droplets, name: 'Cleaning', desc: 'Deep home cleaning' },
        { icon: Wrench, name: 'Plumbing', desc: 'Pipe & leak repair' },
        { icon: Zap, name: 'Electrical', desc: 'Wiring & lighting' },
        { icon: Hammer, name: 'Gardening', desc: 'Lawn maintenance' },
        { icon: Wrench, name: 'Handyman', desc: 'General repairs' }, // Icon reused
        { icon: Thermometer, name: 'AC Repair', desc: 'HVAC service' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isNewUser ? 'Account created successfully' : `Welcome back, ${user?.name?.split(' ')[0] || 'User'}`}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your home services and track upcoming visits.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-4 space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Upcoming Bookings</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                                <span className="text-lg font-bold">2 Appointments</span>
                            </div>
                            <p className="text-xs text-green-500 font-medium">+1</p>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Total Spent</p>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                                <span className="text-lg font-bold">$1,240.00</span>
                            </div>
                            <p className="text-xs text-green-500 font-medium">+12%</p>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Membership Status</p>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-accent" />
                                <span className="text-lg font-bold text-accent">LocalFix+</span>
                            </div>
                            <p className="text-xs text-gray-400">Active</p>
                        </div>
                    </Card>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-gray-900 dark:text-white">Recommended Services</h3>
                            <button
                                onClick={() => alert("Services view coming soon!")}
                                className="text-sm text-primary hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {services.map((s, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => alert(`Selected service: ${s.name}`)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
                                >
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors">
                                        <s.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{s.name}</h4>
                                        <p className="text-xs text-gray-500">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Notifications */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                        <div className="space-y-2">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                    <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Plumber is on the way</h4>
                                        <span className="w-2 h-2 rounded-full bg-accent"></span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mike will arrive at your home in approximately 15 minutes.</p>
                                    <p className="text-xs text-gray-400 mt-2">Just Now</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Booking confirmed</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your Deep Home Cleaning for Friday, Oct 24th is confirmed.</p>
                                    <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Visit */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Visit</h3>
                        <p className="text-sm text-gray-500 mb-2">Deep Kitchen Cleaning</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>Friday, 10:00 AM</span>
                        </div>

                        <Card className="p-0 overflow-hidden relative min-h-[400px] bg-secondary/20">
                            {/* Placeholder for Map/Visit visual */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <div className="w-64 h-[400px] bg-white rounded-[40px] shadow-2xl flex flex-col items-center p-6 relative transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                                    <div className="w-full h-8 bg-gray-100 rounded-full mb-8" />
                                    <div className="w-24 h-24 rounded-full bg-gray-100 mb-4" />
                                    <div className="w-32 h-4 bg-gray-100 rounded-full mb-2" />
                                    <div className="w-24 h-3 bg-gray-50 rounded-full" />

                                    <div className="mt-auto w-full">
                                        <div className="w-full h-12 bg-gray-900 rounded-xl mb-2 flex items-center justify-center text-white text-xs font-bold">
                                            User Profile
                                        </div>
                                        <p className="text-[10px] text-gray-400">Safe Environment</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
