import express from 'express';
import { getProviderDashboard, updateProviderProfile, getPublicProviders, updateBookingStatus } from '../controllers/provider.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

// @route   GET /api/providers/public
// @desc    Get all approved providers (for website visitors)
// @access  Public
router.get('/public', getPublicProviders);

// All routes are protected and require 'provider' role
router.use(authMiddleware);
router.use(roleMiddleware('provider'));

// @route   GET /api/providers/dashboard
// @desc    Get provider dashboard data
// @access  Private (Provider only)
router.get('/dashboard', getProviderDashboard);

// @route   PUT /api/providers/profile
// @desc    Update provider profile
// @access  Private (Provider only)
router.put('/profile', updateProviderProfile);

// @route   PUT /api/providers/bookings/:id
// @desc    Update booking status
// @access  Private (Provider only)
router.put('/bookings/:id', updateBookingStatus);

export default router;
