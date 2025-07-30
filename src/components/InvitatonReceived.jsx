import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost/trippartner/other/invitation_received.php"; // Adjust if needed

const InvitationReceived = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAccept = async (invitationId, trip_name) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("action", "accept");
    formData.append("id", invitationId);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
        toast.success(trip_name + " Invitation accepted!");
      } else {
        toast.error(result.message || "Failed to accept invitation.");
      }
    } catch (err) {
      toast.error("Error accepting invitation.");
    }
  };

  const handleDelete = async (invitationId) => {
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
        toast.success("Invitation deleted!");
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
      <h2>Received Invitations</h2>
      <table className="created-trips-table">
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Sent By</th>
            <th>Status</th>    
            <th>Trip Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.trip_name}</td>
              
              <td>{inv.sent_by}</td>
              <td>
                <span
                  className={
                    inv.status === "pending"
                      ? "status-tag status-pending"
                      : "status-tag"
                  }
                  style={{ textTransform: "capitalize" }}
                >
                  {inv.status}
                </span>
              </td>
              <td>{inv.trip_date}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    marginRight: 8,
                  }}
                  onClick={() => handleAccept(inv.id, inv.trip_name)}
                >
                  Accept
                </button>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => handleDelete(inv.id)}
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

export default InvitationReceived;
