import React, { useState, useEffect } from "react";
import "../pages/css/Authentication.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import API from "../api/apiurl";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [interestsList, setInterestsList] = useState([]);

  useEffect(() => {
    fetch(API.GET_DESTINATION_INTEREST)
      .then((res) => res.json())
      .then((data) => {
        setInterestsList(data.interests);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    location: "",
    image: null,
    about: "",
    preferred_budget: "",
    interests: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const toggleInterest = (id) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((item) => item !== id)
        : [...prev.interests, id],
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      gender,
      dob,
      location,
      image,
      about,
      preferred_budget,
      interests,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !dob ||
      !location ||
      !image
    ) {
      toast.error("All required fields must be filled");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("gender", gender);
    data.append("dob", dob);
    data.append("location", location);
    data.append("image", image);
    data.append("about", about);
    data.append("preferred_budget", preferred_budget);
    interests.forEach((id) => data.append("interests[]", id));

    try {
      const response = await fetch(API.SIGNUP, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Account created successfully! ");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.error(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-head">Create an Account</div>
        <div className="auth-desc">
          Sign up to find your perfect travel companion
        </div>
        <form
          className="auth-form-content"
          onSubmit={handleSignup}
          encType="multipart/form-data"
        >
          <div className="form-columns">
            {/* Left Column */}
            <div className="form-column">
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
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-section">
                <label className="auth-form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-section">
                <label className="auth-form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="form-section">
                <label className="auth-form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Kathmandu, Nepal"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-section">
                <label className="auth-form-label">Profile Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
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
            </div>
          </div>

          <div className="form-section full-width">
            <label className="auth-form-label">About (Optional)</label>
            <textarea
              name="about"
              placeholder="Tell us a little about yourself..."
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          <div className="form-section full-width">
            <label className="auth-form-label">Preferred Budget</label>
            <select
              name="preferred_budget"
              value={formData.preferred_budget}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Budget">Budget</option>
              <option value="Moderate">Moderate</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div className="form-section full-width">
            <label className="auth-form-label">
              Trip Activities & Interests
            </label>
            <div className="interest-tags">
              {interestsList.map((interest) => (
                <span
                  key={interest.id}
                  className={`tag ${
                    formData.interests.includes(interest.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  {interest.name}
                </span>
              ))}
            </div>
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
