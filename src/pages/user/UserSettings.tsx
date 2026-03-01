import React, { useState, useRef } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Shield, Smartphone, Mail, Camera, User, Loader2, MapPin } from 'lucide-react';

export const UserSettings = () => {
    const { theme, toggleTheme } = useAppStore();
    const { user, updateUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                // Simulate network delay for effect
                setTimeout(() => {
                    updateUser({ avatar: reader.result as string });
                    setIsLoading(false);
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your app preferences</p>
            </div>

            <Card>
                <div className="flex flex-col md:flex-row items-center gap-6 p-2">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-50 dark:ring-gray-800">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <User className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={triggerFileInput}
                            className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                        <p className="text-sm text-primary font-medium mt-1">{user?.role}</p>

                        <div className="mt-4 flex gap-3 justify-center md:justify-start">
                            <Button variant="outline" size="sm" onClick={triggerFileInput} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Change Photo'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Location Services</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your service area and location tracking</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {user?.location ? (
                            <div className="text-right">
                                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded inline-block mb-1">Active</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.location.address}</p>
                                <p className="text-xs text-gray-400">{user.location.lat.toFixed(4)}, {user.location.lng.toFixed(4)}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Location not set</p>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (navigator.geolocation) {
                                    setIsLoading(true);
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            setTimeout(() => { // Mock delay
                                                updateUser({
                                                    location: {
                                                        lat: position.coords.latitude,
                                                        lng: position.coords.longitude,
                                                        address: 'Current Location (Detected)'
                                                    }
                                                });
                                                setIsLoading(false);
                                            }, 800);
                                        },
                                        (error) => {
                                            console.error(error);
                                            setIsLoading(false);
                                            alert('Unable to retrieve location');
                                        }
                                    );
                                } else {
                                    alert('Geolocation is not supported');
                                }
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Detecting...' : 'Update Location'}
                        </Button>
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-bold mb-4">Appearance</h2>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        {theme === 'dark' ? <Moon className="w-5 h-5 text-purple-500" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                        <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-sm text-gray-500">Adjust the appearance of the app</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
              ${theme === 'dark' ? 'bg-primary' : 'bg-gray-200'}
            `}
                    >
                        <span
                            className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}
              `}
                        />
                    </button>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                <div className="space-y-4">
                    {[
                        { icon: Bell, title: 'Push Notifications', desc: 'Receive alerts about your bookings' },
                        { icon: Mail, title: 'Email Updates', desc: 'Get weekly summaries and offers' },
                        { icon: Smartphone, title: 'SMS Alerts', desc: 'Get text messages for urgent updates' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                            <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-bold text-red-500 mb-4">Danger Zone</h2>
                <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="font-medium text-red-700 dark:text-red-400">Delete Account</p>
                        <p className="text-sm text-red-600/70 dark:text-red-400/70">Permanently remove your account and data</p>
                    </div>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium text-sm transition-colors">
                        Delete
                    </button>
                </div>
            </Card>
        </motion.div>
    );
};

