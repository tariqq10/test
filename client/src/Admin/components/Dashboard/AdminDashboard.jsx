import { Routes,    Route } from "react-router-dom"
import AdminNavBar from "../AdminNavBar"
import Categories from "../../pages/Categories";
import DonationRequest from "../../pages/DonationRequest";

const AdminDashboard = () => {
    return (
      <div>
        <AdminNavBar />
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/request" element={<DonationRequest />} />
          <Route path="'admin" element={<AdminNavBar />} />
        </Routes>
      </div>
    );
}
export default AdminDashboard