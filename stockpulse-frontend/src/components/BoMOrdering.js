import React, { useState, useEffect } from 'react';
import './BoMOrdering.css';
import { Form, Button, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useCreateCircuitMutation, useSearchInStockQuery } from '../services/api'; // Ensure correct import path

const BoMOrdering = () => {
    const [items, setItems] = useState([{ id: 1, partNumber: '', quantity: 1, cost: '', footprint: '', description: '' }]);
    const [circuitName, setCircuitName] = useState('');
    const [circuitDescription, setCircuitDescription] = useState('');
    const [circuitId, setCircuitId] = useState(null);
    const [searched, setSearched] = useState(false);
    
    const [createCircuit, { isLoading, error }] = useCreateCircuitMutation();
    const navigate = useNavigate();

    const { data: stockData, error: stockError } = useSearchInStockQuery(circuitId, {
        skip: !circuitId,
    });

    const handleAddRow = () => {
        setItems([...items, { id: items.length + 1, partNumber: '', quantity: 1, cost: '', footprint: '', description: '' }]);
    };

    const handleInputChange = (id, field, value) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleDeleteRow = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleCreateCircuit = async () => {
        try {
            const circuitData = {
                name: circuitName,
                description: circuitDescription,
                bomItems: items,
            };

            const circuitResponse = await createCircuit(circuitData).unwrap();
            setCircuitId(circuitResponse._id);
        } catch (error) {
            console.error('Error creating circuit:', error);
        }
    };

    useEffect(() => {
        if (stockData) {
            setInStock(stockData.inStock || []);
            setNotInStock(stockData.notInStock || []);
            setSearched(true);
        }
    }, [stockData]);

    const handleCancelClick = () => {
        navigate('/dashboard');
    };

    const [inStock, setInStock] = useState([]);
    const [notInStock, setNotInStock] = useState([]);

    return (
        <div className='bom-ordering-container'>
            <Header title="Ordering" titlePrefix="BoM" />
            <div className="bom-ordering-content">
                <Form>
                    <Form.Group controlId="formCircuitName">
                        <Form.Label>Circuit Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter circuit name"
                            value={circuitName}
                            onChange={(e) => setCircuitName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCircuitDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={circuitDescription}
                            onChange={(e) => setCircuitDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBOM">
                        <Form.Label>BOM</Form.Label>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>Part Number</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                    <th>Footprint</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={item.partNumber}
                                                onChange={(e) => handleInputChange(item.id, 'partNumber', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={item.cost}
                                                onChange={(e) => handleInputChange(item.id, 'cost', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={item.footprint}
                                                onChange={(e) => handleInputChange(item.id, 'footprint', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => handleInputChange(item.id, 'description', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Button variant="link" className="delete-btn" onClick={() => handleDeleteRow(item.id)}><FaTrashAlt /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button variant="link" className="add-row-btn" onClick={handleAddRow}>Add more</Button>
                    </Form.Group>
                    <div className="action-buttons">
                        <Button
                            variant="primary"
                            type="button"
                            className="add-bom-btn"
                            onClick={handleCreateCircuit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add BoM'}
                        </Button>
                        <Button variant="secondary" type="button" className="cancel-btn" onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </Form>

                {searched && (
                    <div className="stock-results">
                        <div className="stock-list not-in-stock">
                            <h5>Not in Stock</h5>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Part Number</th>
                                        <th>Quantity</th>
                                        <th>Cost</th>
                                        <th>Footprint</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notInStock.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.partNumber}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.footprint}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="stock-list in-stock">
                            <h5>In Stock</h5>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Part Number</th>
                                        <th>Quantity</th>
                                        <th>Cost</th>
                                        <th>Footprint</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inStock.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.partNumber}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.footprint}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoMOrdering;
