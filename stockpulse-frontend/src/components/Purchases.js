import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPurchasesQuery, useDeletePurchaseMutation, useUpdatePurchaseMutation } from '../services/api';
import './Purchases.css';
import AddPurchase from './AddPurchase';
import Header from './Header';

const Purchases = () => {
    const [isAddPurchaseVisible, setAddPurchaseVisible] = useState(false);
    const [editingPurchase, setEditingPurchase] = useState(null);

    const navigate = useNavigate();
    const { data: purchases, refetch } = useGetPurchasesQuery();
    const [deletePurchase] = useDeletePurchaseMutation();
    const [updatePurchase] = useUpdatePurchaseMutation();

    const toggleAddPurchase = () => {
        setAddPurchaseVisible(!isAddPurchaseVisible);
    };

    const handleCancelClick = () => {
        navigate('/dashboard');
    };

    const handleDelete = async (id) => {
        try {
            await deletePurchase(id).unwrap();
            refetch(); // Refresh the purchase list after deletion
        } catch (err) {
            console.error('Error deleting purchase:', err);
        }
    };

    const handleEdit = (purchase) => {
        setEditingPurchase(purchase);
        toggleAddPurchase(); // Show the add purchase modal to edit
    };

    return (
        <div className="dashboard-container">
            <Header title="Purchases" titlePrefix="Search" />
            <div className={`purchases-list-container ${isAddPurchaseVisible ? 'blur-background blur-transition' : ''}`}>
                <table className="purchases-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Payment Link or Shop</th>
                            <th>Cost (Rs)</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases?.map((purchase) => (
                            <tr key={purchase._id}>
                                <td>{purchase.orderID}</td>
                                <td>{purchase.product}</td>
                                <td>{purchase.quantity}</td>
                                <td>{purchase.paymentLinkOrShop}</td>
                                <td>{purchase.cost}</td>
                                <td>{new Date(purchase.date).toLocaleDateString()}</td>
                                <td className={purchase.status.toLowerCase()}>{purchase.status}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(purchase)}>✏️</button>
                                    <button className="delete-btn" onClick={() => handleDelete(purchase._id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="action-buttons">
                    <button onClick={toggleAddPurchase} className="btn-add">Add Purchase</button>
                    <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>

            {isAddPurchaseVisible && (
                <AddPurchase
                    visible={isAddPurchaseVisible}
                    onClose={() => {
                        setAddPurchaseVisible(false);
                        setEditingPurchase(null);
                    }}
                    purchase={editingPurchase}
                    onSave={async (purchase) => {
                        try {
                            if (editingPurchase) {
                                await updatePurchase({ id: editingPurchase._id, purchase }).unwrap();
                            } else {
                                // Add logic to handle adding new purchase if needed
                            }
                            refetch(); // Refresh the purchase list after update
                        } catch (err) {
                            console.error('Error updating purchase:', err);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default Purchases;
