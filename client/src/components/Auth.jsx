import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Auth.css';

const themes = [
  // Theme definitions...
];

const setTheme = (theme) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--color", theme.color);
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty("--glass-color", theme.glassColor || "rgba(255, 255, 255, 0.2)");
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/dashboard'); // Redirect to Dashboard
      });
    } else {
      Swal.fire({
        title: 'Login Failed!',
        text: 'Invalid email or password.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (fullName && phone && email && password) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      
      Swal.fire({
        title: 'Registration Successful!',
        text: 'You can now log in.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        setIsLogin(true); // Switch to login form after successful registration
        navigate('/dashboard'); // Redirect to Dashboard
      });
    } else {
      Swal.fire({
        title: 'Registration Failed!',
        text: 'Please fill out all fields.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="card-3d-wrap mx-auto">
        <div className={`card-3d-wrapper ${isLogin ? 'login' : 'register'}`}>
          {/* Login Card */}
          <div className={`card-front ${isLogin ? 'active' : ''}`}>
            <div className="center-wrap">
              <h4>Log In</h4>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
              </form>
              <p>
                Don't have an account? <span onClick={toggleForm}>Sign Up</span>
              </p>
              {/* Social Media Buttons */}
              <div className="social-btns">
                <button className="social-btn google">
                  <FaGoogle /> Google
                </button>
                <button className="social-btn facebook">
                  <FaFacebook /> Facebook
                </button>
                <button className="social-btn github">
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
          </div>

          {/* Register Card */}
          <div className={`card-back ${!isLogin ? 'active' : ''}`}>
            <div className="center-wrap">
              <h4>Register</h4>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
              </form>
              <p>
                Already have an account? <span onClick={toggleForm}>Log In</span>
              </p>
              {/* Social Media Buttons */}
              <div className="social-btns">
                <button className="social-btn google">
                  <FaGoogle /> Google
                </button>
                <button className="social-btn facebook">
                  <FaFacebook /> Facebook
                </button>
                <button className="social-btn github">
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Buttons at the Bottom */}
      <div className="theme-btn-container">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="theme-btn"
            onClick={() => setTheme(theme)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Auth;
