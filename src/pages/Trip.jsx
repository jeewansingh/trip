import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import Footer from "../components/Footer";
import "./css/Destination.css";
import plus from "../icons/plus.svg";
import search from "../icons/search.svg";
import TripCard from "../components/TripCard";

function Trip() {
  const navigate = useNavigate();
  const [searchTrip, setSearchTrip] = useState("");
  const [trips, setTrips] = useState([]); // Ensure trips is always an array
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    fetch("http://localhost/trippartner/other/get_trips.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ token: localStorage.getItem("token") }),
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
    navigate("/create-trip");
  };

  const handleSearchTrip = () => {
    console.log("Searching for:", searchTrip);
    if (searchTrip) {
      const filteredTrips = trips.filter((trip) =>
        trip.name.toLowerCase().includes(searchTrip.toLowerCase())
      );
      setTrips(filteredTrips);
    } else {
      fetchTrips(); // Reset trips when search term is cleared
    }
  };

  return (
    <div>
      <NavBarLoggedIn />
      <div className="destination-head">
        <div className="desc-head-title">Explore Trips</div>
        <div className="desc-head-subtitle">
          Find your perfect travel adventure and companions
        </div>
      </div>
      <div className="destination-search">
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a trip..."
            value={searchTrip}
            onChange={(e) => setSearchTrip(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchTrip}>
            Search
          </button>
        </div>

        <button className="create-button" onClick={handleNewTrip}>
          <img src={plus} alt="plus" /> Create New Trip
        </button>
      </div>
      <div className="trip-all-cards">
        {errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : trips && trips.length > 0 ? ( // Make sure trips is not undefined or null
          trips.map(
            (trip, index) => (
              console.log(trip),
              (
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
                  userImage={trip.user_image} // Ensure correct prop
                />
              )
            )
          )
        ) : (
          <div className="no-results">
            <img src={search} alt="No results" />
            <div className="no-results-text">No trip found</div>
            <div className="no-results-subtext">
              Try searching for something else or create a new trip
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Trip;
