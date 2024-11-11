import { Link, Router, Routes, Route } from "react-router-dom"
import Categories from "../pages/Categories"


const AdminNavBar = () => {
    return (
      <nav>
        <div>
            <Link to="/admin">
              <span>Home</span>
            </Link>
            <Link to="/categories">
              <span>Categories</span>
            </Link>
            <Link to="/requests">
              <span>Manage Request</span>
            </Link>
            <Routes>
              <Route path="/categories" element={<Categories/>} />
            </Routes>
        </div>
      </nav>
    );
}
export default AdminNavBar;