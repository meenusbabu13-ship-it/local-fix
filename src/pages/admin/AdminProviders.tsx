import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
    CheckCircle2, XCircle, Clock, Search, Wrench, MapPin, DollarSign,
    Briefcase, Phone, Mail, RefreshCw, AlertTriangle, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ProviderStatus = 'all' | 'pending' | 'approved' | 'rejected';

const STATUS_TABS: { key: ProviderStatus; label: string; color: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', color: 'slate', icon: <Wrench className="w-4 h-4" /> },
    { key: 'pending', label: 'Pending', color: 'amber', icon: <Clock className="w-4 h-4" /> },
    { key: 'approved', label: 'Approved', color: 'emerald', icon: <CheckCircle2 className="w-4 h-4" /> },
    { key: 'rejected', label: 'Rejected', color: 'rose', icon: <XCircle className="w-4 h-4" /> },
];

const SERVICE_CATEGORY_ICONS: Record<string, string> = {
    plumbing: '🔧', electrical: '⚡', cleaning: '🧹', carpentry: '🪚',
    painting: '🖌️', hvac: '❄️', landscaping: '🌿', other: '🔩',
};

export const AdminProviders = () => {
    const { token } = useAuthStore();

    const [activeTab, setActiveTab] = useState<ProviderStatus>('all');
    const [providers, setProviders] = useState<any[]>([]);
    const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modals
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectTarget, setRejectTarget] = useState<any>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState('');

    const fetchProviders = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError('');
        try {
            const res = await api.getProviders(token, activeTab);
            if (res.success) {
                setProviders(res.providers);
                setCounts(res.counts);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load providers.');
        } finally {
            setLoading(false);
        }
    }, [token, activeTab]);

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    const showSuccess = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 4000);
    };

    const handleApprove = async (provider: any) => {
        setActionLoading(provider._id);
        try {
            await api.approveProvider(provider._id, token!);
            showSuccess(`✅ ${provider.name} has been approved. They can now log in.`);
            fetchProviders();
        } catch (err: any) {
            setError(err.message || 'Failed to approve provider.');
        } finally {
            setActionLoading(null);
        }
    };

    const openRejectModal = (provider: any) => {
        setRejectTarget(provider);
        setRejectReason('');
        setRejectModalOpen(true);
    };

    const handleReject = async () => {
        if (!rejectTarget) return;
        setActionLoading(rejectTarget._id);
        try {
            await api.rejectProvider(rejectTarget._id, rejectReason, token!);
            setRejectModalOpen(false);
            showSuccess(`❌ ${rejectTarget.name}'s application has been rejected.`);
            fetchProviders();
        } catch (err: any) {
            setError(err.message || 'Failed to reject provider.');
        } finally {
            setActionLoading(null);
            setRejectTarget(null);
        }
    };

    const filtered = providers.filter(
        (p) =>
            p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.serviceCategory?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
                        <XCircle className="w-3 h-3" /> Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                        <Clock className="w-3 h-3" /> Pending
                    </span>
                );
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                        Provider Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Review, approve, or reject service provider applications.
                    </p>
                </div>
                <Button variant="outline" onClick={fetchProviders} className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </Button>
            </div>

            {/* Success message */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-700/30 font-medium text-sm"
                    >
                        {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pending Alert */}
            {counts.pending > 0 && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-2xl text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">
                        <span className="font-bold">{counts.pending}</span> provider application{counts.pending > 1 ? 's' : ''} awaiting your review.
                    </p>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className="ml-auto text-xs font-bold underline hover:no-underline"
                    >
                        Review Now
                    </button>
                </div>
            )}

            {/* Main Card */}
            <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                {/* Tabs & Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                    {/* Status Tabs */}
                    <div className="flex gap-2 flex-wrap">
                        {STATUS_TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.key
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                                <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-md ${activeTab === tab.key
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                                    }`}>
                                    {counts[tab.key]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search providers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium"
                        />
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* Provider Cards */}
                {loading ? (
                    <div className="py-20 text-center text-slate-500 dark:text-slate-400">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
                        Loading providers...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                            <Wrench className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No providers found</h3>
                        <p className="text-slate-500 mt-1 text-sm">
                            {searchTerm ? 'Try adjusting your search.' : `No ${activeTab === 'all' ? '' : activeTab} providers yet.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {filtered.map((provider, idx) => (
                                <motion.div
                                    key={provider._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: idx * 0.04 }}
                                    className="flex flex-col lg:flex-row lg:items-center gap-4 p-5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {/* Avatar + Name */}
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center text-2xl shrink-0">
                                            {SERVICE_CATEGORY_ICONS[provider.serviceCategory] || '🔩'}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-slate-900 dark:text-white text-base">
                                                    {provider.name}
                                                </p>
                                                {getStatusBadge(provider.status)}
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Mail className="w-3 h-3" /> {provider.email}
                                                </span>
                                                {provider.phone && (
                                                    <span className="flex items-center gap-1 text-xs text-slate-500">
                                                        <Phone className="w-3 h-3" /> {provider.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-wrap gap-3 text-xs font-medium">
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-600 dark:text-slate-300 capitalize">
                                            <Wrench className="w-3 h-3 text-violet-500" />
                                            {provider.serviceCategory}
                                        </span>
                                        {provider.experience !== undefined && (
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-600 dark:text-slate-300">
                                                <Briefcase className="w-3 h-3 text-blue-500" />
                                                {provider.experience} yrs exp
                                            </span>
                                        )}
                                        {provider.pricing && (
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-600 dark:text-slate-300">
                                                <DollarSign className="w-3 h-3 text-emerald-500" />
                                                ${provider.pricing}/hr
                                            </span>
                                        )}
                                        {provider.address && (
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
                                                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                                                {provider.address}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-400 text-xs">
                                            {new Date(provider.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>

                                    {/* Rejection reason */}
                                    {provider.status === 'rejected' && provider.rejectionReason && (
                                        <div className="w-full lg:w-auto text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10 px-3 py-2 rounded-lg border border-rose-100 dark:border-rose-500/20 max-w-xs">
                                            <span className="font-semibold">Reason: </span>{provider.rejectionReason}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 shrink-0">
                                        {provider.status !== 'approved' && (
                                            <Button
                                                onClick={() => handleApprove(provider)}
                                                isLoading={actionLoading === provider._id}
                                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 shadow-md"
                                                size="sm"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                Approve
                                            </Button>
                                        )}
                                        {provider.status !== 'rejected' && (
                                            <Button
                                                onClick={() => openRejectModal(provider)}
                                                variant="danger"
                                                size="sm"
                                                className="flex items-center gap-2 text-sm px-4 py-2"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </Button>
                                        )}
                                        {provider.status === 'approved' && (
                                            <Button
                                                onClick={() => openRejectModal(provider)}
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 text-sm px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Revoke
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Reject/Revoke Modal */}
            <Modal
                isOpen={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                title={rejectTarget?.status === 'approved' ? 'Revoke Provider Approval' : 'Reject Provider Application'}
            >
                <div className="space-y-5">
                    <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/10 rounded-xl">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-xl">
                            {SERVICE_CATEGORY_ICONS[rejectTarget?.serviceCategory] || '🔩'}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{rejectTarget?.name}</p>
                            <p className="text-xs text-slate-500">{rejectTarget?.email}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Reason for rejection <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="e.g. Incomplete documentation, does not meet service requirements..."
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-rose-400/20 focus:border-rose-400 text-slate-900 dark:text-white placeholder-slate-400 text-sm resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="ghost" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="danger"
                            onClick={handleReject}
                            isLoading={actionLoading === rejectTarget?._id}
                        >
                            {rejectTarget?.status === 'approved' ? 'Revoke Approval' : 'Reject Application'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
