const mongoose = require('mongoose');

const boMItemSchema = new mongoose.Schema({
  partNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  footprint: { type: String, required: true },
  description: { type: String, required: true },
});

const boMSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  items: [boMItemSchema], // Embed BoMItems schema
});

const BoM = mongoose.model('BoM', boMSchema);

module.exports = BoM;
