import React, { useState } from 'react';
import { useGetComponentRequestsQuery, useUpdateRequestMutation } from '../services/api';
import './ComponentRequestPage.css';
import Header from './Header';

const ComponentRequestPage = () => {
  const { data: requests, refetch, isLoading, error } = useGetComponentRequestsQuery();
  const [updateRequestStatus] = useUpdateRequestMutation();
  const [statusUpdateError, setStatusUpdateError] = useState(null);
  const [showCompletedRequests, setShowCompletedRequests] = useState(false);

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdateError(null);

    try {
      console.log(`Updating status for request ID: ${id} to ${newStatus}`);
      await updateRequestStatus({ id, status: newStatus }).unwrap(); // Updated the call
      refetch();
    } catch (err) {
      console.error('Error updating status:', err);
      setStatusUpdateError('Failed to update status. Please try again.');
    }
  };

  const pendingRequests = requests?.filter(request => request.status !== 'Issued');
  const completedRequests = requests?.filter(request => request.status === 'Issued');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching requests: {error.message}</p>;

  return (
    <div className="component-request-page">
      <Header title="Requests" titlePrefix="Component" />
      {statusUpdateError && <p className="error-message">{statusUpdateError}</p>}

      <h3>Pending Requests (Not Issued)</h3>
      <table className="request-table">
        <thead>
          <tr>
            <th>Part No</th>
            <th>Quantity</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests?.length > 0 ? (
            pendingRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.partNo}</td>
                <td>{request.quantity}</td>
                <td>{request.userId?._id}</td>
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No pending requests.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button 
        onClick={() => setShowCompletedRequests(!showCompletedRequests)} 
        className="btn-show-completed"
      >
        {showCompletedRequests ? 'Hide Completed Requests' : 'Show Completed Requests'}
      </button>

      {showCompletedRequests && (
        <div>
          <h3>Completed Requests (Issued)</h3>
          <table className="request-table">
            <thead>
              <tr>
                <th>Part No</th>
                <th>Quantity</th>
                <th>User ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {completedRequests?.length > 0 ? (
                completedRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.partNo}</td>
                    <td>{request.quantity}</td>
                    <td>{request.userId?._id}</td>
                    <td>{new Date(request.dateOfNeed).toLocaleDateString()}</td>
                    <td>{request.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No completed requests.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComponentRequestPage;
