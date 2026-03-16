import express from 'express';
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
