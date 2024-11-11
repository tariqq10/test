import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEnteredUsernameChange = (e) => {
    setEnteredUsername(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEnteredPasswordChange = (e) => {
    setEnteredPassword(e.target.value);
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUpToggle = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setPassword();
    setUsername();
    setIsLoggedIn(true);
    navigate("/Home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasUserName = username === enteredUsername;
    const hasPassword = password === enteredPassword;

    if (hasPassword && hasUserName) {
      setIsLoggedIn(true);
      navigate("/Home");
    } else if (enteredUsername === "admin" && enteredPassword === "12345678") {
      setIsLoggedIn(true);
      navigate("/Home");
    } else {
      alert("Invalid credentials: Retry");
    }
  };

  if (showSignUp) {
    return (
      <div className="loginPage">
        {/* Logo and form setup */}
        <h2>Login To your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="formContainer">
            <input
              type="text"
              id="username"
              value={enteredUsername}
              onChange={handleEnteredUsernameChange}
              placeholder="Username"
            />
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={handleEnteredPasswordChange}
              placeholder="Password"
            />
          </div>
          <div className="btnsBar1">
            <button type="submit">Login</button>
            <div className="signUp">
              Don't have an account?
              <a onClick={handleSignUpToggle} href="#">
                Sign Up
              </a>
            </div>
          </div>
        </form>
        <Link to="/Home" className="homeButton">
          <button>Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="loginPage">
      <Link to="/Home" className="homeButton">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Login;
