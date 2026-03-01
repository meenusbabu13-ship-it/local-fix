import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const LandingCTA = () => {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="max-w-7xl mx-auto rounded-[4rem] bg-primary px-8 py-32 text-center relative overflow-hidden shadow-indigo"
            >
                {/* Immersive Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter">
                            Ready to <br />Fix That Thing?
                        </h2>
                        <p className="text-xl md:text-2xl text-indigo-100 font-medium">
                            Join over 50,000 satisfied homeowners. Get your home back in shape today.
                            Professional care is just 2 minutes away.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/signup">
                            <Button size="lg" className="w-full sm:w-auto h-20 px-12 bg-white text-primary hover:bg-slate-50 btn-premium shadow-2xl text-xl font-black rounded-3xl">
                                Get Started Now
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="lg" className="w-full sm:w-auto h-20 px-12 bg-primary-hover text-white border-2 border-white/20 hover:bg-white hover:text-primary btn-premium text-xl font-black rounded-3xl transition-all duration-500">
                                Join as a Pro
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-8 flex flex-wrap justify-center gap-8 text-white/60 font-black uppercase tracking-widest text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            No Credit Card Required
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            Cancel Anytime
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            24/7 Support
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
