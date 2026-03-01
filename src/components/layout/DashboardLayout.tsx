import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

export const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="flex pt-16">
                <Sidebar isOpen={isSidebarOpen} />

                <motion.main
                    animate={{
                        marginLeft: isSidebarOpen ? 280 : 0,
                        width: isSidebarOpen ? 'calc(100% - 280px)' : '100%'
                    }}
                    transition={{ duration: 0.3 }} // Match sidebar transition
                    className="flex-1 p-6 sm:p-8 min-h-[calc(100vh-64px)] hidden md:block" // Desktop main
                >
                    <Outlet />
                </motion.main>

                {/* Mobile Main */}
                <main className="flex-1 p-4 w-full md:hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
