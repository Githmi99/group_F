import React, { useState } from 'react';
import './AddPurchase.css';
import Header from './Header';
import { useAddPurchaseMutation } from '../services/api';
import Cookies from 'js-cookie';

const AddPurchase = ({ onClose }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [paymentLinkOrShop, setPaymentLinkOrShop] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [addPurchase] = useAddPurchaseMutation();

  const handleAddPurchase = async (e) => {
    e.preventDefault();

    const newPurchase = {
      product,
      quantity: parseInt(quantity, 10),
      paymentLinkOrShop,
      cost: parseFloat(cost),
      date: new Date(date),
      status: 'Unpaid',
      // orderID could be generated here if needed
    };

    const role = Cookies.get('role');

    if (!role) {
      alert('Not allowed to make the purchase');
    }

    // Constraints based on role
    if (role === 'intern') {
      alert('Interns are not allowed to make purchases.');
      return;
    }

    if (role === 'executive' && parseFloat(cost) > 10000) {
      alert(
        'Executives cannot make purchases over 10,000. Please request an admin.'
      );
      return;
    }

    if (role === 'stock manager' && parseFloat(cost) > 5000) {
      alert(
        'Executives cannot make purchases over 5000. Please request an admin.'
      );
      return;
    }

    if (role === 'user' && parseFloat(cost) > 5000) {
      alert('Users cannot make purchases over 5000. Please request an admin.');
      return;
    }

    try {
      await addPurchase(newPurchase).unwrap();
      alert('Purchase added successfully!');
      onClose();
    } catch (error) {
      console.error(
        'Failed to add purchase:',
        error.response ? error.response.data : error.message
      );
      alert('Failed to add purchase');
    }
  };

  return (
    <div className='add-purchase-container'>
      <Header title='Purchase' titlePrefix='Add' />
      <form className='add-purchase-form' onSubmit={handleAddPurchase}>
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
        <div className='actions'>
          <button type='submit' className='add-btn'>
            Add Purchase
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
