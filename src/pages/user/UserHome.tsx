import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card } from '../../components/ui/Card';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
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
    ArrowRight
} from 'lucide-react';

export const UserHome = () => {
    const { user, isNewUser, resetNewUser } = useAuthStore();

    const [providers, setProviders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const data = await api.getPublicProviders();
                setProviders(data.providers.slice(0, 5)); // Get top 5
            } catch (err) {
                console.error("Failed to fetch providers", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();

        return () => {
            if (isNewUser) {
                resetNewUser();
            }
        };
    }, [isNewUser, resetNewUser]);

    return (
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
    );
};
