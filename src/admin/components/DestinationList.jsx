import React, { useState, useEffect } from "react";

const API_URL = "http://localhost/trippartner/admin/get_active_destinations.php";
const UPLOADS_BASE = "http://localhost/trippartner/uploads/";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
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
        setDestinations(result.data);
      } else {
        setDestinations([]);
      }
    } catch (err) {
      setDestinations([]);
    }
    setLoading(false);
  };

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/60";
    if (image.startsWith("http")) return image;
    // Remove ../uploads/ if present
    const clean = image.replace(/^\.\.\/uploads\//, "");
    return UPLOADS_BASE + clean;
  };

  if (loading) return <div>Loading destinations...</div>;

  return (
    <div>
      <h3>Active Destinations</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Continent</th>
            <th>Description</th>
            <th>Trip Count</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((dest) => (
            <tr key={dest.id}>
              <td>
                <img 
                  src={getImageUrl(dest.image)} 
                  alt={dest.name} 
                  width={60} 
                  height={40} 
                />
              </td>
              <td>{dest.name}</td>
              <td>{dest.location}</td>
              <td>{dest.continent}</td>
              <td className="admin-desc-cell">{dest.description}</td>
              <td>{dest.trip_count || "0"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DestinationList; 