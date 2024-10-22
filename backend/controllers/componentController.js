const Component = require('../models/component');
const Counter = require('../models/counter'); // Import the counter model

// Function to generate a user-friendly stock ID
const generateComponentID = async () => {
  try {
    // Find the counter document for 'componentID' and increment the sequence
    const counter = await Counter.findOneAndUpdate(
      { name: 'componentID' }, // Query to find the counter by name
      { $inc: { seq: 1 } },    // Increment the sequence by 1
      { new: true, upsert: true } // Create the document if it doesn't exist
    );
    // Format the sequence as CMP-XXXXX
    return `CMP-${counter.seq.toString().padStart(5, '0')}`;
  } catch (err) {
    console.error('Error generating stockID:', err);
    throw new Error('Error generating stockID');
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

  try {
    // Generate a unique stockID (user-friendly)
    const stockID = await generateComponentID();

    // Create the new component object
    const component = new Component({
      stockID,      // Use the generated user-friendly stockID
      product,
      partNo,
      value,
      qty,
      footprint,
      description,
      status,
    });

    // Save the component to the database
    const newComponent = await component.save();

    // Respond with the newly added component
    console.log('Component added:', newComponent);
    res.status(201).json(newComponent);

  } catch (err) {
    console.error('Error adding component:', err);
    res.status(400).json({ message: 'Error adding component', error: err.message });
  }
};

// Get all components
exports.getComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    console.error('Error fetching components:', err);
    res
      .status(500)
      .json({ message: 'Error fetching components', error: err.message });
  }
};



// Update an existing component
exports.updateComponent = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedComponent = await Component.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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

// Search components by partNo
exports.searchByPartNo = async (req, res) => {
  const { partNo } = req.query;

  try {
    if (!partNo) {
      return res.status(400).json({ message: 'Part number is required for search' });
    }

    const components = await Component.find({
      partNo: { $regex: new RegExp(partNo, 'i') }, // Case-insensitive search
    });

    if (components.length === 0) {
      return res.status(404).json({ message: 'No components found with the provided part number' });
    }

    res.status(200).json(components);
  } catch (error) {
    console.error('Error searching by part number:', error);
    res.status(500).json({ message: 'Error searching components', error: error.message });
  }
};
