import express from 'express';
import {
    getAdminDashboard,
    getAllUsers,
    deleteUser,
    approveProvider,
    rejectProvider,
    getProviders,
    seedMockData,
} from '../controllers/admin.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

// All routes are protected and require 'admin' role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// Dashboard stats
router.get('/dashboard', getAdminDashboard);

// Seed Mock Data
router.post('/seed', seedMockData);

// Users & providers listing
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Provider management
router.get('/providers', getProviders);
router.patch('/providers/:id/approve', approveProvider);
router.patch('/providers/:id/reject', rejectProvider);

export default router;
