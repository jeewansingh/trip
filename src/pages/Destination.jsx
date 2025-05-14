import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import Footer from "../components/Footer";
import "./css/Destination.css";
import plus from "../icons/plus.svg";
import DestinationCard from "../components/DestinationCard";
import search from "../icons/search.svg";

function Destination() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchDestination, setSearchDestination] = useState("");

  const loginStatus = 1; // 0 for not logged in, 1 for logged in

  useEffect(() => {
    fetch("http://localhost/trippartner/other/get_destination.php")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data.destinations);
        setFilteredDestinations(data.destinations); // initially show all
      })
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  const handleNewDestination = () => {
    navigate("/create-destination");
  };

  const handleSearchDestination = () => {
    const filtered = destinations.filter((dest) =>
      dest.name.toLowerCase().includes(searchDestination.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  // Sample data for destinations
  // const destinations = [
  //   {
  //     id: 1,
  //     image: destination,
  //     name: "Bali, Indonesia",
  //     description:
  //       "Tropical paradise with beaches, temples and lush landscapes.",
  //     trips: 12,
  //   },
  // ];
  return (
    <div>
      <NavBarLoggedIn />
      <div className="destination-head">
        <div className="desc-head-title">Explore Destinations</div>
        <div className="desc-head-subtitle">
          Discover amazing places around the world and connect with travelers
          heading there
        </div>
      </div>
      <div className="destination-search">
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a destination..."
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchDestination}>
            Search
          </button>
        </div>

        <button className="create-button" onClick={handleNewDestination}>
          <img src={plus} alt="plus" /> Propose New Destination
        </button>
      </div>
      <div className="destination-all-cards">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, index) => (
            <DestinationCard
              key={index}
              id={dest.id}
              image={dest.image}
              name={dest.name}
              description={dest.description}
              trips={dest.trips}
              // trips="00"
            />
          ))
        ) : (
          <div className="no-results">
            <img src={search} alt="No results" />
            <div className="no-results-text">No destination found</div>
            <div className="no-results-subtext">
              Try searching for something else or propose a new destination
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
export default Destination;
