import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Button } from '../../components/ui/Button';
import { Moon, Sun, Monitor, Bell, Lock, Shield, Database, Mail, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSettings = () => {
    const { theme, toggleTheme } = useAppStore();

    const sections = [
        {
            title: 'System Preferences',
            items: [
                {
                    icon: theme === 'dark' ? Moon : Sun,
                    iconColor: theme === 'dark' ? 'text-purple-500' : 'text-amber-500',
                    bgColor: theme === 'dark' ? 'bg-purple-500/10' : 'bg-amber-500/10',
                    label: 'Dark Mode',
                    desc: 'Toggle system-wide dark theme interface',
                    action: (
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${theme === 'dark' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    )
                },
                {
                    icon: Monitor,
                    iconColor: 'text-blue-500',
                    bgColor: 'bg-blue-500/10',
                    label: 'Maintenance Mode',
                    desc: 'Disable access for non-admin users temporarily',
                    action: (
                        <input type="checkbox" className="h-6 w-6 rounded-lg border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary" />
                    )
                }
            ]
        },
        {
            title: 'Security & Access',
            items: [
                {
                    icon: Lock,
                    iconColor: 'text-rose-500',
                    bgColor: 'bg-rose-500/10',
                    label: 'Force Password Reset',
                    desc: 'Require all users to reset password on next login',
                    action: <Button variant="outline" size="sm" className="text-xs">Trigger Reset</Button>
                },
                {
                    icon: Shield,
                    iconColor: 'text-emerald-500',
                    bgColor: 'bg-emerald-500/10',
                    label: 'Two-Factor Auth Enforcement',
                    desc: 'Require 2FA for all admin accounts',
                    action: (
                        <div className="relative inline-block w-12 h-7">
                            <input type="checkbox" id="2fa" className="peer appearance-none w-12 h-7 bg-slate-200 dark:bg-slate-700 rounded-full checked:bg-emerald-500 cursor-pointer transition-colors duration-300" />
                            <label htmlFor="2fa" className="absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-5 cursor-pointer"></label>
                        </div>
                    )
                }
            ]
        },
        {
            title: 'Data & Notifications',
            items: [
                {
                    icon: Database,
                    iconColor: 'text-indigo-500',
                    bgColor: 'bg-indigo-500/10',
                    label: 'Data Backup',
                    desc: 'Configure automated daily backups',
                    action: <Button variant="outline" size="sm" className="text-xs">Configure</Button>
                },
                {
                    icon: Mail,
                    iconColor: 'text-cyan-500',
                    bgColor: 'bg-cyan-500/10',
                    label: 'Email Notifications',
                    desc: 'Manage system-wide email templates',
                    action: <Button variant="outline" size="sm" className="text-xs">Edit Templates</Button>
                }
            ]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                        Admin Settings
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Configure global system settings and preferences.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => alert('Settings Saved!')} className="shadow-lg shadow-primary/25">
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass dark:glass-dark rounded-[2rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none"
                    >
                        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
                            {section.title}
                        </h2>
                        <div className="space-y-6">
                            {section.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${item.bgColor} ${item.iconColor}`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm">{item.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="pl-4">
                                        {item.action}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
