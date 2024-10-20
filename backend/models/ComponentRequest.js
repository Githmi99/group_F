// models/ComponentRequest.js

const mongoose = require('mongoose');

const componentRequestSchema = new mongoose.Schema({
  partNo: { type: String, required: true },
  quantity: { type: Number, required: true },
  dateOfNeed: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['Not Issued', 'Issued'],
    default: 'Not Issued',
  },
});

module.exports = mongoose.model('ComponentRequest', componentRequestSchema);
