const Counter = require('../models/counter');

// Universal ID generation function
const generateID = async (type) => {
  try {
    // Find the counter document by name (e.g., 'componentID' or 'userID')
    const counter = await Counter.findOneAndUpdate(
      { name: type },
      { $inc: { seq: 1 } },
      { new: true }
    );

    if (!counter) {
      throw new Error(`Counter for ${type} not initialized`);
    }

    // Format the sequence as COMP-XXXXX for components or USR-XXXXX for users
    const prefix = type === 'componentID' ? 'CMP' : 'USR';
    return `${prefix}-${counter.seq.toString().padStart(5, '0')}`;
  } catch (err) {
    console.error(`Error generating ${type}:`, err);
    throw new Error(`Error generating ${type}`);
  }
};

module.exports = generateID;
