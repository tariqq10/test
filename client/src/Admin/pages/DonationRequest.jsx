import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import '../styles/requestManagement.css';

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        if (response.ok) {
          const data = await response.json();
          setRequests(data.requests);
        } else {
          // Use fallback dummy data if the API response is not OK
          setRequests([
            { id: "1", ngo: "NGO-a", amount: 3000, reason: "Sending kids to school", category: "Education", requestDate: "10/05/2023", status: 'pending' },
            { id: "2", ngo: "NGO-b", amount: 1000, reason: "Medical supply", category: "Healthcare", requestDate: "05/03/2024", status: 'pending' }
          ]);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        // Use fallback dummy data if the fetch fails
        setRequests([
          { id: "1", ngo: "NGO-a", amount: 3000, reason: "Sending kids to school", category: "Education", requestDate: "10/05/2023", status: 'pending' },
          { id: "2", ngo: "NGO-b", amount: 1000, reason: "Medical supply", category: "Healthcare", requestDate: "05/03/2024", status: 'pending' }
        ]);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await fetch(`/api/requests/${id}/approve`, { method: 'POST' });
      setRequests(requests.map(request => 
        request.id === id ? { ...request, status: 'approved' } : request
      ));
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`/api/requests/${id}/reject`, { method: 'POST' });
      setRequests(requests.map(request => 
        request.id === id ? { ...request, status: 'rejected' } : request
      ));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="dashboard-main-content">
      <AdminNavBar />
      <h2>Pending Donation Requests</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>NGO</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Category</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map(request => (
              <tr key={request.id}>
                <td>{request.ngo}</td>
                <td>{request.amount}</td>
                <td>{request.reason}</td>
                <td>{request.category}</td>
                <td>{request.requestDate}</td>
                <td>
                  {request.status === 'pending' ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(request.id)}>Approve</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleReject(request.id)}>Reject</button>
                    </>
                  ) : (
                    <span className={`badge bg-${request.status === 'approved' ? 'success' : 'danger'}`}>{request.status}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No requests available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationRequest;
