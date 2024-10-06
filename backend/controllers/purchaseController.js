// src/controllers/purchaseController.js
const Purchase = require('../models/Purchase');

// Get all purchases
const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases' });
  }
};

// Add a new purchase
const addPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(400).json({ message: 'Error adding purchase' });
  }
};

module.exports = { getPurchases, addPurchase };
