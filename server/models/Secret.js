const mongoose = require('mongoose');

// Define the schema (the blueprint) for our secret
const secretSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the model from the schema
const Secret = mongoose.model('Secret', secretSchema);

// Export the model so we can use it in other files
module.exports = Secret;