import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost/trippartner/admin/get_new_destination_requests.php";
const UPLOADS_BASE = "http://localhost/trippartner/uploads/";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
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
        setRequests(result.data);
      } else {
        setRequests([]);
      }
    } catch (err) {
      setRequests([]);
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

  const handleViewRequest = async (request) => {
    setModalLoading(true);
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch("http://localhost/trippartner/admin/get_destination_details.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ 
          token,
          destination_id: request.id 
        }).toString(),
      });
      
      const result = await response.json();
      if (result.data && result.data.destination) {
        setSelectedRequest(result.data.destination);
        setShowModal(true);
      } else {
        toast.error("Failed to load destination details: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      toast.error("Error loading destination details: " + error.message);
    }
    setModalLoading(false);
  };

  const handleAccept = async () => {
    if (!selectedRequest) return;
    
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch("http://localhost/trippartner/admin/get_destination_details.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ 
          token,
          action: "accept",
          destination_id: selectedRequest.id 
        }).toString(),
      });
      
      const result = await response.json();
      console.log("Accept response:", result); // Debug log
      
      // Check for success message
      if (result.message && result.message.includes("success")) {
        toast.success("Destination request accepted successfully!");
        // Remove the accepted destination from the list
        setRequests(prevRequests => 
          prevRequests.filter(req => req.id !== selectedRequest.id)
        );
        // Close modal after a short delay to show toast
        setTimeout(() => {
          setShowModal(false);
          setSelectedRequest(null);
        }, 1000);
      } else {
        toast.error("Failed to accept request: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Accept error:", error); // Debug log
      toast.error("Error accepting request: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedRequest) return;
    
    if (!window.confirm("Are you sure you want to delete this destination request?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch("http://localhost/trippartner/admin/get_destination_details.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ 
          token,
          action: "delete",
          destination_id: selectedRequest.id 
        }).toString(),
      });
      
      const result = await response.json();
      console.log("Delete response:", result); // Debug log
      
      // Check for success message
      if (result.message && result.message.includes("success")) {
        toast.success("Destination request deleted successfully!");
        // Remove the deleted destination from the list
        setRequests(prevRequests => 
          prevRequests.filter(req => req.id !== selectedRequest.id)
        );
        // Close modal after a short delay to show toast
        setTimeout(() => {
          setShowModal(false);
          setSelectedRequest(null);
        }, 1000);
      } else {
        toast.error("Failed to delete request: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error); // Debug log
      toast.error("Error deleting request: " + error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div>
      <h3>Destination Requests</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Continent</th>
            <th>Description</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>
                <img 
                  src={getImageUrl(request.image)} 
                  alt={request.name} 
                  width={60} 
                  height={40} 
                />
              </td>
              <td>{request.name}</td>
              <td>{request.location}</td>
              <td>{request.continent}</td>
              <td className="admin-desc-cell">{request.description}</td>
              <td>
                <button 
                  className="admin-action-btn view" 
                  onClick={() => handleViewRequest(request)}
                  disabled={modalLoading}
                >
                  {modalLoading ? "Loading..." : "View"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {showModal && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Destination Request Details</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="request-image">
                <img 
                  src={getImageUrl(selectedRequest.image)} 
                  alt={selectedRequest.name}
                  width={200}
                  height={150}
                />
              </div>
              
              <div className="request-details">
                <div className="detail-row">
                  <label>Name:</label>
                  <span>{selectedRequest.name}</span>
                </div>
                
                <div className="detail-row">
                  <label>Location:</label>
                  <span>{selectedRequest.location}</span>
                </div>
                
                <div className="detail-row">
                  <label>Continent:</label>
                  <span>{selectedRequest.continent}</span>
                </div>
                
                <div className="detail-row">
                  <label>Description:</label>
                  <span>{selectedRequest.description}</span>
                </div>
                
                <div className="detail-row">
                  <label>Reason:</label>
                  <span>{selectedRequest.reason}</span>
                </div>
                
                <div className="detail-row">
                  <label>Created At:</label>
                  <span>{selectedRequest.created_at}</span>
                </div>
                
                <div className="detail-row">
                  <label>Status:</label>
                  <span className={`status-badge ${selectedRequest.is_active === "1" ? "active" : "pending"}`}>
                    {selectedRequest.is_active === "1" ? "Active" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="admin-action-btn accept" onClick={handleAccept}>
                Accept
              </button>
              <button className="admin-action-btn delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
      <ToastContainer position="top-right" autoClose={3000} />

        </div>
      )}
    </div>
  );
};

export default RequestList; 