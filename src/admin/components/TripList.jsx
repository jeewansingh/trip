import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost/trippartner/admin/get_active_trips.php";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ token }).toString(),
      });
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setTrips(result.data);
      } else {
        setTrips([]);
      }
    } catch (err) {
      setTrips([]);
    }
    setLoading(false);
  };

  const handleDelete = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    setDeletingId(tripId);
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token,
          action: "delete",
          trip_id: tripId,
        }).toString(),
      });
      const result = await response.json();
      if (result.message && result.message.includes("success")) {
        toast.success("Trip deleted successfully!");
        setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      } else {
        toast.error(result.message || "Failed to delete trip.");
      }
    } catch (err) {
      toast.error("Error deleting trip.");
    }
    setDeletingId(null);
  };

  if (loading) return <div>Loading trips...</div>;

  return (
    <div>
      <h3>Trips</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created By</th>
            <th>Created At</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Interests</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.name}</td>
              <td>{trip.createdBy}</td>
              <td>{trip.created_at}</td>
              <td>{trip.start_date}</td>
              <td>{trip.end_date}</td>
              <td className="admin-desc-cell">
                {Array.isArray(trip.interests) ? trip.interests.join(", ") : ""}
              </td>
              <td>
                <button
                  className="admin-action-btn delete"
                  onClick={() => handleDelete(trip.id)}
                  disabled={deletingId === trip.id}
                >
                  {deletingId === trip.id ? "Deleting..." : "Delete"}
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

export default TripList; 