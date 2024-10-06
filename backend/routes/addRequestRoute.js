const express = require('express');
const { check, validationResult } = require('express-validator');
const Request = require('../models/Request'); // Ensure the path is correct

const router = express.Router();

// Add a new request
router.post(
  '/add-request',
  [
    check('partNo', 'Part number is required').notEmpty(),
    check('quantity', 'Quantity must be a positive number').isInt({ min: 1 }),
    check('dateOfNeed', 'Date of need is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { partNo, quantity, dateOfNeed } = req.body;

    try {
      const newRequest = new Request({
        partNo,
        quantity,
        dateOfNeed,
      });

      const savedRequest = await newRequest.save();

      res.status(201).json({ 
        message: 'Request added successfully', 
        request: savedRequest 
      });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
