import React, { useState } from "react";
import "../pages/css/Authentication.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/trippartner/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        toast.success("Logged in successfully! 🎉");
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-head">Welcome Back!</div>
        <div className="auth-desc">
          Welcome back! Please sign in to continue.
        </div>
        <form
          method="POST"
          className="auth-form-content"
          onSubmit={handleLogin}
        >
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
          <button className="join-button" type="submit">
            Login
          </button>
          <div className="auth-footer">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
