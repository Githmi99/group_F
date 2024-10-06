import React from 'react';
import './LowStocks.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useGetLowStockComponentsQuery } from '../services/api'; // Import the hook

const LowStocks = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetLowStockComponentsQuery(); // Use the hook

  const handleCancelClick = () => {
    navigate('/dashboard');
  };

  const handlePurchaseClick = () => {
    navigate('/purchases'); // Navigate to the Purchase page
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading components: {error.message}</div>;

  return (
    <div className="low-stocks">
      <Header title="Stocks" titlePrefix="Low" />
      <div className="search-filter">
        <input type="text" placeholder="Search here" className="search-input" />
        <button className="search-button">Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Stock ID</th>
            <th>Product</th>
            <th>Part No</th>
            <th>Value</th>
            <th>Qty</th>
            <th>Footprint</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.components.map((item) => (
            <tr key={item._id}>
              <td>{item.stockID}</td>
              <td>{item.product}</td>
              <td>{item.partNo}</td>
              <td>{item.value}</td>
              <td>{item.qty}</td>
              <td>{item.footprint}</td>
              <td className={item.status.toLowerCase()}>{item.status}</td>
              <td>
                <button className="edit-button">✏️</button>
                <button className="delete-button">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button className="purchase-button" onClick={handlePurchaseClick}>Purchase</button>
        <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

export default LowStocks;
