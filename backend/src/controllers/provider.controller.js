import Provider from '../models/Provider.js';
import Booking from '../models/Booking.js';

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
