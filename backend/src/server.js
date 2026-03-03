import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorMiddleware from './middleware/error.middleware.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import providerRoutes from './routes/provider.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

import mongoose from 'mongoose';

// Connect to MongoDB
connectDB();

// Global Database Check Middleware
app.use((req, res, next) => {
    // 0 = disconnected, 3 = disconnecting
    if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
        return res.status(500).json({
            success: false,
            message: 'Database is not connected. Please ensure MONGO_URI is precisely set in your Vercel Environment Variables and Network Access is open to 0.0.0.0/0 on MongoDB Atlas.'
        });
    }
    next();
});

// Middleware
app.use(cors()); // Allow all origins for easier deployment

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌐 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    });
}

export default app;
