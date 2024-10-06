import React, { useState } from 'react';
import './LendComponentsPage.css';
import { FaSearch, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Header from './Header';
import LendingRequestModal from './LendingRequest';
import { useNavigate } from 'react-router-dom';
import { useGetLendingsQuery, useAddLendingMutation, useUpdateLendingMutation, useDeleteLendingMutation } from '../services/api';

const LendComponentsPage = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedLending, setSelectedLending] = useState(null);
    const { data: lendings, refetch } = useGetLendingsQuery();
    const [addLending] = useAddLendingMutation();
    const [updateLending] = useUpdateLendingMutation();
    const [deleteLending] = useDeleteLendingMutation();
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedLending(null); // Clear selected lending
    };

    const handleCancelClick = () => {
        navigate('/dashboard');
    };

    const handleAddLending = async (lending) => {
        try {
            await addLending(lending).unwrap();
            alert('Lending added successfully!');
            refetch(); // Refresh the lending list
            setModalVisible(false);
        } catch (error) {
            console.error('Failed to add lending:', error);
            alert('Failed to add lending');
        }
    };

    const handleEditLending = async (lending) => {
        setSelectedLending(lending);
        setModalVisible(true); // Show modal for editing
    };

    const handleDeleteLending = async (id) => {
        if (window.confirm('Are you sure you want to delete this lending?')) {
            try {
                await deleteLending(id).unwrap();
                alert('Lending deleted successfully!');
                refetch(); // Refresh the lending list
            } catch (error) {
                console.error('Failed to delete lending:', error);
                alert('Failed to delete lending');
            }
        }
    };

    return (
        <div className="lend-components-page">
            <Header title="Components" titlePrefix="Lend" />
            <div className="content">
                <div className="search-sort-bar">
                    <input type="text" placeholder="Search here" className="search-input" />
                    <FaSearch className="search-icon" />
                    <button className="sort-button">Sort By</button>
                </div>

                <table className="components-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Stock ID</th>
                            <th>Borrower ID</th>
                            <th>Borrowed Date</th>
                            <th>Due Date</th>
                            <th>Notes</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lendings?.map((lending) => (
                            <tr key={lending._id}>
                                <td><input type="checkbox" /></td>
                                <td>{lending.stockID}</td>
                                <td>{lending.borrowerID}</td>
                                <td>{new Date(lending.borrowedDate).toLocaleDateString()}</td>
                                <td>{new Date(lending.dueDate).toLocaleDateString()}</td>
                                <td>{lending.notes}</td>
                                <td>
                                    {lending.status === 'Completed' && <FaCheckCircle className="status-icon completed" />}
                                    {lending.status === 'Pending' && <FaExclamationTriangle className="status-icon pending" />}
                                    {lending.status === 'Error' && <FaTimesCircle className="status-icon error" />}
                                    {lending.status}
                                </td>
                                <td className="actions">
                                    <button className="action-btn edit-btn" onClick={() => handleEditLending(lending)}>
                                        <FaEdit />
                                    </button>
                                    <button className="action-btn delete-btn" onClick={() => handleDeleteLending(lending._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="action-buttons">
                    <button className="add-btn" onClick={handleAddButtonClick}>Add Lending Component</button>
                    <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>

            <LendingRequestModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onSave={handleAddLending}
                initialLending={selectedLending} // Pass the selected lending for editing
            />
        </div>
    );
};

export default LendComponentsPage;
