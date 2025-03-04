const mongoose = require('mongoose');

// Main User Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'prefer not to say'], default: null , required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // email validation
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    preferences: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now , immutable: true}, // timestamp of user creation
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true // Automatically manages `createdAt` and `updatedAt`
  }
);

// Export the User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
