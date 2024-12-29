const mongoose = require('mongoose');

// Main User Schema
const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'prefer not to say'], default: null },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // email validation
    password: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    preferences: { type: [String], default: [] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: true // Automatically manages `createdAt` and `updatedAt`
  }
);

// Export the User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
