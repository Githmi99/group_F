// routes/componentRequestRoutes.js

const express = require('express');
const router = express.Router();
const componentRequestController = require('../controllers/componentRequestController');

// Route to create a new component request
router.post('/component-request', componentRequestController.createRequest);

// Route to get all component requests
router.get('/component-request', componentRequestController.getAllRequests);

// Route to update the status of a component request
router.patch(
  '/component-request/:id/status',
  componentRequestController.updateRequestStatus
);

module.exports = router;
