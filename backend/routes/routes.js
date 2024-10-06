const express = require('express');
const router = express.Router();

// Dummy user database
const users = [];

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Register route
router.post('/register', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const userExists = users.some(u => u.email === email);

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    users.push({ firstName, lastName, email, phone, password });
    res.json({ message: 'Registration successful' });
  }
});

module.exports = router;