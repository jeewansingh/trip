import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost/trippartner/other/invitation_sent.php"; // Adjust if needed

const InvitationSent = () => {
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

  const handleCancel = async (invitationId) => {
    if (!window.confirm("Are you sure you want to cancel this invitation?")) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("action", "delete");
    formData.append("id", invitationId);

    try {
      const response = await fetch("http://localhost/trippartner/other/invitation_sent.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
        toast.success("Invitation cancelled!");
        // alert("Invitation cancelled!");
      } else {
        toast.error(result.message || "Failed to cancel invitation.");
        // alert(result.message || "Failed to cancel invitation.");
      }
    } catch (err) {
        
      toast.error("Error cancelling invitation.");
      // alert("Error cancelling invitation.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!invitations.length) return <p>No invitations found.</p>;

  return (
    <div className="created-trips-section">
      <h2>Sent Invitations</h2>
      <table className="created-trips-table">
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Sent At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.trip_name}</td>
              <td>{inv.creator_name}</td>
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
              <td>{inv.created_at}</td>
              <td>
                <button onClick={() => handleView(inv.trip_id)}>View</button>
                {inv.status === "pending" && (
                  <button
                    onClick={() => handleCancel(inv.id)}
                    style={{ marginLeft: 8, backgroundColor: "red", color: "white" }}
                  >
                    Cancel Request
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default InvitationSent;
