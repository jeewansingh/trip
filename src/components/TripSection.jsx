import React, { useState, useEffect } from "react";
import "./css/DestinationSection.css"; //For Title and Section
import "./css/TripSection.css";
import TripCard from "./TripCard";
import { useNavigate } from "react-router-dom";
import API from "../api/apiurl";

function TripSection() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]); // Ensure trips is always an array

  const handleViewAllTripsClick = () => {
    navigate("/trips");
  };
  useEffect(() => {
    fetch(API.TRIP_SECTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ token: localStorage.getItem("token") }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTrips(data); // Safely set trips if data is valid
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="destination-section">
      <div className="destination-container">
        <div>
          <div className="section-head">Featured Trips</div>
          <div className="section-desc">
            Join these upcoming adventures with fellow travelers
          </div>
        </div>
        <button className="view-all-button" onClick={handleViewAllTripsClick}>
          View All
        </button>
      </div>
      <div className="destination-cards">
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            id={trip.id}
            name={trip.name}
            locationName={trip.location}
            date={trip.date}
            duration={trip.duration}
            budget={trip.budget}
            createdBy={trip.createdBy}
            description={trip.description}
            interests={trip.interests}
            same_creator={trip.same_creator}
            join_request={trip.join_request}
            userImage={trip.user_image} // Ensure correct prop
          />
        ))}
      </div>
    </div>
  );
}
export default TripSection;
