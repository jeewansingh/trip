import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost/trippartner/other/invitation_accepted.php"; // Adjust if needed

const InvitationAccepted = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchInvitations = async () => {
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
        setInvitations(data);
      } else {
        setInvitations([]);
      }
    } catch (err) {
      setInvitations([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleView = (invitationId) => {
    navigate(`/trip-details/${invitationId}`);
 };

  const handleDelete = async (invitationId, tripName) => {
    if (!window.confirm("Are you sure you want to delete this invitation?")) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("action", "delete");
    formData.append("id", invitationId);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
        toast.success(tripName + " invitation deleted!");
      } else {
        toast.error(result.message || "Failed to delete invitation.");
      }
    } catch (err) {
      toast.error("Error deleting invitation.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!invitations.length) return <p>No invitations found.</p>;

  return (
    <div className="created-trips-section">
      <h2>Accepted Invitations</h2>
      <table className="created-trips-table">
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Partner Name</th>
            <th>Trip Date</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.trip_name}</td>
              <td>{inv.partner_name}</td>
              <td>{inv.date}</td>
              <td>{inv.duration}</td>
              <td>
              <button onClick={() => handleView(inv.trip_id)}>View</button>

                <button
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    marginRight: 8,
                    marginLeft: 8,
                  }}
                  onClick={() => {
                    if (inv.partner_email) {
                      window.location.href = `mailto:${inv.partner_email}?subject=Trip%20Partner%20-%20${encodeURIComponent(inv.trip_name)}`;
                    } else {
                      toast.error("No email found for this partner.");
                    }
                  }}
                >
                  Mail
                </button>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => handleDelete(inv.id, inv.trip_name)}
                >
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

export default InvitationAccepted;
