import express from 'express';
import { registerUser, login } from '../controllers/auth.controller.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user or provider
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user/provider/admin
// @access  Public
router.post('/login', login);

export default router;
