import { Link } from "react-router-dom";
import DefaultDashboard from "./DefaultDashboard";

const Register = () => {
    return (
      <div>
        <DefaultDashboard/>
        <div>
          <h1>sign up as </h1>
          <button><Link to="/users/donor">donor</Link></button>
          <button><Link to="/users/ngo">NGO</Link></button>
        </div>
      </div>
    );

}
export default Register