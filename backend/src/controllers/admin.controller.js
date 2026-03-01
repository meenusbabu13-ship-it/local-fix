import User from '../models/User.js';
import Provider from '../models/Provider.js';
import Booking from '../models/Booking.js';

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
export const getAdminDashboard = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProviders = await Provider.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const pendingProviders = await Provider.countDocuments({ status: 'pending' });
        const approvedProviders = await Provider.countDocuments({ status: 'approved' });
        const rejectedProviders = await Provider.countDocuments({ status: 'rejected' });
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProviders,
                totalBookings,
                pendingProviders,
                approvedProviders,
                rejectedProviders,
                pendingBookings,
                completedBookings,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users and providers
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        const providers = await Provider.find().select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users,
            providers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a user or provider
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userType } = req.query;

        let Model = userType === 'provider' ? Provider : User;

        const user = await Model.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        await Model.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'User deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

// @desc    Approve a provider
// @route   PATCH /api/admin/providers/:id/approve
// @access  Private (Admin only)
export const approveProvider = async (req, res, next) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findById(id);
        if (!provider) {
            return res.status(404).json({ success: false, message: 'Provider not found.' });
        }

        provider.status = 'approved';
        provider.rejectionReason = '';
        await provider.save();

        res.status(200).json({
            success: true,
            message: `Provider "${provider.name}" has been approved. They can now log in.`,
            provider: {
                id: provider._id,
                name: provider.name,
                email: provider.email,
                status: provider.status,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reject a provider
// @route   PATCH /api/admin/providers/:id/reject
// @access  Private (Admin only)
export const rejectProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const provider = await Provider.findById(id);
        if (!provider) {
            return res.status(404).json({ success: false, message: 'Provider not found.' });
        }

        provider.status = 'rejected';
        provider.rejectionReason = reason || 'Application did not meet requirements.';
        await provider.save();

        res.status(200).json({
            success: true,
            message: `Provider "${provider.name}" has been rejected.`,
            provider: {
                id: provider._id,
                name: provider.name,
                email: provider.email,
                status: provider.status,
                rejectionReason: provider.rejectionReason,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all providers with status filtering
// @route   GET /api/admin/providers
// @access  Private (Admin only)
export const getProviders = async (req, res, next) => {
    try {
        const { status } = req.query;
        const filter = status && status !== 'all' ? { status } : {};

        const providers = await Provider.find(filter).select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            providers,
            counts: {
                all: await Provider.countDocuments(),
                pending: await Provider.countDocuments({ status: 'pending' }),
                approved: await Provider.countDocuments({ status: 'approved' }),
                rejected: await Provider.countDocuments({ status: 'rejected' }),
            },
        });
    } catch (error) {
        next(error);
    }
};
