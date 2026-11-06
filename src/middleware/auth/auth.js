import jwt from 'jsonwebtoken';

/**
 * The Engine of Authentication:
 * generateToken: Creates a JWT for a user, embedding their ID and setting an expiration.
 * generateToken(user)
*/
export const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '10m',
    })
};
