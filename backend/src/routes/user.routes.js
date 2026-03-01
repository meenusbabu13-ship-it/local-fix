import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

// All routes are protected and require 'user' role
router.use(authMiddleware);
router.use(roleMiddleware('user'));

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private (User only)
router.get('/profile', getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private (User only)
router.put('/profile', updateUserProfile);

export default router;
