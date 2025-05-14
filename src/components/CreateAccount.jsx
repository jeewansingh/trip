import React, { useState } from "react";
import "../pages/css/Authentication.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Simulate success
    console.log("Creating account with:", formData);
    toast.success("Account created successfully! 🎉");

    // Call API or redirect as needed
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-head">Create an Account</div>
        <div className="auth-desc">
          Sign up to find your perfect travel companion
        </div>
        <form className="auth-form-content" onSubmit={handleSignup}>
          <div className="form-section">
            <label className="auth-form-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-section">
            <label className="auth-form-label">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-section">
            <label className="auth-form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-section">
            <label className="auth-form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="join-button" type="submit">
            Sign Up
          </button>
          <div className="auth-footer">
            Already have an account? <a href="/signin">Sign in</a>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
