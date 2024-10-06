const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Get all purchases
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new purchase
router.post('/', async (req, res) => { // Change this line from app.post to router.post
    console.log('Received purchase data:', req.body); // Log the data received
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).json(purchase);
    } catch (err) {
        console.error('Error creating purchase:', err); // Log any errors
        res.status(500).json({ error: 'Failed to create purchase' });
    }
});

// Update a purchase
router.put('/:id', async (req, res) => {
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPurchase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a purchase
router.delete('/:id', async (req, res) => {
    try {
        await Purchase.findByIdAndDelete(req.params.id);
        res.json({ message: 'Purchase deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
