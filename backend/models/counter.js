const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name to track (e.g., "componentID")
  seq: { type: Number, default: 0 }, // Sequence number for this counter
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
