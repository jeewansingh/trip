import React, { useState, useEffect } from "react";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./css/Destination.css";
import "./css/DestinationTrip.css";
import plus from "../icons/plus.svg";
import search from "../icons/search.svg";
import TripCard from "../components/TripCard";
import destination from "../images/destination.png";
import back from "../icons/chevron-left.svg";

function DestinationTrip() {
  const navigate = useNavigate();
  const { id } = useParams(); // Tis id will be used to fetch the destination details
  const [trips, setTrips] = useState([]); // Ensure trips is always an array
  const [errorMessage, setErrorMessage] = useState(null);
  const [locationName, setLocationName] = useState("Location");
  const [locationDesc, setLocationDesc] = useState("Short Description");
  const [locationImage, setLocationImage] = useState("");

  useEffect(() => {
    fetchTrips();
    fetchDestinationDetails();
  }, []);

  const fetchDestinationDetails = () => {
    fetch("http://localhost/trippartner/other/get_destination_by_id.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ id }), // destination ID
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setLocationName(data.locationName);
          setLocationDesc(data.locationDescription);
          setLocationImage(data.locationImage);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch destination details:", err);
      });
  };

  const fetchTrips = () => {
    fetch("http://localhost/trippartner/other/get_trips.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: localStorage.getItem("token"),
        destination_id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setTrips(data); // Safely set trips if data is valid
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error fetching trips.");
      });
  };

  const handleNewTrip = () => {
    navigate(`/destination-trip/${id}/create-trip`);
  };

  return (
    <div>
      {console.log(locationImage)}
      <NavBarLoggedIn />
      <div
        className="destination-trip-head"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${locationImage})`,
        }}
      >
        <div className="go-back" onClick={() => window.history.back()}>
          <img src={back} alt="back" />
          Back to all destinations
        </div>
        <div>
          <div className="destination-trip-title">{locationName}</div>
          <div className="destination-trip-subtitle">{locationDesc}</div>
        </div>
      </div>
      <div className="section-container">
        <div className="section-head">Trips to {locationName}</div>
        <button className="create-button" onClick={handleNewTrip}>
          <img src={plus} alt="plus" /> Create New Trip
        </button>
      </div>
      <div className="trip-all-cards">
        {trips.length > 0 ? (
          trips.map((trip, index) => (
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
              userImage={trip.user_image}
            />
          ))
        ) : (
          <div className="no-results">
            <img src={search} alt="No results" />
            <div className="no-results-text">No trip found</div>
            <div className="no-results-subtext">Create a new trip</div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
export default DestinationTrip;
