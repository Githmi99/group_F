const express = require('express');
const router = express.Router();
const Lending = require('../models/Lending');

// Get all lendings
router.get('/', async (req, res) => {
    try {
        const lendings = await Lending.find();
        res.json(lendings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new lending
router.post('/', async (req, res) => {
    try {
        const lending = new Lending(req.body);
        await lending.save();
        res.status(201).json(lending);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a lending
router.put('/:id', async (req, res) => {
    try {
        const updatedLending = await Lending.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLending);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a lending
router.delete('/:id', async (req, res) => {
    try {
        await Lending.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lending deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
