const Component = require('../models/component');

exports.getLowStockComponents = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const lowStockThreshold = 10; // Set threshold for low stock to 10

        const query = {
            qty: { $lt: lowStockThreshold },
            partNo: { $regex: searchQuery, $options: 'i' },
        };

        const components = await Component.find(query);
        res.json({ components });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
