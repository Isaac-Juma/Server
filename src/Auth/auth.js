import jwt from 'jsonwebtoken';

/**
 * The Engine of Authentication:
 * generateToken: Creates a JWT for a user, embedding their ID and setting an expiration.
 * generateToken(user) makes a JWT token for user
 * 
 */
export const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '10m',
    })
};

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
