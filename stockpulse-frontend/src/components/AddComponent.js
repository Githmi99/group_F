import React, { useState, useEffect } from 'react';
import { useAddComponentMutation, useUpdateComponentMutation } from '../services/api';
import './AddComponent.css';

const AddComponent = ({ visible, onClose, component, onSave }) => {
    const [formData, setFormData] = useState({
        product: '',
        partNo: '',
        value: '',
        qty: '',
        footprint: '',
        description: '',
        status: ''
    });

    const [error, setError] = useState(null);
    const [addComponent] = useAddComponentMutation();
    const [updateComponent] = useUpdateComponentMutation();

    useEffect(() => {
        if (component) {
            setFormData({
                product: component.product || '',
                partNo: component.partNo || '',
                value: component.value || '',
                qty: component.qty || '',
                footprint: component.footprint || '',
                description: component.description || '',
                status: component.status || ''
            });
        } else {
            setFormData({
                product: '',
                partNo: '',
                value: '',
                qty: '',
                footprint: '',
                description: '',
                status: ''
            });
        }
    }, [component]);

    if (!visible) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (component) {
                await updateComponent({ id: component._id, component: formData }).unwrap();
            } else {
                await addComponent(formData).unwrap();
            }
            onSave(); // Callback to refresh data and close modal
            onClose(); // Close modal on success
        } catch (err) {
            console.error('Error saving component:', err);
            setError('Failed to save component. Please try again.');
        }
    };

    return (
        <div className="add-component-overlay">
            <div className="add-component-modal">
                <h2>{component ? 'Edit Component' : 'Add Component'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <input
                            type="text"
                            id="product"
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="partNo">Part No</label>
                        <input
                            type="text"
                            id="partNo"
                            name="partNo"
                            value={formData.partNo}
                            onChange={handleChange}
                            placeholder="Enter part number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Value</label>
                        <input
                            type="text"
                            id="value"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            placeholder="Enter value"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="qty">Quantity</label>
                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            value={formData.qty}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="footprint">Footprint</label>
                        <input
                            type="text"
                            id="footprint"
                            name="footprint"
                            value={formData.footprint}
                            onChange={handleChange}
                            placeholder="Enter footprint"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            placeholder="Enter status"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">{component ? 'Update' : 'Add'}</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default AddComponent;
