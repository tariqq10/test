import { Link} from "react-router-dom"


const AdminNavBar = () => {
    return (
      <nav>
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