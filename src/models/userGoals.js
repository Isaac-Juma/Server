import mongoose from "mongoose";

/**
 * User Goals Schema
 * This schema defines the structure for storing user goals and preferences in the database.
 * It is designed to be flexible, allowing users to have multiple goals and preferences that can be easily updated.
 */

// Blueprint for an apartment complex (database) where each room (document) represents a user's goals and preferences
// Each user has a unique room (document) that contains their goals and how they want to achieve them (preferences) 
    /**
     * userId: A unique identifier for the user, linked to the User collection.
     * Goals: an array of strings representing the user's Goals (e.g., "Improve Awareness", "Character Development", "Play")
     */

const userGoalsSchema = new mongoose.Schema(
// .Schema = creates a new room in the apartment complex (database)
    {
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     default: null,
        // },

        Goal: {
            type: String,
            default: ' ',
        },

        Reminder: {
            type: Date,
            default: null,
        },

        Deadline: {
            type: Date,
            default: null,
        },


    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the UserGoals model
const userGoals = mongoose.model('UserGoals', userGoalsSchema);

export default userGoals;
