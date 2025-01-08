const mongoose = require('mongoose');

// UserBadge Schema (representing the relationship between users and badges)
const UserBadgeSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to User model
      required: true 
    },
    badgeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Badge', // Reference to Badge model
      required: true 
    },
    earned_at: { 
      type: Date, 
      default: Date.now, // Default to the current date if not provided
      required: true 
    }
  },
  {
    timestamps: true // Automatically manages `createdAt` and `updatedAt`
  }
);

// Export the UserBadge Model
const UserBadge = mongoose.model('UserBadge', UserBadgeSchema);

module.exports = UserBadge;
