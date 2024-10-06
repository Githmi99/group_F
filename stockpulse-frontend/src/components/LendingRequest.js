import React, { useState } from 'react';
import './LendingRequest.css';

const LendingRequestModal = ({ isVisible, onClose, onSave }) => {
  // Local state for form inputs
  const [formData, setFormData] = useState({
    stockID: '',
    borrowerID: '',
    borrowedDate: '',
    dueDate: '',
    notes: '',
  });

  if (!isVisible) return null;

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call onSave with formData
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <h2>Request Lending</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='stockID'>Stock ID</label>
            <input
              type='text'
              id='stockID'
              name='stockID'
              required
              value={formData.stockID}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='borrowerID'>Borrower ID</label>
            <input
              type='text'
              id='borrowerID'
              name='borrowerID'
              required
              value={formData.borrowerID}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='borrowedDate'>Borrowed Date</label>
            <input
              type='date'
              id='borrowedDate'
              name='borrowedDate'
              required
              value={formData.borrowedDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='dueDate'>Due Date</label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              required
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='notes'>Notes</label>
            <input
              type='text'
              id='notes'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type='submit'>Submit</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LendingRequestModal;
