import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Provider from '../models/Provider.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (User only)
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (User only)
export const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new booking
// @route   POST /api/users/booking
// @access  Private (User only)
export const createBooking = async (req, res, next) => {
    try {
        const { providerId, date, time, description } = req.body;

        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: 'Provider not found.',
            });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            providerId: provider._id,
            service: provider.serviceCategory,
            date,
            time,
            description,
            price: provider.pricing,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully.',
            booking
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user bookings
// @route   GET /api/users/bookings
// @access  Private (User only)
export const getUserBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('providerId', 'name serviceCategory email phone avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add review to completed booking
// @route   POST /api/users/bookings/:id/review
// @access  Private (User only)
export const reviewBooking = async (req, res, next) => {
    try {
        const { rating, review } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: 'Provide a valid rating between 1 and 5.' });
        }

        const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found.' });
        }

        if (booking.status !== 'completed') {
            return res.status(400).json({ success: false, message: 'You can only review completed jobs.' });
        }

        booking.rating = rating;
        booking.review = review;
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Review submitted successfully.',
            booking,
        });
    } catch (error) {
        next(error);
    }
};
