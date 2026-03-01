import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    CreditCard,
    Star,
    Wrench,
    Zap,
    Droplets,
    Hammer,
    Thermometer,
    Bell,
    CheckCircle,
    MapPin,
    ArrowRight,
    Clock,
    X
} from 'lucide-react';

export const UserHome = () => {
    const { user, isNewUser, resetNewUser, token } = useAuthStore();

    const [providers, setProviders] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [bookingToReview, setBookingToReview] = useState<any>(null);
    const [reviewData, setReviewData] = useState({ rating: 5, review: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [provData, bookData] = await Promise.all([
                    api.getPublicProviders(),
                    api.getUserBookings(token as string)
                ]);
                setProviders(provData.providers.slice(0, 5));
                setBookings(bookData.bookings);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            if (isNewUser) {
                resetNewUser();
            }
        };
    }, [isNewUser, resetNewUser, token]);

    const openReviewModal = (booking: any) => {
        setBookingToReview(booking);
        setReviewData({ rating: 5, review: '' });
        setReviewModalOpen(true);
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.reviewBooking(bookingToReview._id, reviewData, token as string);
            setBookings(bookings.map(b => b._id === bookingToReview._id ? { ...b, rating: reviewData.rating, review: reviewData.review } : b));
            setReviewModalOpen(false);
            alert("Review submitted!");
        } catch (err: any) {
            alert(err.message || "Failed to submit review");
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
            >
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isNewUser ? 'Account created successfully' : `Welcome back, ${user?.name?.split(' ')[0] || 'User'}`}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Discover top-rated professionals for your home needs.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-4 space-y-4 bg-primary/5 border-primary/20">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Membership Status</p>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-accent" />
                                    <span className="text-lg font-bold text-accent">LocalFix Standard</span>
                                </div>
                                <p className="text-xs text-green-500 font-bold mt-1">Active</p>
                            </div>
                        </Card>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-gray-900 dark:text-white">Top Services</h3>
                                <Link to="/services" className="text-sm text-primary hover:underline font-bold">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { icon: Droplets, name: 'Plumbing', link: '/services/plumbing' },
                                    { icon: Zap, name: 'Electrical', link: '/services/electrical' },
                                    { icon: Hammer, name: 'Carpentry', link: '/services/carpentry' },
                                    { icon: Wrench, name: 'Repairs', link: '/services/repairs' },
                                ].map((s, idx) => (
                                    <Link
                                        key={idx}
                                        to={s.link}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors">
                                                <s.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{s.name}</h4>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Booking History Section */}
                        {bookings.length > 0 && (
                            <div className="mb-12">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-6">Your Recent Bookings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {bookings.slice(0, 4).map((b: any) => (
                                        <Card key={b._id} className="p-5 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-gray-900 dark:text-white capitalize">{b.service}</h4>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${b.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                                        b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                                            b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {b.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-1">Provider: {b.providerId?.name}</p>
                                                <div className="flex gap-4 text-xs text-gray-500 mt-2">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.date}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.time}</span>
                                                </div>
                                            </div>

                                            {b.status === 'completed' && !b.rating && (
                                                <Button onClick={() => openReviewModal(b)} className="mt-4 w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold transition-colors">
                                                    Write a Review
                                                </Button>
                                            )}
                                            {b.status === 'completed' && b.rating && (
                                                <div className="mt-4 flex items-center gap-1 text-sm font-bold text-amber-500">
                                                    <Star className="w-4 h-4 fill-amber-500" /> You rated {b.rating}/5
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Featured Providers */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 dark:text-white">Available Providers</h3>
                                <Link to="/services" className="text-sm text-primary hover:underline font-bold">
                                    Browse Directory
                                </Link>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <span className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
                                </div>
                            ) : providers.length === 0 ? (
                                <Card className="p-10 text-center border-dashed">
                                    <p className="text-gray-500 font-medium">No verified providers available yet.</p>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {providers.map((p: any) => (
                                        <Card key={p._id} className="p-5 hover:border-primary/50 transition-colors group flex flex-col justify-between">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-primary font-bold text-lg">{p.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{p.name}</h4>
                                                    <p className="text-sm text-gray-500 capitalize">{p.serviceCategory}</p>
                                                    <div className="flex items-center gap-1 mt-1 font-bold text-xs">
                                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                        <span className="text-gray-700 dark:text-gray-300">New</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <div>
                                                    <p className="text-xs text-gray-500">Rate</p>
                                                    <p className="font-bold text-gray-900 dark:text-white">${p.pricing}/hr</p>
                                                </div>
                                                <Link to={`/services/${p.serviceCategory}`}>
                                                    <button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-bold transition-colors">
                                                        View Details
                                                    </button>
                                                </Link>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Review Modal */}
            <AnimatePresence>
                {reviewModalOpen && bookingToReview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setReviewModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold mb-2">Write a Review</h2>
                            <p className="text-sm text-gray-500 mb-6">How was your service with {bookingToReview.providerId?.name}?</p>

                            <form onSubmit={submitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewData({ ...reviewData, rating: star })}
                                            >
                                                <Star className={`w-8 h-8 ${reviewData.rating >= star ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Comment</label>
                                    <textarea
                                        value={reviewData.review}
                                        onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none"
                                        placeholder="Describe your experience..."
                                        rows={4}
                                    />
                                </div>
                                <Button type="submit" className="w-full btn-primary">Submit Review</Button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
