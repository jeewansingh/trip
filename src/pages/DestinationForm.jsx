import React, { useState, useEffect } from "react";
import API from "../api/apiurl";

import Footer from "../components/Footer";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import back from "../icons/chevron-left-black.svg";
import upload from "../icons/cloud-arrow-up.svg";
import "./css/TripForm.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const continentList = [
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Antarctica",
  "Europe",
  "Australia",
];

function DestinationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destinationName: "",
    country: "",
    continents: [],
    description: "",
    activities: [],
    reason: "",
    image: null,
  });

  const toggleItem = (list, item) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { destinationName, country, continents, description, reason, image } =
      formData;

    if (!destinationName || !country || !description || !reason) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (continents.length !== 1) {
      toast.error("Please select exactly one continent!");
      return;
    }

    // if (activities.length === 0) {
    //   toast.error("Please select at least one activity!");
    //   return;
    // }

    const submitData = new FormData();
    const token = localStorage.getItem("token"); // Or sessionStorage if you use that
    submitData.append("token", token);
    submitData.append("destinationName", destinationName);
    submitData.append("country", country);
    submitData.append("continent", continents[0]);
    submitData.append("description", description);
    submitData.append("reason", reason);

    if (image) {
      submitData.append("image", image);
    }

    fetch(API.CREATE_DESTINATION, {
      method: "POST",

      body: submitData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // toast.success("Destination requested successfully!");
          setFormData({
            destinationName: "",
            country: "",
            continents: [],
            description: "",

            reason: "",
            image: null,
          });
          toast.success(data.message);
          setTimeout(() => {
            navigate("/destinations");
          }, 2000);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Submit error:", error);
        toast.error("Submission failed. Try again!");
      });
  };

  return (
    <div>
      <NavBarLoggedIn />
      <div className="form-container">
        <div className="form-go-back" onClick={() => window.history.back()}>
          <img src={back} alt="back" /> Back to all destinations
        </div>
        <div className="form-title">Propose a New Destination</div>
        <div className="form-subtitle">
          Suggest a new destination that you'd like to see added to our platform
        </div>
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="form-section-header">Destination Details</div>
          <div className="form-row">
            <div className="form-section">
              <label>Destination Name</label>
              <input
                type="text"
                name="destinationName"
                placeholder="Destination Name"
                value={formData.destinationName}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label>Location</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <label>Continent</label>
            <div className="interest-tags">
              {continentList.map((item) => (
                <span
                  key={item}
                  className={`tag ${
                    formData.continents.includes(item) ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      continents: toggleItem(prev.continents, item),
                    }))
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* <div className="form-section">
            <label>Available Activities</label>
            <div className="interest-tags">
              {activityList.map((item) => (
                <span
                  key={item.id}
                  className={`tag ${
                    formData.activities.includes(item.name) ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      activities: toggleItem(prev.activities, item.name),
                    }))
                  }
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div> */}

          <div className="form-section">
            <label>Destination Image</label>
            <label className="image-upload-area" htmlFor="upload">
              <img src={upload} alt="upload icon" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="upload"
              />
            </label>
          </div>

          <div className="form-section">
            <label>Why should this destination be added?</label>
            <textarea
              name="reason"
              placeholder="Why should this destination be added?"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="create-trip-button">
            Propose Destination
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}

export default DestinationForm;
