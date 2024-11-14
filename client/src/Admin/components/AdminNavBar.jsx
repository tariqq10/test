import { Link} from "react-router-dom"
import '../styles/sidebar.css';

const AdminNavBar = () => {
    return (
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/admin">
            Home
            </Link>
          </li>
          <li>
            <Link to="/categories">
            Categories
            </Link>
          </li>
          <li>
            <Link to="/request">
            Donation Request
            </Link>
          </li>
        </ul>
      </nav>
    );
}
export default AdminNavBar;