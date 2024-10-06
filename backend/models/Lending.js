const mongoose = require('mongoose');

const lendingSchema = new mongoose.Schema({
    stockID: { type: String, required: true },
    borrowerID: { type: String, required: true },
    borrowedDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    notes: { type: String, default: '' },
    status: { type: String, enum: ['Completed', 'Pending', 'Error'], default: 'Pending' }
});

const Lending = mongoose.model('Lending', lendingSchema);

module.exports = Lending;
