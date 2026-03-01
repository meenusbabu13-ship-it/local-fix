import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { useAppStore } from '../../stores/useAppStore';
import { Sun, Moon, Menu, Bell, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export const Navbar = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
    const { isAuthenticated, user } = useAuthStore();
    const { theme, toggleTheme } = useAppStore();
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/admin');

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '/services' },
        { name: 'How it works', href: '/how-it-works' },
        { name: 'Join as Pro', href: '/join-pro' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'h-20 glass dark:glass-dark shadow-premium'
                : 'h-24 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-4">
                        {isDashboard && (
                            <button onClick={toggleSidebar} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition-colors">
                                <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                            </button>
                        )}
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src="/logo.png"
                                alt="LocalFix Logo"
                                className="w-14 h-14 object-contain group-hover:scale-105 transition-all duration-300 drop-shadow-md"
                                onError={(e) => {
                                    // Fallback if they haven't saved it yet
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const fallback = document.getElementById('logo-fallback');
                                    if (fallback) fallback.style.display = 'flex';
                                }}
                            />
                            {/* Fallback icon just in case the image isn't named logo.png yet */}
                            <div id="logo-fallback" style={{ display: 'none' }} className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl items-center justify-center shadow-indigo">
                                <span className="text-white font-bold text-xl">LF</span>
                            </div>
                            <span className="text-2xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Local<span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Fix</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 border border-transparent"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user?.name}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{user?.role}</p>
                                </div>
                                {user?.avatar && (
                                    <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/10" />
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" className="font-bold">Log In</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="btn-primary px-8 shadow-indigo font-bold">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass dark:glass-dark border-t border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block text-lg font-bold text-slate-900 dark:text-white hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full text-lg font-bold">Log In</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full btn-primary text-lg font-bold shadow-indigo">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
