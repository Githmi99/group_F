import React, { useState } from 'react';
import { useAddRequestMutation } from '../services/api'; // Adjust the path as needed
import './AddRequest.css';

const AddRequest = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    partNo: '',
    quantity: '',
    dateOfNeed: '',
  });

  const [error, setError] = useState(null);
  const [addRequest] = useAddRequestMutation();

  if (!visible) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      await addRequest(formData).unwrap();
      onClose();  // Close modal after successful request
    } catch (err) {
      console.error('Error adding request:', err);
      setError(err.message || 'Failed to add request. Please try again.');
    }
  };

  return (
    <div className="add-request-overlay">
      <div className="add-request-content">
        <h2>Add Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="partNo">Part No</label>
            <input
              type="text"
              id="partNo"
              name="partNo"
              value={formData.partNo}
              onChange={handleChange}
              placeholder="Enter part number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfNeed">Date of Need</label>
            <input
              type="date"
              id="dateOfNeed"
              name="dateOfNeed"
              value={formData.dateOfNeed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-add">Add</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AddRequest;
