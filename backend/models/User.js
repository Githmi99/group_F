// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'executive', 'stock manager', 'intern'], // Only allow 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
});

module.exports = mongoose.model('User', UserSchema);
