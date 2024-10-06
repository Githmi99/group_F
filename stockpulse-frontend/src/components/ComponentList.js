import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetComponentsQuery, useDeleteComponentMutation, useUpdateComponentMutation } from '../services/api';
import './ComponentList.css';
import AddRequest from './AddRequest';
import AddComponent from './AddComponent';
import Header from './Header';

const ComponentList = () => {
    const [isAddRequestVisible, setAddRequestVisible] = useState(false);
    const [isAddComponentVisible, setAddComponentVisible] = useState(false);
    const [editingComponent, setEditingComponent] = useState(null);

    const navigate = useNavigate();
    const { data: components, refetch } = useGetComponentsQuery();
    const [deleteComponent] = useDeleteComponentMutation();
    const [updateComponent] = useUpdateComponentMutation();

    const toggleAddRequest = () => {
        setAddRequestVisible(!isAddRequestVisible);
    };

    const toggleAddComponent = () => {
        setAddComponentVisible(!isAddComponentVisible);
    };

    const handleCancelClick = () => {
        navigate('/dashboard');
    };

    const handleDelete = async (id) => {
        try {
            await deleteComponent(id).unwrap();
            refetch(); // Refresh the component list after deletion
        } catch (err) {
            console.error('Error deleting component:', err);
        }
    };

    const handleEdit = (component) => {
        setEditingComponent(component);
        toggleAddComponent(); // Show the add component modal to edit
    };

    return (
        <div className="dashboard-container">
            <Header title="Components" titlePrefix="Search" />
            <div className={`component-list-container ${isAddRequestVisible || isAddComponentVisible ? 'blur-background blur-transition' : ''}`}>
                <table className="component-table">
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
                        {components?.map((component) => (
                            <tr key={component._id}>
                                <td>{component.stockID}</td>
                                <td>{component.product}</td>
                                <td>{component.partNo}</td>
                                <td>{component.value}</td>
                                <td>{component.qty}</td>
                                <td>{component.footprint}</td>
                                <td className={component.description.toLowerCase()}>{component.description}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(component)}>✏️</button>
                                    <button className="delete-btn" onClick={() => handleDelete(component._id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="action-buttons">
                    <button onClick={toggleAddRequest} className="btn-request">Request</button>
                    <button onClick={toggleAddComponent} className="btn-add">Add</button>
                    <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>

            {isAddRequestVisible && <AddRequest visible={isAddRequestVisible} onClose={() => setAddRequestVisible(false)} />}
            
            {isAddComponentVisible && (
                <AddComponent
                    visible={isAddComponentVisible}
                    onClose={() => {
                        setAddComponentVisible(false);
                        setEditingComponent(null);
                    }}
                    component={editingComponent}
                    onSave={async (component) => {
                        try {
                            if (editingComponent) {
                                await updateComponent({ id: editingComponent._id, component }).unwrap();
                            } else {
                                // Add logic to handle adding new component if needed
                            }
                            refetch(); // Refresh the component list after update
                        } catch (err) {
                            console.error('Error updating component:', err);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default ComponentList;
