import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, BarChart3, Smartphone, Zap, Shield, Sparkles, Award } from 'lucide-react';

const features = [
    { title: 'Verified Experts', desc: 'Every professional undergoes a rigorous 5-step background check and skill assessment.', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Real-time Booking', desc: 'Select from live availability slots and get instant confirmation for your service.', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { title: 'Transparent Pricing', desc: 'No more surprises. View exact quotes and task estimates before you commit.', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { title: 'Modern Platform', desc: 'Manage your visits, chat with pros, and handle invoices seamlessly from your phone.', icon: Smartphone, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
];

export const Features = () => {
    return (
        <section className="py-32 bg-slate-50 dark:bg-slate-900/20 px-4 relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest"
                    >
                        <Sparkles className="w-3 h-3" />
                        Our Value Prop
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-black tracking-tight"
                    >
                        Built for <span className="text-primary italic">Absolute</span> Reliability
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
                    >
                        We've reimagined home services from the ground up to solve the three biggest problems: trust, timing, and pricing.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="glass dark:glass-dark p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 hover:shadow-premium transition-all duration-300 group"
                        >
                            <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
