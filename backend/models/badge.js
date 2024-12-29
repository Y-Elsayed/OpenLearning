const mongoose = require('mongoose');

// Badge Schema
const BadgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    awarded_on: { type: Date, default: Date.now },
    image_url: { type: String, default: null}
  },
  {
    timestamps: true // Automatically manages `createdAt` and `updatedAt`
  }
);

// Export the Badge Model
const Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge;
