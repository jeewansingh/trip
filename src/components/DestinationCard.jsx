import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/DestinationCard.css";
import location from "../icons/location.svg";
import person from "../icons/person.svg";

function DestinationCard({ id, image, name, description, trips }) {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    // navigate(`/destination-trip/`); // This is temprorary, will be updated to include ID
    navigate(`/destination-trip/${id}`); // navigate to destination-trip page with ID
  };
  return (
    <div className="destination-card">
      <img src={image} alt="Destination" className="destination-image" />
      <div className="destination-info">
        <div className="destination-title">
          <img src={location} alt="location" />
          <div className="destination-name">{name}</div>
        </div>
        <div className="destination-desc">{description}</div>
        <button className="destination-cta" onClick={handleExploreClick}>
          Explore Trips
        </button>

        <div className="travel-card-badge">
          <img src={person} alt="person" />
          <span>{trips} Trips</span>
        </div>
      </div>
    </div>
  );
}
export default DestinationCard;
