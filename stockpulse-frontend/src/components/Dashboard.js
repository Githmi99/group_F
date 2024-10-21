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


  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie); // Decode the cookie
    const cookies = decodedCookie.split(';'); // Split cookies into an array

    // Loop through cookies to find the one with the matching name
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length); // Return the cookie value (JWT token)
        }
    }

    return ""; // Return an empty string if the cookie is not found
};

const decodeToken = (token) => {
    const base64Url = token.split('.')[1]; // Get the payload (2nd part)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Adjust base64 format

    // Decode the base64 payload to a JSON string
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload); // Convert JSON string to object
};

const getDecodedTokenFromCookie = (cookieName) => {
    const token = getCookie(cookieName); // Get JWT from cookie
    if (token) {
        return decodeToken(token).user.name; // Decode JWT if found
    } else {
        console.log('Token not found in cookie');
        return null;
    }
};

  // Handle loading states
  if (statsLoading || componentsLoading) return <div>Loading...</div>;
  if (statsError) return <div>Error fetching statistics: {statsError.message}</div>;
  if (componentsError) return <div>Error fetching components: {componentsError.message}</div>;

  return (
    <div className="dashboard-container">
      <Header title="Dashboard" titlePrefix="My" />
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Welcome, {getDecodedTokenFromCookie('token')} </h1>
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
