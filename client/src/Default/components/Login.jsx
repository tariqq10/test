// import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/Login.css';
import DefaultDashboard from './DefaultDashboard';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await fetch({}, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data?.access_token) {
        toast.success(data.message);

        localStorage.setItem("session", JSON.stringify(data));

        navigate("/")
      } else {
        toast.error(data.message);
      }
    }
  })
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [isFlipped, setIsFlipped] = useState(false); // For card flip

  // Handle login logic
  // const handleLogin = () => {
  //   if (username === 'admin' && password === 'password') {
  //     Swal.fire({
  //       title: 'Welcome!',
  //       text: 'You have logged in successfully.',
  //       icon: 'success',
  //     });
  //   } else {
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Invalid username or password.',
  //       icon: 'error',
  //     });
  //   }
  // };

  // // Handle register logic (for simplicity, just a basic log)
  // const handleRegister = () => {
  //   Swal.fire({
  //     title: 'Registered!',
  //     text: 'You have successfully registered.',
  //     icon: 'success',
  //   });
  // };

  return (
    <div className="section full-height">
      <div className="card-3d-wrap">
        <div className="card-3d-wrapper">
          <DefaultDashboard />
          {/* Front of the card: Login Form */}
          <div>
            <div className="center-wrap">
              <h2>Login</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helperText={formik.errors.email}
                    color={formik.errors.email ? "failure" : undefined}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    helperText={formik.errors.password}
                    color={formik.errors.password ? "failure" : undefined}
                    // className="form-style"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn">
                    Login
                  </button>
                </div>
              </form>
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>

          {/* Back of the card: Register Form
          <div className="card-back">
            <div className="center-wrap">
              <h2>Login</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-style"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-style"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="btn"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p onClick={() => setIsFlipped(false)}>Already have an account? Login</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
