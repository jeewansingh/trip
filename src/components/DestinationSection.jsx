import React, { useState, useEffect } from "react";
import "./css/DestinationSection.css";
import DestinationCard from "./DestinationCard";
import { useNavigate } from "react-router-dom";

function DestinationSection() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  const handleViewAllDestination = () => {
    navigate("/destinations");
    console.log("Clicked View All button");
  };

  useEffect(() => {
    fetch("http://localhost/trippartner/other/destination_section.php")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data.destinations);
      })
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  return (
    <div className="destination-section">
      <div className="destination-container">
        <div>
          <div className="section-head">Featured Destinations</div>
          <div className="section-desc">
            Explore your next travel destination here!
          </div>
        </div>
        <button className="view-all-button" onClick={handleViewAllDestination}>
          View All
        </button>
      </div>
      <div className="destination-cards">
        {destinations.map((dest, index) => (
          <DestinationCard
            key={index}
            id={dest.id}
            image={dest.image}
            name={dest.name}
            description={dest.description}
            trips={dest.trips}
          />
        ))}
      </div>
    </div>
  );
}
export default DestinationSection;
