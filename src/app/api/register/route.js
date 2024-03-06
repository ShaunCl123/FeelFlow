const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/caffeine', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Create a schema for the login collection
const loginSchema = new mongoose.Schema({
  user: String,
  pass: String
});
const Login = mongoose.model('Login', loginSchema);

// Route to handle registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new document in the login collection
    const newUser = new Login({
      user: email,
      pass: password
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Respond with error message if registration fails
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;