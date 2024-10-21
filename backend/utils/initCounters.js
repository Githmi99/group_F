// utils/initCounters.js
const Counter = require('../models/counter');

const initializeCounters = async () => {
  const counterTypes = ['purchase'];

  for (const type of counterTypes) {
    await Counter.findOneAndUpdate(
      { _id: type },
      { $setOnInsert: { seq: 0 } },
      { upsert: true }
    );
  }
};

module.exports = initializeCounters;
