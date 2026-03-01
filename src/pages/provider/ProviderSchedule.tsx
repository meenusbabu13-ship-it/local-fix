import React from 'react';
import { Card } from '../../components/ui/Card';
import { mockAgenda } from '../../data/mockData';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProviderSchedule = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDay = 3; // Mock Thursday

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your appointments and availability</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Sync Calendar
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                        + Add Time Off
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Calendar Strip */}
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-primary" />
                                October 2023
                            </h2>
                            <div className="flex gap-1">
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronLeft className="w-5 h-5" /></button>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-4 text-center">
                            {days.map((day, i) => (
                                <div key={day} className="space-y-4">
                                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{day}</span>
                                    <button
                                        className={`w-full aspect-square rounded-2xl flex items-center justify-center text-sm font-medium transition-all
                                            ${i === currentDay
                                                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                            }
                                        `}
                                    >
                                        {23 + i}
                                    </button>
                                    {i === currentDay && (
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mx-auto"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Timeline */}
                    <Card className="min-h-[500px]">
                        <div className="space-y-6">
                            {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
                                <div key={hour} className="flex gap-4 relative group">
                                    <div className="w-16 text-right text-sm text-gray-400 -mt-2.5">
                                        {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                                    </div>

                                    <div className="flex-1 border-t border-gray-100 dark:border-gray-800 relative min-h-[60px]">
                                        {/* Mock Appointments overlaid */}
                                        {hour === 9 && (
                                            <div className="absolute top-0 left-0 w-full bg-emerald-100 dark:bg-emerald-900/30 border-l-4 border-emerald-500 rounded-r-lg p-3 hover:brightness-95 cursor-pointer transition-all">
                                                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 text-sm">Kitchen Rewiring - Sarah Johnson</h4>
                                                <p className="text-emerald-700 dark:text-emerald-300 text-xs">9:00 AM - 11:30 AM</p>
                                            </div>
                                        )}
                                        {hour === 10 && (
                                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none"></div> // Spacer
                                        )}
                                        {hour === 11 && (
                                            <div className="absolute top-30 left-0 w-full bg-gray-50 border border-dashed border-gray-200 rounded p-2 flex items-center justify-center text-xs text-gray-400">
                                                Break Time
                                            </div>
                                        )}
                                        {hour === 13 && (
                                            <div className="absolute top-4 left-0 w-full bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg p-3 hover:brightness-95 cursor-pointer transition-all">
                                                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Diagnostic Visit - Michael Ross</h4>
                                                <p className="text-blue-700 dark:text-blue-300 text-xs">1:00 PM - 2:00 PM</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Jobs</h3>
                        <div className="space-y-4">
                            {mockAgenda.map((item) => (
                                <div key={item.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-100 dark:border-gray-700">
                                            {item.time}
                                        </span>
                                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-4 h-4" /></button>
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h4>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate">{item.address}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                        <h4 className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-1">Availability Tip</h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                            You're 85% booked for this week. Open up Saturday hours to increase earnings by ~15%.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
