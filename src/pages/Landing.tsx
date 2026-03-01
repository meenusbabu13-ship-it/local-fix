import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { About } from '../components/landing/About';
import { LandingServices } from '../components/landing/LandingServices';
import { LandingCTA } from '../components/landing/LandingCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const Landing = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 selection:bg-primary/20 overflow-x-hidden">
            <Navbar />

            <main>
                <Hero />
                <Features />
                <About />
                <LandingServices />
                <LandingCTA />
            </main>

            <LandingFooter />
        </div>
    );
};
