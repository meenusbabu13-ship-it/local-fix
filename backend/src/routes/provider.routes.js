import express from 'express';
import { getProviderDashboard, updateProviderProfile } from '../controllers/provider.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

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

export default router;
