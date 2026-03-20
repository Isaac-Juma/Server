import mongoose from 'mongoose';

/**
 * User Schema - defines the structure of user documents in MongoDB
 */
const userSchema = new mongoose.Schema(
  {
    // Basic Information
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },

    // Game Profile Picture for the Dashboard
    level: {
      type: Number,
      default: 1,
      min: 1,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    highScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Auth roles
    // roles: {
    //   type: String,
    //   required: true

    // },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Enable virtuals in JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Update the updatedAt timestamp before saving
 */
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Create and export the User model
 */
const User = mongoose.model('User', userSchema);

export default User;
