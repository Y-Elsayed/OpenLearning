const mongoose = require('mongoose');

// Badge Schema
const BadgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    awardedOn: { type: Date, default: Date.now },
    imageURL: { type: String, default: null}
  },
  {
    timestamps: true // Automatically manages `createdAt` and `updatedAt`
  }
);

// Export the Badge Model
const Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge;
