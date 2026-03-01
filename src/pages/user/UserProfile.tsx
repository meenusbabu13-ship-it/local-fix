import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Clock, Shield, Award } from 'lucide-react';

export const UserProfile = () => {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+1 (555) 123-4567',
        address: user?.location?.address || '123 Main St, New York, NY',
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="text-center p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                    <div className="relative">
                        <div className="w-32 h-32 mx-auto rounded-full p-1 bg-white dark:bg-gray-800 relative mb-4">
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-700"
                            />
                            <button className="absolute bottom-0 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md hover:bg-primary-dark transition-colors">
                                <span className="text-lg">+</span>
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h2>
                        <div className="flex justify-center items-center gap-2 text-gray-500 text-sm mb-6">
                            <MapPin className="w-4 h-4" />
                            <span>{formData.address}</span>
                        </div>

                        <div className="flex justify-center gap-6 py-6 border-t border-gray-100 dark:border-gray-800">
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Bookings</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">4.9</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Rating</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">2</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Years</p>
                            </div>
                        </div>

                        <Button
                            variant={isEditing ? 'ghost' : 'primary'}
                            className="w-full"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                        </Button>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-100 dark:border-amber-900/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-amber-500">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-900 dark:text-amber-100">Gold Member</h3>
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">You've saved $145.00 this year with LocalFix+ membership.</p>
                            <button className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-3 hover:underline">View Benefits</button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right Column: Details & History */}
            <div className="lg:col-span-2 space-y-6">
                {isEditing ? (
                    <Card>
                        <h3 className="font-bold text-lg mb-6">Edit Personal Details</h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    label="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Input
                                    label="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <Input
                                    label="Address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <>
                        <Card>
                            <h3 className="font-bold text-lg mb-6">Service History</h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Full Home Cleaning', date: 'Oct 24, 2023', provider: 'Sparkle Cleaners', price: '$120.00', status: 'Completed', logo: 'SC' },
                                    { title: 'Leaky Faucet Repair', date: 'Sep 12, 2023', provider: "Dave's Plumbing", price: '$85.00', status: 'Completed', logo: 'DP' },
                                    { title: 'Electrical Inspection', date: 'Aug 05, 2023', provider: 'PowerSafe Ltd', price: '$150.00', status: 'Completed', logo: 'PS' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500">
                                                {item.logo}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{item.date}</span>
                                                    <span>•</span>
                                                    <span>{item.provider}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white">{item.price}</p>
                                            <div className="flex items-center justify-end gap-1 mt-1 text-xs font-bold text-emerald-600">
                                                <Shield className="w-3 h-3" />
                                                <span>Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                Show All History
                            </button>
                        </Card>
                    </>
                )}
            </div>
        </motion.div>
    );
};
