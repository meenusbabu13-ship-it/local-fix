const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Check if user exists (should be set by authMiddleware)
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required.',
                });
            }

            // Check if user's role is allowed
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. Insufficient permissions.',
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Server error during authorization.',
            });
        }
    };
};

export default roleMiddleware;
