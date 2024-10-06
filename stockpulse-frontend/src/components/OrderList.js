// src/components/OrderList.js

import React from 'react';
import './OrderList.css';

const OrderList = () => {
  return (
    <div className="order-list">
      <h3>Recent Order</h3>
      <table>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Date</th>
            <th>Product</th>
            <th>User</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12345</td>
            <td>10/2/23</td>
            <td>1K Resistor</td>
            <td>Allan Woods</td>
            <td>$1349</td>
            <td>on process</td>
            <td>...</td>
          </tr>
          <tr>
            <td>12346</td>
            <td>18/3/24</td>
            <td>Diodes</td>
            <td>Damian</td>
            <td>$649</td>
            <td>Waiting payment</td>
            <td>...</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
