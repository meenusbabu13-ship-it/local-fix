import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Provider from '../models/Provider.js';
import Admin from '../models/Admin.js';

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user or provider
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password.',
            });
        }

        if (role === 'provider') {
            const {
                phone,
                serviceCategory,
                experience,
                pricing,
                address,
                coverageRadius,
                lat,
                lng,
                documents,
            } = req.body;

            // Validate provider-specific required fields
            const missing = [];
            if (!phone) missing.push('phone');
            if (!serviceCategory) missing.push('serviceCategory');
            if (experience === undefined || experience === null || experience === '') missing.push('experience');
            if (!pricing) missing.push('pricing');
            if (!address) missing.push('address');
            if (!coverageRadius) missing.push('coverageRadius');
            if (lat === undefined || lat === null || lat === '') missing.push('latitude');
            if (lng === undefined || lng === null || lng === '') missing.push('longitude');

            if (missing.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required provider fields: ${missing.join(', ')}.`,
                });
            }

            // Check if provider already exists
            const existingProvider = await Provider.findOne({ email });
            if (existingProvider) {
                return res.status(400).json({
                    success: false,
                    message: 'A provider with this email already exists.',
                });
            }

            const newProvider = await Provider.create({
                name,
                email,
                password,
                phone,
                serviceCategory,
                experience: Number(experience),
                pricing: Number(pricing),
                address,
                coverageRadius: Number(coverageRadius),
                location: { lat: Number(lat), lng: Number(lng) },
                documents: documents || [],
                status: 'pending', // Always start as pending
            });

            // Do NOT generate a token for providers — they must be approved first
            return res.status(201).json({
                success: true,
                message: 'Registration submitted! Your application is pending admin approval. You will be notified once approved.',
                pendingApproval: true,
                provider: {
                    id: newProvider._id,
                    name: newProvider.name,
                    email: newProvider.email,
                    status: newProvider.status,
                },
            });
        } else {
            // Default to User
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists with this email.',
                });
            }

            const newUser = await User.create({ name, email, password });
            const token = generateToken(newUser._id, newUser.role);

            return res.status(201).json({
                success: true,
                message: 'Registration successful.',
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Login user/provider/admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password.',
            });
        }

        let Model;
        if (role === 'admin') {
            Model = Admin;
        } else if (role === 'provider') {
            Model = Provider;
        } else {
            Model = User;
        }

        const user = await Model.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        // Block providers who are pending or rejected
        if (role === 'provider') {
            if (user.status === 'pending') {
                return res.status(403).json({
                    success: false,
                    message: 'Your account is pending admin approval. Please wait for approval before logging in.',
                    status: 'pending',
                });
            }
            if (user.status === 'rejected') {
                return res.status(403).json({
                    success: false,
                    message: `Your application has been rejected. Reason: ${user.rejectionReason || 'No reason provided.'}`,
                    status: 'rejected',
                });
            }
        }

        const token = generateToken(user._id, user.role);

        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                name: user.name || 'Admin',
                email: user.email,
                role: user.role,
                ...(role === 'provider' && {
                    status: user.status,
                    serviceCategory: user.serviceCategory,
                    experience: user.experience,
                    pricing: user.pricing,
                    address: user.address,
                    coverageRadius: user.coverageRadius,
                    location: user.location,
                }),
            },
        });
    } catch (error) {
        next(error);
    }
};
