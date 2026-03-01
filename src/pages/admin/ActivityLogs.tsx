import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Button } from '../../components/ui/Button';
import { Clock, Filter, Download, Activity, FileText, User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivityLogs = () => {
    const { logs } = useAppStore();

    const getIcon = (action: string) => {
        if (action.includes('Login')) return <User className="w-4 h-4" />;
        if (action.includes('Update')) return <FileText className="w-4 h-4" />;
        if (action.includes('Delete')) return <Shield className="w-4 h-4" />;
        return <Activity className="w-4 h-4" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                        System Activity
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Monitor all system events and user actions in real-time.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white dark:bg-dark-card border-slate-200 dark:border-white/10">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter Logs
                    </Button>
                    <Button variant="outline" className="bg-white dark:bg-dark-card border-slate-200 dark:border-white/10">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[27px] before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent dark:before:from-slate-700 dark:before:via-slate-700 before:h-full">
                    {logs.map((log, idx) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative flex items-start gap-6 group"
                        >
                            <div className={`relative flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-full border-4 border-white dark:border-dark-bg z-10 transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                                }`}>
                                {getIcon(log.action)}
                            </div>
                            <div className="flex-1 py-2">
                                <div className="glass dark:glass-dark rounded-2xl p-5 border border-slate-200/50 dark:border-white/5 hover:border-primary/20 dark:hover:border-primary/20 transition-all">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            {log.user}
                                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 uppercase tracking-widest font-bold border border-slate-200 dark:border-slate-700">
                                                {log.action.split(' ')[0]}
                                            </span>
                                        </p>
                                        <div className="flex items-center text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded-lg">
                                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                                            {log.timestamp}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        Performed action: <span className="font-semibold text-primary">{log.action}</span>. This event was logged securely.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {logs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-500">No activity logs found.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
