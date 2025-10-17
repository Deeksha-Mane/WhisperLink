// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// --- Import Routes ---
const secretRoutes = require('./routes/secrets');

// Create an Express app
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Use Routes ---
// Tell the app to use our secret routes for any URL starting with /api/secrets
app.use('/api/secrets', secretRoutes);

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully. ✅");
    // Start the server only after the database is connected
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error: ❌");
    console.error(error);
  });

// --- Test Route (We can remove this now, but it's fine to keep) ---
app.get('/', (req, res) => {
  res.json({ message: "WhisperLink API is running! 🤫" });
});