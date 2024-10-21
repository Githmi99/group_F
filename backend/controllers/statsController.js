// controllers/statsController.js
const BoM = require('../models/BoM');
const Component = require('../models/component');
const Purchase = require('../models/Purchase');

exports.getStats = async (req, res) => {
  try {
    // Count the total number of BoM records
    const totalBoMOrders = await BoM.countDocuments();

    // Count the total number of purchase records
    const totalPurchases = await Purchase.countDocuments();

    // Count the total number of components
    const totalComponents = await Component.countDocuments();

    // Return the aggregated stats
    res.status(200).json({
      totalBoMOrders,
      totalPurchases,
      totalComponents,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// Get the latest added components
exports.getLatestComponents = async (req, res) => {
  try {
    // Retrieve the latest 10 added components, sorted by their creation date in descending order
    const latestComponents = await Component.find()
      .sort({ _id: -1 }) // Sorting by _id in descending order returns the most recent entries
      .limit(8);

    res.status(200).json(latestComponents);
  } catch (error) {
    console.error('Error fetching latest components:', error);
    res.status(500).json({ message: 'Failed to fetch latest components' });
  }
};


// Get latest 5 purchases
exports. getLatestPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(5); // Limit to the latest 5 purchases
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases' });
  }
};

// Get the change in statistics compared to last month
exports.getMonthlyChange = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 for January, 11 for December

    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfLastMonth = new Date(currentYear, currentMonth, 0); // Last day of the previous month

    // Get counts for the current month
    const totalBoMOrdersCurrentMonth = await BoM.countDocuments({
      createdAt: { $gte: startOfCurrentMonth },
    });

    const totalPurchasesCurrentMonth = await Purchase.countDocuments({
      createdAt: { $gte: startOfCurrentMonth },
    });

    const totalComponentsCurrentMonth = await Component.countDocuments({
      createdAt: { $gte: startOfCurrentMonth },
    });

    // Get counts for the previous month
    const totalBoMOrdersLastMonth = await BoM.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const totalPurchasesLastMonth = await Purchase.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    const totalComponentsLastMonth = await Component.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    });

    // Helper function to calculate percentage change
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) {
        return current > 0 ? 100 : 0; // If previous count is zero, and current is more than zero, return 100%
      }
      return ((current - previous) / previous) * 100;
    };

    // Calculate percentage changes
    const changeInBoMOrders = calculatePercentageChange(
      totalBoMOrdersCurrentMonth,
      totalBoMOrdersLastMonth
    );

    const changeInPurchases = calculatePercentageChange(
      totalPurchasesCurrentMonth,
      totalPurchasesLastMonth
    );

    const changeInComponents = calculatePercentageChange(
      totalComponentsCurrentMonth,
      totalComponentsLastMonth
    );

    res.status(200).json({
      changeInBoMOrders,
      changeInPurchases,
      changeInComponents,
    });
  } catch (error) {
    console.error('Error fetching monthly change:', error);
    res.status(500).json({ message: 'Failed to fetch monthly change' });
  }
};
