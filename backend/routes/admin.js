// routes/admin.js

const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');

// Example of a protected admin route
router.get('/admin-only', authAdmin, (req, res) => {
    res.send('This is an admin-only route');
});

module.exports = router;
