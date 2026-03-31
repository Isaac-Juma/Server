import express from 'express';
import userGoals from '../models/userGoals.js';

const router = express.Router();
/**
 * API Routes
 * Login and Register endpoints will be added in the future when I implement authentication and user management.
 * 
*/

/**
 * Login Endpoint
 * Post /api/auth/login
 * Accepts email and password, returns JWT token if successful
 * This will be used by the frontend to authenticate users and protect routes that require authentication. 
 * The token will be stored in localStorage on the frontend and sent in the Authorization header for protected API requests.
 * 
 */
router.post('/auth/login', )

/**
 * SetGoals  Endpoint
 * GET /api/SetGoals
 */
// start here: Create a form that allows users to set their goals and preferences, and then save that data to the database using the userGoalsModel. 

/**
 * UserProfile Endpoint
 * GET /api/UserProfile
 */

/**
 * Health Check Endpoint
 * GET /api/health
 * Used by frontend or monitoring tools to check if server is running
 */


/**
 * Leveled Leaderboard Endpoint
 * GET /api/Leaderboard/Leveled
 * Returns the top 10 users ranked by level and experience
 */

/**
 * Welcome Endpoint
 * GET /api
 * Returns API information
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Solo Leveling Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      documentation: 'See README.md for full API documentation',
    },
  });
});

/**
 * Create a way to store the usersData to the Db
 */
router.post('/usergoals', async (req, res, next) => {
  try {
    const { Goal, Reminder, Deadline } = req.body;
    const userData = await userGoals.create({ Goal, Reminder, Deadline });
    res.status(201).json({
      success: true,
      message: 'User goals created successfully',
      data: userData,
    });
  } catch (error) {
    next(error);
  }

});

export default router;
