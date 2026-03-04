import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { LandingFooter } from '../components/landing/LandingFooter';
import { api } from '../services/api';
import { Star, MapPin, Briefcase, Award, Loader2, UserCircle, Calendar, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';

export const PublicProviders = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const { isAuthenticated, token, user } = useAuthStore();
    const { addLog } = useAppStore();

    const [providers, setProviders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [bookingProvider, setBookingProvider] = useState<any>(null);
    const [bookingData, setBookingData] = useState({ description: '', date: '', time: '' });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProviders();
    }, [category]);

    const fetchProviders = async () => {
        try {
            setLoading(true);
            const data = await api.getPublicProviders(category);
            setProviders(data.providers);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch providers');
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (provider: any) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Only regular users can book — providers and admins cannot
        if (user?.role !== 'User') {
            alert('Only registered users can book services. Please log in with a user account to book.');
            return;
        }

        setBookingProvider(provider);
        setBookingData({ description: '', date: '', time: '' });
    };

    const [bookingLoading, setBookingLoading] = useState(false);

    const confirmBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!bookingData.description || !bookingData.date || !bookingData.time) {
            alert('Please fill out all booking details.');
            return;
        }

        if (!token) {
            alert('Authentication required!');
            return;
        }

        setBookingLoading(true);

        try {
            await api.createBooking({
                providerId: bookingProvider._id,
                date: bookingData.date,
                time: bookingData.time,
                description: bookingData.description,
            }, token);

            addLog({
                id: Math.random().toString(),
                user: 'System',
                action: `User booked ${bookingProvider.name} for ${bookingData.date} at ${bookingData.time}`,
                timestamp: new Date().toLocaleString(),
            });

            alert(`Booking requested with ${bookingProvider.name}!\n\nDate: ${bookingData.date}\nTime: ${bookingData.time}\n\nThey will contact you shortly.`);
            setBookingProvider(null);
        } catch (err: any) {
            alert(err.message || 'Failed to request booking');
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
                            Top Rated <span className="text-primary">{category || 'All Services'}</span> Providers
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                            Browse through our verified professionals ready to help you with your {category ? category.toLowerCase() : 'home'} needs.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center">
                            {error}
                        </div>
                    ) : providers.length === 0 ? (
                        <div className="text-center py-20 glass dark:glass-dark rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                            <UserCircle className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No providers found</h3>
                            <p className="text-slate-500">We currently do not have any {category ? category.toLowerCase() : ''} providers available in this area.</p>
                            <Link to="/">
                                <Button className="mt-6 btn-primary shadow-indigo">Return Home</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {providers.map((provider, index) => (
                                <motion.div
                                    key={provider._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass dark:glass-dark p-6 rounded-3xl hover:shadow-premium transition-all group border border-slate-200 dark:border-white/10"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            {provider.avatar ? (
                                                <img src={provider.avatar} alt={provider.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <UserCircle className="w-10 h-10 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize group-hover:text-primary transition-colors">{provider.name}</h3>
                                            <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                                                <MapPin className="w-4 h-4" />
                                                <span>{provider.address || 'Location unavailable'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 font-bold">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                <span className="text-slate-700 dark:text-slate-300">4.9 (124 reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm">
                                        <div>
                                            <span className="text-slate-500 flex items-center gap-1 mb-1">
                                                <Briefcase className="w-4 h-4" /> Experience
                                            </span>
                                            <span className="font-bold text-slate-900 dark:text-white">{provider.experience} years</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 flex items-center gap-1 mb-1">
                                                <Award className="w-4 h-4" /> Hourly Rate
                                            </span>
                                            <span className="font-bold text-slate-900 dark:text-white">${provider.pricing}/hr</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <Button
                                            onClick={() => handleBookClick(provider)}
                                            className="w-full btn-primary shadow-indigo py-3 font-bold flex items-center justify-center gap-2"
                                        >
                                            <Calendar className="w-4 h-4" /> Book Now
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <LandingFooter />

            {/* Booking Modal */}
            <AnimatePresence>
                {bookingProvider && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-slate-200 dark:border-slate-800"
                        >
                            <button
                                onClick={() => setBookingProvider(null)}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Book {bookingProvider.name}
                            </h2>
                            <p className="text-sm text-slate-500 mb-6">
                                Please provide details about the problem and your preferred schedule.
                            </p>

                            <form onSubmit={confirmBooking} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Problem Description
                                    </label>
                                    <textarea
                                        value={bookingData.description}
                                        onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                        placeholder="Describe the issue you need help with..."
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingData.date}
                                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            value={bookingData.time}
                                            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setBookingProvider(null)}
                                        className="flex-1"
                                        disabled={bookingLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 btn-primary" isLoading={bookingLoading} disabled={bookingLoading}>
                                        Confirm Booking
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
