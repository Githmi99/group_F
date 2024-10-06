// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import OrderList from './OrderList';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header title="Dashboard" titlePrefix="My" />
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, Kosala!</h1>
        <p>22 March 2024</p>
      </header>
      <section className="stats">
        <div className="stat">
          <h2>BOM Orders</h2>
          <p>200</p>
          <small>1.5% vs last Month</small>
        </div>
        <div className="stat">
          <h2>Total Order</h2>
          <p>110</p>
          <small>0.7% vs last Month</small>
        </div>
        <div className="stat">
          <h2>Total Item</h2>
          <p>14 new items</p>
          <small>vs last Month</small>
        </div>
      </section>
      <section className="charts">
        <div className="chart">
          <h3>Overall Items</h3>
          {/* Insert chart here */}
        </div>
        <div className="chart">
          <h3>Order Report</h3>
          {/* Insert chart here */}
        </div>
      </section>
      <OrderList />
    </div>
    </div>
  );
};

export default Dashboard;
