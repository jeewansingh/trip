import React from "react";
import "./css/DestinationSection.css"; //For Title and Section
import "./css/TripSection.css";
import TripCard from "./TripCard";
import { useNavigate } from "react-router-dom";
import user from "../images/user.jpg";

function TripSection() {
  const navigate = useNavigate();

  const handleViewAllTripsClick = () => {
    navigate("/trips");
  };

  // Sample data for destinations
  const trips = [
    {
      id: 1,
      name: "Explore Bali",
      userImage: user,
      location: "Bali, Indonesia",
      date: "March 15, 2025",
      duration: "7 days",
      budget: "$1,200",
      createdBy: "John Doe",
      interests: ["beach", "culture", "food"],
      description:
        "Exploring the beaches, temples and local culture of Bali. Looking for laid-back travelers who enjoy d",
    },
    {
      id: 2,
      name: "Discover Tokyo",
      userImage: user,
      location: "Tokyo, Japan",
      date: "April 10, 2025",
      duration: "5 days",
      budget: "$1,500",
      createdBy: "Jane Smith",
      interests: ["technology", "culture", "food"],
      description:
        "Experience the vibrant city life, delicious sushi, and historical temples of Tokyo. Ideal for curious travelers.",
    },
    {
      id: 3,
      name: "Alps Hiking Adventure",
      userImage: user,
      location: "Zermatt, Switzerland",
      date: "June 20, 2025",
      duration: "10 days",
      budget: "$2,300",
      createdBy: "Mike Johnson",
      interests: ["hiking", "nature", "photography"],
      description:
        "Join us for a breathtaking hike through the Swiss Alps. Great for adventurers and nature lovers.",
    },
  ];
  //

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
            location={trip.location}
            date={trip.date}
            duration={trip.duration}
            budget={trip.budget}
            createdBy={trip.createdBy}
            description={trip.description}
            interests={trip.interests}
            userImage={trip.userImage}
          />
        ))}
      </div>
    </div>
  );
}
export default TripSection;
