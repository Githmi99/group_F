const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    stockID: String,
    product: String,
    partNo: String,
    value: String,
    qty: Number,
    footprint: String,
    description: String,
    status: String,
});

const Component = mongoose.model('Component', componentSchema);

module.exports = Component;
