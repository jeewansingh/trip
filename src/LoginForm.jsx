import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { MapPin } from "lucide-react";
import "./LoginForm.css";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      alert("Welcome back! You have successfully signed in.");
      setIsLoading(false);
      // In a real app, would redirect to dashboard or home page
    }, 1500);
  };

  return (
    <div className="login-form">
      <div className="card-header">
        <div className="logo-container">
          <div className="logo">{/* <MapPin size={28} /> */}</div>
        </div>
        <h2 className="card-title">Welcome back</h2>
        <p className="card-description">Sign in to your Wanderlust account</p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              {/* <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link> */}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="checkbox-container">
            <input
              id="rememberMe"
              type="checkbox"
              className="checkbox"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Remember me
            </label>
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="card-footer">
        <div className="signup-text">
          Don't have an account?{" "}
          {/* <Link to="/signup" className="signup-link">
            Sign up
          </Link> */}
        </div>
      </div>
    </div>
  );
}
