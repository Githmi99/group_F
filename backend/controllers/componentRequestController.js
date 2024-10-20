// controllers/componentRequestController.js

const ComponentRequest = require('../models/ComponentRequest');
const Component = require('../models/component');

// Create a new component request
exports.createRequest = async (req, res) => {
  try {
    const { partNo, quantity, dateOfNeed, userId } = req.body;

    const newRequest = new ComponentRequest({
      partNo,
      quantity,
      dateOfNeed,
      userId,
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: 'Request created successfully', newRequest });
  } catch (error) {
    console.error('Error creating component request:', error);
    res.status(500).json({ message: 'Failed to create request' });
  }
};

// Get all component requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ComponentRequest.find().populate(
      'userId',
      'email name'
    );
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching component requests:', error);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};

// Update request status and adjust stock
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ComponentRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update status
    request.status = status;
    await request.save();

    // If marking as 'Issued', update the stock
    if (status === 'Issued') {
      const component = await Component.findOne({ partNo: request.partNo });
      if (!component) {
        return res.status(404).json({ message: 'Component not found' });
      }

      // Check if the stock is sufficient
      if (component.qty < request.quantity) {
        return res
          .status(400)
          .json({ message: 'Insufficient stock to fulfill request' });
      }

      // Reduce the quantity from stock
      component.qty -= request.quantity;
      await component.save();
    }

    res.status(200).json({ message: 'Request status updated', request });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};
