import express from 'express';
import { getUserProfile, updateUserProfile, createBooking, getUserBookings, reviewBooking } from '../controllers/user.controller.js';
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

// @route   POST /api/users/booking
// @desc    Create a new booking
// @access  Private (User only)
router.post('/booking', createBooking);

// @route   GET /api/users/bookings
// @desc    Get all user bookings
// @access  Private (User only)
router.get('/bookings', getUserBookings);

// @route   POST /api/users/bookings/:id/review
// @desc    Add a review to a completed booking
// @access  Private (User only)
router.post('/bookings/:id/review', reviewBooking);

export default router;
