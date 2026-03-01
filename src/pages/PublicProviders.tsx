import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { LandingFooter } from '../components/landing/LandingFooter';
import { api } from '../services/api';
import { Star, MapPin, Briefcase, Award, Loader2, UserCircle, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PublicProviders = () => {
    const { category } = useParams<{ category: string }>();
    const [providers, setProviders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                                        <Link to="/login" className="flex-1">
                                            <Button className="w-full btn-primary shadow-indigo py-3 font-bold flex items-center justify-center gap-2">
                                                <Calendar className="w-4 h-4" /> Book Now
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <LandingFooter />
        </div>
    );
};
