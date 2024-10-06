const Component = require('../models/component');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique ID generation

// Get all components
exports.getComponents = async (req, res) => {
    try {
        const components = await Component.find();
        res.json(components);
    } catch (err) {
        console.error('Error fetching components:', err);
        res.status(500).json({ message: 'Error fetching components', error: err.message });
    }
};

// Add a new component
exports.addComponent = async (req, res) => {
    const { product, partNo, value, qty, footprint, description, status } = req.body;

    // Basic validation
    if (!partNo) {
        console.error('Part number is required');
        return res.status(400).json({ message: 'Part number is required' });
    }

    // Generate a unique stockID
    const stockID = uuidv4();

    const component = new Component({
        stockID,
        product,
        partNo,
        value,
        qty,
        footprint,
        description,
        status
    });

    try {
        const newComponent = await component.save();
        console.log('Component added:', newComponent);
        res.status(201).json(newComponent);
    } catch (err) {
        console.error('Error adding component:', err);
        res.status(400).json({ message: 'Error adding component', error: err.message });
    }
};

// Update an existing component
exports.updateComponent = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedComponent = await Component.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedComponent) {
            return res.status(404).json({ message: 'Component not found' });
        }

        res.json(updatedComponent);
    } catch (err) {
        console.error('Error updating component:', err);
        res.status(400).json({ message: 'Error updating component', error: err.message });
    }
};

// Delete a component
exports.deleteComponent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComponent = await Component.findByIdAndDelete(id);

        if (!deletedComponent) {
            return res.status(404).json({ message: 'Component not found' });
        }

        res.json({ message: 'Component deleted' });
    } catch (err) {
        console.error('Error deleting component:', err);
        res.status(500).json({ message: 'Error deleting component', error: err.message });
    }
};
