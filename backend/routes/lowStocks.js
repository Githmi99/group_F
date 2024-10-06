const express = require('express');
const router = express.Router();
const Component = require('../models/component');

// Route to get low stock components
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockComponents = await Component.find({ qty: { $lt: 10 } });
    res.json({ components: lowStockComponents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
