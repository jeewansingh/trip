import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/TripCard.css";
import location from "../icons/location.svg";
import user from "../icons/user.svg";
import clock from "../icons/clock.svg";
import dollar from "../icons/dollar-circle.svg";
import calendar from "../icons/calendar.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TripCard({
  id,
  name,
  description,
  date,
  duration,
  budget,
  createdBy,
  interests,
  userImage,
  locationName,
}) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/trip-details/${id}`);
  };

  const handleJoinClick = () => {
    toast.success("Join request sent");
  };

  return (
    <div className="trip-card">
      <img className="trip-card-image" src={userImage} alt="User Image" />
      <div className="trip-card-title">{name}</div>
      <div className="trip-card-created-by">
        <img src={user} alt="user" />
        {createdBy}
      </div>

      <div className="trip-details-span">
        <div className="trip-card-date">
          <img src={calendar} alt="date" />
          {date}
        </div>
        <div className="trip-card-duration">
          <img src={clock} alt="duration" />
          {duration}
        </div>
        <div className="trip-card-budget">
          <img src={dollar} alt="budget" />
          {budget}
        </div>
        <div className="trip-card-location">
          <img src={location} alt="location" />
          <div className="trip-card-location-name">{locationName}</div>
        </div>
      </div>
      <div className="trip-interest">
        {interests.map((interest, index) => (
          <span key={index}>{interest}</span>
        ))}
      </div>
      <div className="trip-card-desc">{description}</div>
      <div className="trip-card-cta">
        <button className="trip-card-view" onClick={handleDetailsClick}>
          View Details
        </button>
        <button className="trip-card-request" onClick={handleJoinClick}>
          Request to Join
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
export default TripCard;
