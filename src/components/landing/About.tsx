import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const About = () => {
    return (
        <section className="py-32 px-4 overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-6xl font-display font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                Simplified Home Care <br />
                                <span className="text-primary italic">for Modern Living</span>
                            </h2>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                                At LocalFix, we believe your sanctuary shouldn't be a source of stress.
                                We've curated a network of the finest local experts who share our dedication to
                                artisanal craftsmanship and total integrity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                '100% Guaranteed Satisfaction',
                                'Emergency Services 24/7',
                                'Insured & Bonded Professionals',
                                'Fixed-Price Quotes Only',
                                'Direct In-App Communication',
                                'Premium Eco-friendly Options'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button className="btn-primary h-14 px-10 text-lg shadow-indigo group rounded-2xl font-bold">
                            Our Full Story
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="h-80 rounded-[3rem] bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-premium group">
                                    <img
                                        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt="Cleaning Service"
                                    />
                                </div>
                                <div className="h-56 rounded-[3rem] bg-primary flex flex-col items-center justify-center text-white text-center p-8 shadow-indigo">
                                    <div className="text-5xl font-black mb-2">12k+</div>
                                    <div className="text-xs font-black opacity-80 uppercase tracking-[0.2em]">Active Pros</div>
                                </div>
                            </div>
                            <div className="space-y-8 pt-16">
                                <div className="h-56 rounded-[3rem] bg-indigo-600 flex flex-col items-center justify-center text-white text-center p-8 shadow-premium">
                                    <div className="text-5xl font-black mb-2">99%</div>
                                    <div className="text-xs font-black opacity-80 uppercase tracking-[0.2em]">Trust Score</div>
                                </div>
                                <div className="h-80 rounded-[3rem] bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-premium group">
                                    <img
                                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt="Service"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
