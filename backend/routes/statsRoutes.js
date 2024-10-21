// routes/statsRoutes.js

const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Define the route to get stats
router.get('/stats', statsController.getStats);

// Define the route to get the latest added components
router.get('/stats/latest-components', statsController.getLatestComponents);

// Define the route to get stats
router.get('/stats/monthly-change', statsController.getMonthlyChange);

// Define the route to get latest added orders
router.get('/stats/latest-orders', statsController.getLatestPurchases);


module.exports = router;
