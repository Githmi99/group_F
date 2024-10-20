import React, { useState } from 'react';
import { useGetComponentRequestsQuery, useUpdateRequestMutation } from '../services/api'; // Assuming you have these in your api.js

const ComponentRequestPage = () => {
  const { data: requests, refetch } = useGetComponentRequestsQuery();
  const [updateRequestStatus] = useUpdateRequestMutation();
  const [statusUpdateError, setStatusUpdateError] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdateError(null); // Clear any previous error

    try {
      await updateRequestStatus({ id, status: newStatus }).unwrap();
      refetch(); // Refetch the data to update the table
    } catch (err) {
      setStatusUpdateError('Failed to update status. Please try again.');
    }
  };

  return (
    <div className="component-request-page">
      <h2>Component Requests</h2>
      {statusUpdateError && <p className="error-message">{statusUpdateError}</p>}
      <table className="request-table">
        <thead>
          <tr>
            <th>Part No</th>
            <th>Quantity</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
              <td>{request.partNo}</td>
              <td>{request.quantity}</td>
              <td>{request.userId}</td>
              <td>{new Date(request.dateOfNeed).toLocaleDateString()}</td>
              <td>{request.status || 'Not Issued'}</td>
              <td>
                <button
                  onClick={() => handleStatusChange(request._id, 'Issued')}
                  disabled={request.status === 'Issued'}
                  className="status-btn issued-btn"
                >
                  Mark as Issued
                </button>
                <button
                  onClick={() => handleStatusChange(request._id, 'Not Issued')}
                  disabled={request.status === 'Not Issued'}
                  className="status-btn not-issued-btn"
                >
                  Mark as Not Issued
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentRequestPage;
