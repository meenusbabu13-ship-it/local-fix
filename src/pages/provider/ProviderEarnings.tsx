import React from 'react';
import { Card } from '../../components/ui/Card';
import { DollarSign, TrendingUp, Download, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProviderEarnings = () => {
    const transactions = [
        { id: '#TR-8832', date: 'Oct 24, 2023', client: 'Sarah Johnson', amount: 240.00, status: 'Completed' },
        { id: '#TR-8831', date: 'Oct 23, 2023', client: 'Michael Ross', amount: 185.00, status: 'Pending' },
        { id: '#TR-8829', date: 'Oct 22, 2023', client: 'Elena Rodriguez', amount: 85.00, status: 'Completed' },
        { id: '#TR-8815', date: 'Oct 20, 2023', client: 'David Kim', amount: 450.00, status: 'Completed' },
        { id: '#TR-8790', date: 'Oct 18, 2023', client: 'Jessica Wei', amount: 120.00, status: 'Refunded' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Earnings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track your revenue and payouts</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Calendar className="w-4 h-4" /> This Month
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-emerald-600 text-white border-none">
                    <p className="text-emerald-100 text-sm font-medium mb-1">Total Earnings (Oct)</p>
                    <h3 className="text-4xl font-bold mb-4">$4,250.00</h3>
                    <div className="flex items-center gap-2 text-sm bg-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12.5% vs last month</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <p className="text-gray-500 text-sm font-medium mb-1">Pending Payouts</p>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">$185.00</h3>
                    <p className="text-xs text-gray-400">Scheduled for Friday, Oct 27</p>
                </Card>

                <Card className="p-6">
                    <p className="text-gray-500 text-sm font-medium mb-1">Average Job Value</p>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">$148.00</h3>
                    <p className="text-xs text-gray-400">Based on last 30 jobs</p>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Chart Placeholder */}
                <Card className="lg:col-span-2 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white">Revenue Analytics</h3>
                        <div className="flex gap-2 text-sm">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Services</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Tips</span>
                        </div>
                    </div>
                    <div className="h-64 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-400">Chart Visualization Placeholder</p>
                    </div>
                </Card>

                {/* Recent Transactions */}
                <Card className="lg:col-span-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                        {transactions.map((t) => (
                            <div key={t.id} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${t.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                                            t.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                                'bg-red-100 text-red-600'
                                        }`}>
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{t.client}</p>
                                        <p className="text-xs text-gray-500">{t.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">${t.amount.toFixed(2)}</p>
                                    <p className={`text-[10px] font-medium ${t.status === 'Completed' ? 'text-emerald-600' :
                                            t.status === 'Pending' ? 'text-amber-600' :
                                                'text-red-600'
                                        }`}>{t.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors">
                        View All History
                    </button>
                </Card>
            </div>
        </motion.div>
    );
};
