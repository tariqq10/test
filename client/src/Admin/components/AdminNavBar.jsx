import { Link} from "react-router-dom"
import '../styles/sidebar.css';

const AdminNavBar = () => {
    return (
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/admin">
            <span className="material-symbols-outlined icon_left">home</span>Home
            </Link>
          </li>
          <li>
            <Link to="/categories">
            <span className="material-symbols-outlined icon_left">category</span>Categories
            </Link>
          </li>
          <li>
            <Link to="/request">
            <span className="material-symbols-outlined icon_left">volunteer_activism</span>Donation Request
            </Link>
          </li>
        </ul>
      </nav>
    );
}
export default AdminNavBar;