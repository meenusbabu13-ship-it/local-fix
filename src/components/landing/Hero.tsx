import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 px-4 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-24 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute top-48 -right-20 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 space-y-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-soft"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <img key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="User" />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            Trusted by <span className="text-primary">50,000+</span> happy homeowners
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl lg:text-[100px] font-display font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white"
                        >
                            Your Home, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-indigo-600">
                                Perfected.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium"
                        >
                            Connect with elite, background-checked professionals for all your home maintenance needs. Quality service, guaranteed in 2025.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Link to="/signup">
                            <Button size="lg" className="btn-primary w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold group shadow-indigo">
                                Book a Service
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/services">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold border-2 border-slate-200 dark:border-slate-800">
                                View Services
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                        </div>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                        <p className="text-sm font-bold text-slate-500">
                            Rated 4.9/5 by Google & Trustpilot
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="relative"
                >
                    <div className="relative z-10 w-full aspect-square animate-float">
                        <img
                            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200"
                            alt="Home Services Illustration"
                            className="w-full h-full object-cover rounded-[4rem] shadow-premium ring-1 ring-white/20"
                        />
                    </div>

                    {/* Floating Glass Cards */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 glass dark:glass-dark p-6 rounded-[2.5rem] shadow-premium z-20 flex items-center gap-5 border border-white/20"
                    >
                        <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Quality</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">100% Verified</p>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-10 -left-10 glass dark:glass-dark p-6 rounded-[2.5rem] shadow-premium z-20 flex items-center gap-5 border border-white/20"
                    >
                        <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Security</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">Fully Insured</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
