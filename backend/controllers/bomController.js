const BoM = require('../models/BoM.js');
const Component = require('../models/component');

// Create a new BoM
exports.createBoM = async (req, res) => {
  try {
    const { name, description, bomItems } = req.body;

    // Ensure items are processed as an array of BoMItem objects
    const newBoM = new BoM({
      name,
      description,
      items: bomItems, // Mongoose will automatically validate and embed the BoMItem schema
    });

    console.log(`createBoM ${newBoM}`);

    await newBoM.save();
    res.status(201).json(newBoM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all BoMs
exports.getBOMs = async (req, res) => {
  try {
    const boms = await BoM.find();
    res.status(200).json(boms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get BoM by ID
exports.getBOMById = async (req, res) => {
  try {
    const bom = await BoM.findById(req.params.id);
    if (!bom) {
      return res.status(404).json({ message: 'BoM not found' });
    }
    res.status(200).json(bom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update BoM by ID
exports.updateBOM = async (req, res) => {
  try {
    const updatedBoM = await BoM.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBoM) {
      return res.status(404).json({ message: 'BoM not found' });
    }
    res.status(200).json(updatedBoM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete BoM by ID
exports.deleteBOM = async (req, res) => {
  try {
    const deletedBoM = await BoM.findByIdAndDelete(req.params.id);
    if (!deletedBoM) {
      return res.status(404).json({ message: 'BoM not found' });
    }
    res.status(200).json({ message: 'BoM deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search in stock function
exports.searchInStcok = async (req, res) => {
  try {
    const bomId = req.params.id;

    // Find the BoM by its ID
    const bom = await BoM.findById(bomId);
    if (!bom) {
      return res.status(404).json({ message: 'BoM not found' });
    }

    // Check stock availability for each item in the BoM
    const stockStatus = await Promise.all(
      bom.items.map(async (item) => {
        const component = await Component.findOne({
          partNo: item.partNumber,
        });
        if (!component) {
          return {
            partNumber: item.partNumber,
            quantity: item.quantity,
            cost: item.cost,
            footprint: item.footprint,
            description: item.description,
            status: 'Not Found',
          };
        }
        const isSufficient = component.qty >= item.quantity;
        return {
          partNumber: item.partNumber,
          quantity: item.quantity,
          available: component.qty,
          cost: item.cost,
          footprint: item.footprint,
          description: item.description,
          status: isSufficient ? 'In Stock' : 'Insufficient Stock',
        };
      })
    );

    // Separate the in-stock and not-in-stock items
    const inStock = stockStatus.filter((item) => item.status === 'In Stock');
    const notInStock = stockStatus.filter((item) => item.status !== 'In Stock');

    res.status(200).json({ bomId, inStock, notInStock });
  } catch (error) {
    console.error('Error searching in stock:', error);
    res.status(500).json({ message: error.message });
  }
};
