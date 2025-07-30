import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost/trippartner/other/created_trips.php"; // Adjust if needed

const CreatedTripSection = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchTrips = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", token);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setTrips(data);
      } else {
        setTrips([]);
      }
    } catch (err) {
      setTrips([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("action", "delete");
    formData.append("id", tripId);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
        toast.success("Trip deleted!");
        // alert("Trip deleted!");
      } else {
        toast.error(result.message || "Failed to delete trip.");
        // alert(result.message || "Failed to delete trip.");
      }
    } catch (err) {
      toast.error("Error deleting trip.");
      // alert("Error deleting trip.");
    }
  };

  const handleView = (tripId) => {
    
        navigate(`/trip-details/${tripId}`);
      
  };

  if (loading) return <p>Loading...</p>;
  if (!trips.length) return <p>No trips found.</p>;

  return (
    <div className="created-trips-section">
      <h2>Your Created Trips</h2>
      <table className="created-trips-table">
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Interests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.name}</td>
              <td>{trip.location}</td>
              <td>{trip.date}</td>
              <td>{trip.duration}</td>
              <td>
                {trip.interests && trip.interests.length
                  ? trip.interests.join(", ")
                  : "None"}
              </td>
              <td>
                <button onClick={() => handleView(trip.id)}>View</button>
                <button onClick={() => handleDelete(trip.id)} style={{ marginLeft: 8, backgroundColor: "red", color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreatedTripSection;
