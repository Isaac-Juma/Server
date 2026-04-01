import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
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

// Protected route using authMiddleware to ensure only authenticated users can access it

router.post('/login', loginUser)

router.get('/Users', authenticateToken, getUserById); // Example of protected route using authenticateToken

router.get('/profile', authenticateToken, UserProfile); // Protected route to get user profile after authentication

router.put('/Users/:id', authenticateToken, updateUser); // Example of protected route using authenticateToken

router.delete('/Users/:id', authenticateToken, deleteUser); 

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
