const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  partNo: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dateOfNeed: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Request', RequestSchema);
