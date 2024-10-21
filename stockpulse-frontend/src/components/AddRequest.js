import React, { useState } from 'react';
import { useAddRequestMutation } from '../services/api'; 
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

  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie); // Decode the cookie
    const cookies = decodedCookie.split(';'); // Split cookies into an array

    // Loop through cookies to find the one with the matching name
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length); // Return the cookie value (JWT token)
        }
    }

    return ""; // Return an empty string if the cookie is not found
};

const decodeToken = (token) => {
    const base64Url = token.split('.')[1]; // Get the payload (2nd part)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Adjust base64 format

    // Decode the base64 payload to a JSON string
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload); // Convert JSON string to object
};

const getDecodedTokenFromCookie = (cookieName) => {
    const token = getCookie(cookieName); // Get JWT from cookie
    if (token) {
        return decodeToken(token).user.id; // Decode JWT if found
    } else {
        console.log('Token not found in cookie');
        return null;
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    const userId =  getDecodedTokenFromCookie('token'); // Example to get userId
  
    try {
      await addRequest({
        ...formData,
        userId // Add userId to the request
      }).unwrap();
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
