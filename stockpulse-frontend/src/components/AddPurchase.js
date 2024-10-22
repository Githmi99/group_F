import React, { useState, useEffect } from 'react';
import './AddPurchase.css';
import Header from './Header';
import { useAddPurchaseMutation, useUpdatePurchaseMutation } from '../services/api';
import Cookies from 'js-cookie';
import requestApprovalFromAdmin from '../services/emailService';

const AddPurchase = ({ onClose, purchase, onSave }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [paymentLinkOrShop, setPaymentLinkOrShop] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Unpaid');  // Default status is 'Unpaid'
  const [message, setMessage] = useState('');

  const [addPurchase] = useAddPurchaseMutation();
  const [updatePurchase] = useUpdatePurchaseMutation();  // Add the update mutation

  // Populate the fields when editing an existing purchase
  useEffect(() => {
    if (purchase) {
      setProduct(purchase.product || '');
      setQuantity(purchase.quantity || '');
      setPaymentLinkOrShop(purchase.paymentLinkOrShop || '');
      setCost(purchase.cost || '');
      setDate(purchase.date ? new Date(purchase.date).toISOString().split('T')[0] : '');  // Format the date correctly
      setStatus(purchase.status || 'Unpaid');  // Prepopulate status field if editing
    }
  }, [purchase]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPurchase = {
      product,
      quantity: parseInt(quantity, 10),
      paymentLinkOrShop,
      cost: parseFloat(cost),
      date: new Date(date),
      status,  // Include the selected status
    };

    const role = Cookies.get('role');

    if (!role) {
      alert('Not allowed to make the purchase');
      return;
    }

    setMessage(`
      User with role "${role}" is requesting approval for a purchase:
      - Product: ${product}
      - Quantity: ${quantity}
      - Cost: Rs ${cost}
      - Payment Link/Shop: ${paymentLinkOrShop}
      - Date Required: ${date}
      - Status: ${status}
    `);

    try {
      if (purchase) {
        // Updating an existing purchase
        await updatePurchase({ id: purchase._id, purchase: updatedPurchase }).unwrap();
        alert('Purchase updated successfully!');
      } else {
        // Adding a new purchase
        await addPurchase(updatedPurchase).unwrap();
        alert('Purchase added successfully!');
      }
      onSave(updatedPurchase);  // Call onSave to either update or add the purchase
      onClose();
    } catch (error) {
      console.error('Failed to save purchase:', error.response ? error.response.data : error.message);
      alert('Failed to save purchase');
    }
  };

  return (
    <div className='add-purchase-container'>
      <Header title='Purchase' titlePrefix={purchase ? 'Edit' : 'Add'} />
      <form className='add-purchase-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Product:</label>
          <input
            type='text'
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Quantity:</label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Payment Link or Shop:</label>
          <input
            type='text'
            value={paymentLinkOrShop}
            onChange={(e) => setPaymentLinkOrShop(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Cost (Rs):</label>
          <input
            type='number'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Date Required:</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className='actions'>
          <button type='submit' className='add-btn'>
            {purchase ? 'Update Purchase' : 'Add Purchase'}
          </button>
          <button type='button' className='cancel-btn' onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPurchase;
