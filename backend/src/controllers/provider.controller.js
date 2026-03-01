import Provider from '../models/Provider.js';
import Booking from '../models/Booking.js';

// @desc    Get public providers (approved only), optionally filter by category
// @route   GET /api/providers/public
// @access  Public
export const getPublicProviders = async (req, res, next) => {
    try {
        const { category } = req.query;
        let query = { status: 'approved' };

        if (category) {
            query.serviceCategory = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        const providers = await Provider.find(query).select('-password');

        res.status(200).json({
            success: true,
            count: providers.length,
            providers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get provider dashboard data
// @route   GET /api/providers/dashboard
// @access  Private (Provider only)
export const getProviderDashboard = async (req, res, next) => {
    try {
        const provider = await Provider.findById(req.user.id).select('-password');

        if (!provider) {
            return res.status(404).json({
                success: false,
                message: 'Provider not found.',
            });
        }

        // Get bookings for this provider
        const bookings = await Booking.find({ providerId: req.user.id })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        // Calculate stats
        const totalBookings = bookings.length;
        const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
        const completedBookings = bookings.filter((b) => b.status === 'completed').length;

        res.status(200).json({
            success: true,
            provider,
            stats: {
                totalBookings,
                pendingBookings,
                completedBookings,
            },
            bookings,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update provider profile
// @route   PUT /api/providers/profile
// @access  Private (Provider only)
export const updateProviderProfile = async (req, res, next) => {
    try {
        const { name, email, serviceCategory, availability } = req.body;

        const provider = await Provider.findById(req.user.id);

        if (!provider) {
            return res.status(404).json({
                success: false,
                message: 'Provider not found.',
            });
        }

        // Update fields
        if (name) provider.name = name;
        if (email) provider.email = email;
        if (serviceCategory) provider.serviceCategory = serviceCategory;
        if (availability) provider.availability = availability;

        const updatedProvider = await provider.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            provider: {
                id: updatedProvider._id,
                name: updatedProvider.name,
                email: updatedProvider.email,
                serviceCategory: updatedProvider.serviceCategory,
                availability: updatedProvider.availability,
                role: updatedProvider.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status
// @route   PUT /api/providers/bookings/:id
// @access  Private (Provider only)
export const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['confirmed', 'completed', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const booking = await Booking.findOne({ _id: req.params.id, providerId: req.user.id });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({
            success: true,
            message: `Booking status updated to ${status}`,
            booking,
        });

    } catch (error) {
        next(error);
    }
};
