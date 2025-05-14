import React from "react";
import "./css/DestinationSection.css";
import destination from "../images/destination.png";
import DestinationCard from "./DestinationCard";
import { useNavigate } from "react-router-dom";

function DestinationSection() {
  const navigate = useNavigate();

  const handleViewAllDestination = () => {
    navigate("/destinations");
    console.log("Clicked View All button");
  };

  // Sample data for destinations
  const destinations = [
    {
      id: 1,
      image: destination,
      name: "Bali, Indonesia",
      description:
        "Tropical paradise with beaches, temples and lush landscapes.",
      trips: 12,
    },
    {
      id: 2,
      image: destination,
      name: "Paris, France",
      description:
        "The city of lights with iconic landmarks and charming cafes.",
      trips: 8,
    },
    {
      id: 3,
      image: destination,
      name: "Kyoto, Japan",
      description: "Historic temples, cherry blossoms, and rich culture.",
      trips: 5,
    },
    {
      id: 4,
      image: destination,
      name: "New York, USA",
      description: "Skyscrapers, Broadway shows, and world-class museums.",
      trips: 20,
    },
  ];
  //

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
