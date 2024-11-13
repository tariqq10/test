// import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import '../styles/Auth.css'; // Ensure your CSS file is imported
// import DefaultDashboard from '../Admin/components/DefaultDashboard
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';

const themes = [
  // Same theme array...
];

const setTheme = (theme) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--color", theme.color);
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty("--glass-color", theme.glassColor || "rgba(255, 255, 255, 0.2)");
};

const AuthNGO = () => {
  // const [isLogin, setIsLogin] = useState(true);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [phone, setPhone] = useState('');

  const navigate = useNavigate()

  const formik = useFormik({
    validationSchema:Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await fetch({}/register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();

      if (data?.acces_token){
        toast.success(data.message);
        localStorage.setItem("session", JSON.stringify(data));
        navigate("/")
      }else{
        toast.error(data.message);
      }
    },
  });

  // const toggleForm = () => {
  //   setIsLogin(!isLogin);
  // };

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

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   if (fullName && phone && email && password) {
  //     localStorage.setItem('email', email);
  //     localStorage.setItem('password', password);
      
  //     Swal.fire({
  //       title: 'Registration Successful!',
  //       text: 'You can now log in.',
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     });

  //     setIsLogin(true); // After registration, switch to login form
  //   } else {
  //     Swal.fire({
  //       title: 'Registration Failed!',
  //       text: 'Please fill out all fields.',
  //       icon: 'error',
  //       confirmButtonText: 'Try Again',
  //     });
  //   }
  // };

  return (
    <div className="auth-container">
      <div className="card-3d-wrap mx-auto">
        <div className= "card-3d-wrapper">
          {/* Register Card */}
          <div className="card-back">
            <div className="center-wrap">
              {/* <DefaultDashboard /> */}

              <h4>Register</h4>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  helperText={formik.errors.name}
                  color={formik.errors.name ? "failure" : undefined}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  helperText={formik.errors.phone}
                  color={formik.errors.phone ? "failure" : undefined}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.errors.email}
                  color={formik.errors.email ? "failure" : undefined}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  helperText={formik.errors.password}
                  color={formik.errors.password ? "failure" : undefined}
                />
                <button type="submit">Register</button>
              </form>
              <p>
                Already have an account?{" "}
                <Link to= "/login">Log In</Link>
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

export default AuthNGO;
