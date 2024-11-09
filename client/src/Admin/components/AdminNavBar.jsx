import { Link } from "react-router-dom"

const AdminNavBar = () => {
    return(
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
            </div>
        </nav>
    )
}
export default AdminNavBar;