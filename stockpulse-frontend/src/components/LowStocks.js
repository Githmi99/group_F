import React, { useState } from 'react';
import './LowStocks.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useGetLowStockComponentsQuery, useUpdateComponentMutation } from '../services/api';

const LowStocks = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetLowStockComponentsQuery();
  const [updateComponent] = useUpdateComponentMutation(); // Hook to update component

  const [editMode, setEditMode] = useState(null); // Track which component is being edited
  const [editData, setEditData] = useState({}); // Hold the updated component data

  const handleCancelClick = () => {
    navigate('/dashboard');
  };

  const handlePurchaseClick = () => {
    navigate('/purchases');
  };

  const handleEditClick = (item) => {
    setEditMode(item._id); // Enable edit mode for the specific item
    setEditData(item); // Pre-fill the form with existing data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value }); // Update form data
  };

  const handleUpdateClick = async () => {
    try {
      await updateComponent({ id: editMode, component: editData });
      setEditMode(null); // Exit edit mode after updating
    } catch (err) {
      console.error('Failed to update component:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading components: {error.message}</div>;

  return (
    <div className="low-stocks">
  <Header title="Stocks" titlePrefix="Low" />
  <div className="table-container">
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
          <tr key={item._id} className={editMode === item._id ? 'edit-mode' : ''}>
            {editMode === item._id ? (
              <>
                <td>{item.stockID}</td>
                <td><input type="text" name="product" value={editData.product} onChange={handleInputChange} /></td>
                <td><input type="text" name="partNo" value={editData.partNo} onChange={handleInputChange} /></td>
                <td><input type="text" name="value" value={editData.value} onChange={handleInputChange} /></td>
                <td><input type="number" name="qty" value={editData.qty} onChange={handleInputChange} /></td>
                <td><input type="text" name="footprint" value={editData.footprint} onChange={handleInputChange} /></td>
                <td><input type="text" name="description" value={editData.description} onChange={handleInputChange} /></td>
                <td>
                  {/* Wrap Save and Cancel buttons in a flexbox container */}
                  <div className="button-container">
                    <button className="save-button" onClick={handleUpdateClick}>Save</button>
                    <button className="cancel-button" onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                </td>
              </>
            ) : (
              <>
                <td>{item.stockID}</td>
                <td>{item.product}</td>
                <td>{item.partNo}</td>
                <td>{item.value}</td>
                <td>{item.qty}</td>
                <td>{item.footprint}</td>
                <td>{item.description}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(item)}>✏️</button>
                  <button className="delete-button">🗑️</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="actions">
    <button className="purchase-button" onClick={handlePurchaseClick}>Purchase</button>
    <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
  </div>
</div>

  );
};

export default LowStocks;
