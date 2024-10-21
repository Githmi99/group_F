// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import Header from './Header';
import { useGetStatsQuery, useGetLatestComponentsQuery , useGetLatestPurchasesQuery,} from '../services/api'; // Import hooks

const Dashboard = () => {
  // Fetch statistics
  const { data: stats, error: statsError, isLoading: statsLoading } = useGetStatsQuery();
  
  // Fetch latest components
  const { data: latestComponents, error: componentsError, isLoading: componentsLoading } = useGetLatestComponentsQuery();

  // Handle loading states
  if (statsLoading || componentsLoading) return <div>Loading...</div>;
  if (statsError) return <div>Error fetching statistics: {statsError.message}</div>;
  if (componentsError) return <div>Error fetching components: {componentsError.message}</div>;

  return (
    <div className="dashboard-container">
      <Header title="Dashboard" titlePrefix="My" />
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Welcome, Kosala!</h1>
          <p>{new Date().toLocaleDateString()}</p>
        </header>
        <section className="stats">
          <div className="stat">
            <h2>BOM Orders</h2>
            <p>{stats.totalBoMOrders}</p>
            <small>{stats.changeInBoMOrders}% vs last Month</small>
          </div>
          <div className="stat">
            <h2>Total Purchases</h2>
            <p>{stats.totalPurchases}</p>
            <small>{stats.changeInPurchases}% vs last Month</small>
          </div>
          <div className="stat">
            <h2>Total Components</h2>
            <p>{stats.totalComponents}</p>
            <small>{stats.changeInComponents}% vs last Month</small>
          </div>
        </section>
        <section className="latest-components">
          <h3>Recent Added Components</h3>
          <table>
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Product</th>
                <th>Part No</th>
                <th>Value</th>
                <th>Qty</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {latestComponents.map(component => (
                <tr key={component._id}>
                  <td>{component.stockID}</td>
                  <td>{component.product}</td>
                  <td>{component.partNo}</td>
                  <td>{component.value}</td>
                  <td>{component.qty}</td>
                  <td>{component.description}</td>
                  <td>{component.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
