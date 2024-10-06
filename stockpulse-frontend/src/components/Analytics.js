import React from 'react';
import './Analytics.css';
import Header from './Header';
import { Row, Col, Form, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { FaBell } from 'react-icons/fa';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  } from 'chart.js';
  
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  const Analytics = () => {
    const chartData = {
        labels: ['Resistor', 'Capacitor', 'Transistor'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return (
        <div className='analytics-container'>
        <Header titlePrefix="Analytics" />
            <Row>
                <Col md={10} className="main-content">
                    <Header />
                    <div className="analytics-content">
                        <Row>
                            <Col md={6}>
                                <Card className="total-orders-card">
                                    <Card.Body>
                                        <Card.Title>Total Orders</Card.Title>
                                        <Card.Text>
                                            <span className="new-orders">3 New Orders</span><br />
                                            <span className="urgent-orders">1 Urgent Order</span><br />
                                            <span className="finished-orders">25 Orders Finished</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="item-card">
                                    <Card.Body>
                                        <Card.Title>Item</Card.Title>
                                        <Form.Check type="radio" label="Today" name="timeframe" />
                                        <Form.Check type="radio" label="This Week" name="timeframe" />
                                        <Form.Check type="radio" label="Month" name="timeframe" />
                                        <Form.Check type="radio" label="Custom" name="timeframe" />
                                        <Doughnut data={chartData} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card className="inventory-status-card">
                                    <Card.Body>
                                        <Card.Title>Inventory Status</Card.Title>
                                        <Form.Check type="radio" label="Today" name="inventory-timeframe" />
                                        <Form.Check type="radio" label="This Week" name="inventory-timeframe" />
                                        <Form.Check type="radio" label="Month" name="inventory-timeframe" />
                                        <Form.Check type="radio" label="Custom" name="inventory-timeframe" />
                                        <Form inline>
                                            <Form.Group>
                                                <Form.Label>From: </Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>To: </Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                        </Form>
                                        <div className="inventory-status">
                                            <Doughnut data={{
                                                labels: ['Stock'],
                                                datasets: [{
                                                    data: [50, 50],
                                                    backgroundColor: ['#36A2EB', '#FFCE56']
                                                }]
                                            }} />
                                            <div className="inventory-details">
                                                <table className="inventory-table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Item</th>
                                                            <th>Quantity</th>
                                                            <th>Date</th>
                                                            <th>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Nails</td>
                                                            <td>20</td>
                                                            <td>2019.06.07</td>
                                                            <td>Issued to Sarath</td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>Saw</td>
                                                            <td>10</td>
                                                            <td>2019.06.05</td>
                                                            <td>Issued to Janaka</td>
                                                        </tr>
                                                        {/* Add more rows as needed */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Analytics;