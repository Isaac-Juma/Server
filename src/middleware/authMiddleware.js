import jwt from 'jsonwebtoken';

/**
 * Authentication middleware to protect routes that require authentication.
 * Authorization: Bearer Token
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.',
        });
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token.',
                });
            }
            req.user = user;
            next();
        })
    }
};
