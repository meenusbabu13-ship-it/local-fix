import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Users, Wrench, Clock, Download, Activity, ArrowUpRight, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const AdminHome = () => {
    const { token } = useAuthStore();
    const navigate = useNavigate();

    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!token) return;
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/dashboard`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = await res.json();
                if (data.success) setStats(data.stats);
            } catch (err) {
                console.error('Failed to fetch admin stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    const statCards = stats
        ? [
            {
                label: 'Total Users',
                value: stats.totalUsers ?? 0,
                icon: Users,
                color: 'text-indigo-600',
                bg: 'bg-indigo-50 dark:bg-indigo-500/10',
                border: 'border-indigo-200 dark:border-indigo-500/20',
                sub: 'Registered users',
                trend: null,
            },
            {
                label: 'Total Providers',
                value: stats.totalProviders ?? 0,
                icon: Wrench,
                color: 'text-orange-600',
                bg: 'bg-orange-50 dark:bg-orange-500/10',
                border: 'border-orange-200 dark:border-orange-500/20',
                sub: `${stats.approvedProviders ?? 0} approved`,
                trend: null,
            },
            {
                label: 'Pending Approvals',
                value: stats.pendingProviders ?? 0,
                icon: Clock,
                color: 'text-amber-600',
                bg: 'bg-amber-50 dark:bg-amber-500/10',
                border: 'border-amber-200 dark:border-amber-500/20',
                sub: 'Awaiting review',
                trend: null,
                urgent: (stats.pendingProviders ?? 0) > 0,
            },
        ]
        : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Welcome back, Administrator. Here's what's happening today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="hidden sm:flex bg-white dark:bg-dark-card border-slate-200 dark:border-white/10">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                    <Button className="shadow-lg shadow-primary/25" onClick={() => navigate('/admin/providers')}>
                        <Activity className="w-4 h-4 mr-2" />
                        Manage Providers
                    </Button>
                </div>
            </div>

            {/* Pending Alert */}
            {stats && stats.pendingProviders > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-2xl text-amber-800 dark:text-amber-300"
                >
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">
                        <span className="font-bold">{stats.pendingProviders}</span> provider application{stats.pendingProviders > 1 ? 's are' : ' is'} awaiting your approval.
                    </p>
                    <button
                        onClick={() => navigate('/admin/providers')}
                        className="ml-auto text-xs font-bold underline hover:no-underline"
                    >
                        Review Now →
                    </button>
                </motion.div>
            )}

            {/* Stats Cards */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-white/20 shadow-xl animate-pulse h-44" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCards.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`glass dark:glass-dark rounded-[2.5rem] p-8 border shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group cursor-pointer ${stat.urgent ? 'border-amber-300 dark:border-amber-500/30' : 'border-white/20'}`}
                            onClick={() => stat.label === 'Pending Approvals' && navigate('/admin/providers')}
                        >
                            <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
                                <stat.icon className={`w-32 h-32 ${stat.color}`} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.border} border`}>
                                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                    </div>
                                    {stat.urgent && (
                                        <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                                            <AlertTriangle className="w-3 h-3" /> Action Needed
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-2">{stat.label}</p>
                                    <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-400">{stat.sub}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Quick Stats Panel */}
            {stats && (
                <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Provider Status Breakdown</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { label: 'Approved', value: stats.approvedProviders ?? 0, color: 'emerald', icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> },
                            { label: 'Pending', value: stats.pendingProviders ?? 0, color: 'amber', icon: <Clock className="w-5 h-5 text-amber-500" /> },
                            { label: 'Rejected', value: stats.rejectedProviders ?? 0, color: 'rose', icon: <Activity className="w-5 h-5 text-rose-500" /> },
                        ].map((item) => (
                            <div key={item.label} className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                                <div className="flex justify-center mb-3">{item.icon}</div>
                                <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">{item.value}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Button variant="outline" onClick={() => navigate('/admin/providers')}>
                            <Wrench className="w-4 h-4 mr-2" />
                            Manage All Providers
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
