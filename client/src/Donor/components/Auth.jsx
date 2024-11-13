// import React, { useState } from 'react';
import Swal from "sweetalert2";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import "../styles/Auth.css"; // Ensure your CSS file is imported
import DefaultDashboard from "../../Default/components/DefaultDashboard";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const themes = [
  // Same theme array...
];

const setTheme = (theme) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--color", theme.color);
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty(
    "--glass-color",
    theme.glassColor || "rgba(255, 255, 255, 0.2)"
  );
};

const Auth = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Role is required")
    }),
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const res = await fetch({} / register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });
      const data = await res.json();

      if (data?.acces_token) {
        toast.success(data.message);
        localStorage.setItem("session", JSON.stringify(data));
        navigate("/donor");
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <div className="auth-container">
      <DefaultDashboard />

      <div className="card-3d-wrap mx-auto">
        <div className="card-3d-wrapper">
          {/* Register Card */}
          <div className="card-back">
            <div className="center-wrap">
              <h4>Register</h4>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  helperText={formik.errors.first_name}
                  color={formik.errors.first_name ? "failure" : undefined}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  helperText={formik.errors.last_name}
                  color={formik.errors.last_name ? "failure" : undefined}
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
                  type="tel"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  helperText={formik.errors.phone}
                  color={formik.errors.phone ? "failure" : undefined}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  helperText={formik.errors.password}
                  color={formik.errors.password ? "failure" : undefined}
                />

                <input
                  type="password"
                  placeholder="confirmation Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  helperText={formik.errors.confirmPassword}
                  color={formik.errors.confirmPassword ? "failure" : undefined}
                />
                <button type="submit">Register</button>
              </form>
              <p>
                Already have an account? <Link to="/login">Log In</Link>
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
