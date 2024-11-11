import { useState } from "react"
import AdminNavBar from "../components/AdminNavBar"

const requests = [
  {
    id: "1",
    ngo: "NGO-a",
    amount: 3000,
    reason: "Sending kids to school",
    category: "Education",
    requestDate: "10/05/2023",
  },
  {
    id: "2",
    ngo: "NGO-b",
    amount: 1000,
    reason: "Medical supply",
    category: "Healthcare",
    requestDate: "05/03/2024",
  },
];

const DonationRequest = () => {
    const [filteredRequests, setFilteredRequests] = useState(requests)



    const handleAction = (id, action) => {
        alert (`You clicked ${action}`);
    };

    return (
      <div>
        <AdminNavBar />

        <h2>Pending Donation Requests</h2>

        <table>
          <thead>
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
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.ngo}</td>
                <td>{request.amount}</td>
                <td>{request.reason}</td>
                <td>{request.category}</td>
                <td>{request.requestDate}</td>
                <td>
                  <button onClick={() => handleAction(request.id, "Approve")}>
                    Approve
                  </button>
                  <button onClick={() => handleAction(request.id, "Reject")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

}
export default DonationRequest