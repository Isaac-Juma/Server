import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  authenticateUser,
  loginUser,
  UserProfile
} from '../controllers/userController.js';

// Routes Communicate with User Controller to Handle Requests

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLeaderboard,
  getLeveledLeaderboard,
  createUserGoals
} from '../controllers/userController.js';

const router = express.Router();

/**
 * ═══════════════════════════════════════════════════════════
 * USER ROUTES
 * ═══════════════════════════════════════════════════════════
 */

/**
 * API URL LIST:
 * Defines endpoints for user-related ops like reg/login, profile management.
 * should use auth check for protected routes (profile, update, delete)
 * 
 */
router.post('/register', (req, res) => {
  res.send('Register route');
});

// Protected route using authMiddleware to ensure only authenticated users can access it
router.post('/authenticate', authenticateUser, loginUser); // Authenticate user and return JWT token

router.get('/Users', authMiddleware, getUserById); // Example of protected route using authMiddleware

router.get('/profile', authMiddleware, UserProfile); // Protected route to get user profile after authentication

router.put('/Users/:id', authMiddleware, updateUser); // Example of protected route using authMiddleware

router.delete('/Users/:id', authMiddleware, deleteUser); 

/**
 * User Goals Endpoint
 * POST /api/usergoals
 * 
*/
router.post('/usergoals', createUserGoals);


/**
 * Get all users
 * GET /api/users
*/
router.get('/', getAllUsers);

/**
 * Get user leaderboard (by level)
 * Get /api/users/leaderboard/leveled
 * Note: Must come BEFORE /:id route
 */
router.get('/leaderboard/leveled', getLeveledLeaderboard);

/**
 * Get user leaderboard (by high score)
 * GET /api/users/leaderboard/top
 * Note: Must come BEFORE /:id route
 */
router.get('/leaderboard/top', getLeaderboard);

/**
 * Get single user by ID
 * GET /api/users/:id
 */
router.get('/:id', getUserById);

/**
 * Create new user
 * POST /api/users
 * Body: { username, email, password }
 */
router.post('/', createUser);

/**
 * Update user by ID
 * PUT /api/users/:id
 * Body: { username, email, level, experience, highScore } (all optional)
 */
router.put('/:id', updateUser);

/**
 * Delete user by ID
 * DELETE /api/users/:id
 */
router.delete('/:id', deleteUser);

export default router;
