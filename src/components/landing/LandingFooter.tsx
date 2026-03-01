import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Lock, Shield, Twitter, Instagram, Github, Mail, MapPin, Phone } from 'lucide-react';

export const LandingFooter = () => {
    return (
        <footer className="pt-32 pb-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-10">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex items-center gap-3 group">
                                <img
                                    src="/logo.png"
                                    alt="LocalFix Logo"
                                    className="w-14 h-14 object-contain group-hover:scale-105 transition-all duration-300 drop-shadow-md"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        const fallback = document.getElementById('footer-logo-fallback');
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                                <div id="footer-logo-fallback" style={{ display: 'none' }} className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl items-center justify-center shadow-indigo">
                                    <span className="text-white font-bold text-xl">LF</span>
                                </div>
                                <span className="text-2xl font-display font-extrabold text-white">
                                    Local<span className="text-slate-400">Fix</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
                            Making home maintenance simple, transparent, and absolutely reliable for homeowners across the country.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Github, href: '#' },
                                { icon: Mail, href: '#' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    to={social.href}
                                    className="w-12 h-12 rounded-2xl glass dark:glass-dark flex items-center justify-center hover:bg-primary hover:text-white hover:shadow-indigo transition-all duration-300 group"
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="text-lg font-black mb-8 text-slate-900 dark:text-white uppercase tracking-widest text-sm">Services</h4>
                        <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-bold">
                            <li><Link to="/services/plumbing" className="hover:text-primary transition-colors">Plumbing</Link></li>
                            <li><Link to="/services/electrical" className="hover:text-primary transition-colors">Electrical</Link></li>
                            <li><Link to="/services/carpentry" className="hover:text-primary transition-colors">Carpentry</Link></li>
                            <li><Link to="/services/repairs" className="hover:text-primary transition-colors">Repairs</Link></li>
                            <li><Link to="/services/smart home" className="hover:text-primary transition-colors">Smart Home</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="text-lg font-black mb-8 text-slate-900 dark:text-white uppercase tracking-widest text-sm">Company</h4>
                        <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-bold">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/press" className="hover:text-primary transition-colors">Press</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h4 className="text-lg font-black mb-8 text-slate-900 dark:text-white uppercase tracking-widest text-sm">Our Offices</h4>
                            <div className="space-y-4 text-slate-500 dark:text-slate-400 font-bold">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span>100 Innovation Way, San Francisco</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <span>+1 (800) LOCAL-FIX</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-500">
                                <Lock className="w-4 h-4 text-primary" />
                                SSL Encrypted
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-500">
                                <Shield className="w-4 h-4 text-primary" />
                                PCI Compliant
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                        © 2025 LocalFix Inc. Redefining home care for a better world.
                    </p>
                    <div className="flex gap-8 text-sm text-slate-500 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            Operational
                        </span>
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
