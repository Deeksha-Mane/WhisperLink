const express = require('express');
const router = express.Router();
const Secret = require('../models/Secret'); // Go up one level to find the models folder

// --- Create a new secret ---
// @route   POST /api/secrets
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Create a new secret document
    const newSecret = new Secret({ message });

    // Save it to the database
    await newSecret.save();

    // Respond with the ID of the new secret
    res.status(201).json({ id: newSecret._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- Get and destroy a secret ---
// @route   GET /api/secrets/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the secret by its ID
    const secret = await Secret.findById(id);

    if (secret) {
      // If found, delete it immediately
      await Secret.findByIdAndDelete(id);
      // And then send the message back to the user
      res.status(200).json({ message: secret.message });
    } else {
      // If not found, it was likely already burned
      res.status(404).json({ error: 'Secret not found or already burned' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;