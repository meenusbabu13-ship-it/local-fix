import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, ...props }: any) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={`bg-white dark:bg-dark-card rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-800 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};
