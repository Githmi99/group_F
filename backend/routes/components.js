const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

// Define routes and connect them to the controller methods
router.get('/', componentController.getComponents);
router.post('/', componentController.addComponent);
router.put('/:id', componentController.updateComponent);
router.delete('/:id', componentController.deleteComponent);
router.post('/components', async (req, res) => {
    try {
        const component = new Component(req.body);
        await component.save();
        res.status(201).json(component);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/components/:id', async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json({ message: 'Component deleted successfully' });
    } catch (error) {
        console.error('Error deleting component:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update component by ID
router.put('/components/:id', async (req, res) => {
    try {
        const component = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json(component);
    } catch (error) {
        console.error('Error updating component:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/low-stock', async (req, res) => {
    try {
      const lowStockComponents = await Component.find({ qty: { $lt: 10 } });
      res.json({ components: lowStockComponents });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
