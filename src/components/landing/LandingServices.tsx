import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Zap, Wrench, ArrowRight, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    { name: 'Plumbing', icon: Droplets, color: 'text-blue-400', bgi: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Electrical', icon: Zap, color: 'text-amber-400', bgi: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Carpentry', icon: Hammer, color: 'text-orange-400', bgi: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800' },
    { name: 'Repairs', icon: Wrench, color: 'text-emerald-400', bgi: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800' },
];

export const LandingServices = () => {
    return (
        <section className="py-32 bg-slate-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-widest border border-primary/30"
                        >
                            Most Requested
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight">
                            Top Rated <br />
                            <span className="text-primary">Services</span>
                        </h2>
                    </div>
                    <Link to="/services">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] text-white font-black hover:bg-white/10 transition-all flex items-center gap-3 group"
                        >
                            View All Categories
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((s, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -20 }}
                            className="relative h-[500px] rounded-[3.5rem] overflow-hidden group shadow-premium"
                        >
                            <Link to={`/services/${s.name.toLowerCase()}`} className="absolute inset-0 z-20 block cursor-pointer" />
                            <img
                                src={s.bgi}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125"
                                alt={s.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="absolute bottom-12 left-10 right-10 space-y-4">
                                <div className={`w-14 h-14 glass backdrop-blur-2xl rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                                    <s.icon className={`w-7 h-7 ${s.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white mb-2">{s.name}</h3>
                                    <p className="text-slate-400 font-bold group-hover:text-white transition-colors">Starting at <span className="text-white">$49/hr</span></p>
                                </div>
                            </div>

                            <div className="absolute top-10 right-10 w-14 h-14 rounded-full glass backdrop-blur-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0">
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
