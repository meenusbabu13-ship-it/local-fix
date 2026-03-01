import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Button } from '../../components/ui/Button';
import { Shield, Plus, Check, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export const Roles = () => {
    const { roles } = useAppStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                        Roles & Permissions
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Define access levels and control user capabilities.
                    </p>
                </div>
                <Button className="shadow-lg shadow-indigo-500/25">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Role
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role, idx) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass dark:glass-dark rounded-[2rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={`p-4 rounded-2xl ${role.name === 'Admin'
                                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                                    : 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                }`}>
                                <Shield className="w-8 h-8" />
                            </div>
                            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">{role.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {role.name === 'Admin' ? 'Full access to all system resources.' : 'Standard access for regular users.'}
                            </p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Permissions Included</p>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map(p => (
                                    <div key={p} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-semibold">
                                        <Check className="w-3 h-3" />
                                        {p}
                                    </div>
                                ))}
                                {role.permissions.length === 0 && (
                                    <span className="text-sm text-slate-400 italic">No specific permissions active</span>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-3">
                            <Button variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                Configure
                            </Button>
                            <Button variant="ghost" className="px-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                                Delete
                            </Button>
                        </div>
                    </motion.div>
                ))}

                {/* Add New Role Card Placeholder */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: roles.length * 0.1 }}
                    className="rounded-[2rem] p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 group min-h-[320px]"
                >
                    <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Plus className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Add New Role</p>
                </motion.button>
            </div>
        </motion.div>
    );
};
