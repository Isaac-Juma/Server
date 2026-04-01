// User Controller Comunicates with Model to Handles Requests
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import userGoals from '../models/userGoals.js';
import { generateToken } from '../Auth/auth.js';

/**
 * Action logic for user-related ops like: if user login do this, if user reg do this.
 * if user says get my profile, do this, etc.
 */






/**
 * login flow with authentication and validation
 * generates a JWT token for the user upon successful login, which can be used for subsequent authenticated requests.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        experience: user.experience,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get User Profile after authentication
 * Get /api/users/profile
 * Create a way to store the usersProfile to the Db
 */
export const UserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. No user ID in token.',
      });
    }

    const userProfile = await User.findById(userId).select('-password');

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

// Post to a document in the userGoals collection with the provided data
export const createUserGoals = async (req, res, next) => {
  try {
    const { Goal, Reminder, Deadline } = req.body;
    const userData = await userGoals.create({ Goal, Reminder, Deadline });
    res.status(201).json({
      success: true,
      message: 'User goals created successfully',
      data: userData,
    })
  } catch (error) {
    next(error);
  }
}



/**
 * Qury the database for user Information based on the intended use of the endpoint.
 * Endpoints include:
 * - Get User Level Information
 */
export const updateUserGoals = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { goals } = req.body;

    const user = await userGoals.findByIdAndUpdate(id, { goals }, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User goals not found',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
      next(error);
  }
}


 /** 
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */


/**
 * Get User Level Information
 * Get /api/Users/Level/:LevelNumber
 */
export const getUserLevelInfo = async (req, res, next) => {
  try {
    const { LevelNumber } = req.params;
    const LevelInfo = await Level.findOne({ Level: LevelNumber });
    if (!LevelInfo) {
      return res.status(404).json({
        success: false,
        message: 'Level not found',
      });
    };
  }
  catch (error) {
    next(error);
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * Get Leveled User Leaderboard
 * Get /api/Users/Leaderboard/Top
 */
export const getLeveledLeaderboard = async (req, res, next) => {
  try {
    const LevelBoard = await User.find({}).sort({ level: -1, experience: -1}).limit(10);
    res.status(200).json({
      success: true,
      count: LevelBoard.length,
      data: LevelBoard,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all users (excluding passwords)
 * GET /api/users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Get single user by ID
 * GET /api/users/:id
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new user
 * POST /api/users
 */
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required',
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      level: newUser.level,
      experience: newUser.experience,
      highScore: newUser.highScore,
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update user by ID
 * PUT /api/users/:id
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, level, experience, highScore } = req.body;

    // Prepare update object (only allow certain fields)
    const allowedUpdates = { username, email, level, experience, highScore };
    const updateData = {};

    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] !== undefined) {
        updateData[key] = allowedUpdates[key];
      }
    });

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Validate before updating
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete user by ID
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get user leaderboard (sorted by highScore)
 * GET /api/users/leaderboard/top
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to top 10

    const leaderboard = await User.find({})
      .select('-password')
      .sort({ highScore: -1 }) // Sort by highest score first
      .limit(limit);

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (err) {
    next(err);
  }
};
