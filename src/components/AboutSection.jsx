import React, { useState, useEffect } from "react";
import API from "../api/apiurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AboutSection = () => {
  const [user, setUser] = useState(null); // { ...user fields, interests: [{interest_id, interest_name}] }
  const [editedUser, setEditedUser] = useState(null); // { ...user fields, interests: [id, id, ...] }
  const [isEditing, setIsEditing] = useState(false);
  const [allInterests, setAllInterests] = useState([]); // [{id, name}]
  const token = localStorage.getItem("token");

  // Fetch all possible interests
  const fetchAllInterests = async () => {
    try {
      const res = await fetch(API.GET_DESTINATION_INTEREST);
      const data = await res.json();
      setAllInterests(data.interests || []); // [{id, name}]
    } catch (err) {
      setAllInterests([]);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("action", "get");
  
      const response = await fetch("http://localhost/trippartner/other/about.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result?.success && result?.data) {
        setUser(result.data);
      } else {

        setUser(null);
      }
      
    } catch (err) {
      setUser(null);
    }
  };
  

  useEffect(() => {
    fetchAllInterests();
    fetchUserProfile(token);
  }, [token]);

  // When entering edit mode, convert interests to array of IDs
  const startEdit = () => {
    setEditedUser({
      ...user,
      interests: user.interests.map((i) => i.interest_id),
    });
    setIsEditing(true);
  };

  // When cancelling edit, reset
  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  // Toggle interest by ID
  const toggleInterest = (id) => {
    setEditedUser((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((item) => item !== id)
        : [...prev.interests, id],
    }));
  };

  // Save changes (for now, just update local state)
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("action", "update");
      formData.append("name", editedUser.name);
      formData.append("gender", editedUser.gender);
      formData.append("dob", editedUser.dob);
      formData.append("location", editedUser.location);
      formData.append("about", editedUser.about);
      formData.append("budget", editedUser.budget_p);
      formData.append("image", user.image || ""); // Optional: assuming no image update UI
  
      // Append interests (array of IDs)
      editedUser.interests.forEach((id) => {
        formData.append("interests[]", id);
      });
  
      const response = await fetch("http://localhost/trippartner/other/about.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      
  
      if (result.success) {
        // After saving, reflect the updates in view mode
        const updatedUser = {
          ...editedUser,
          interests: allInterests
            .filter((interest) => editedUser.interests.includes(interest.id))
            .map((interest) => ({
              interest_id: interest.id,
              interest_name: interest.name,
            })),
        };
        setUser(updatedUser);
        setIsEditing(false);
        setEditedUser(null);
        toast.success("Profile updated successfully!");
        // alert("Profile updated successfully!");
      } else {
        toast.error("Failed to update: " + result.message);
        // alert("❌ Failed to update: " + result.message);
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="about-container">
      <div className="top-section">
        <img
          className="profile-image"
          src={
            user.image && !user.image.startsWith("http")
              ? `http://localhost/trippartner/uploads/${user.image.replace("../uploads/", "")}`
              : user.image
          }
          alt={user.name}
        />
        <h2 className="profile-name">
          {isEditing ? (
            <input
              name="name"
              value={editedUser?.name || ""}
              onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
            />
          ) : (
            user.name
          )}
        </h2>
      </div>
      <div className="details-grid">
        <div className="profile-row">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div className="profile-row">
          <label>Gender:</label>
          {isEditing ? (
            <select
              name="gender"
              value={editedUser?.gender || ""}
              onChange={e => setEditedUser({ ...editedUser, gender: e.target.value })}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <span>{user.gender}</span>
          )}
        </div>
        <div className="profile-row">
          <label>Date of Birth:</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={editedUser?.dob || ""}
              onChange={e => setEditedUser({ ...editedUser, dob: e.target.value })}
            />
          ) : (
            <span>{user.dob}</span>
          )}
        </div>
        <div className="profile-row">
          <label>Location:</label>
          {isEditing ? (
            <input
              name="location"
              value={editedUser?.location || ""}
              onChange={e => setEditedUser({ ...editedUser, location: e.target.value })}
            />
          ) : (
            <span>{user.location}</span>
          )}
        </div>
        <div className="profile-row">
          <label>Preferred Budget:</label>
          {isEditing ? (
            <select
              name="budget_p"
              value={editedUser?.budget_p || ""}
              onChange={e => setEditedUser({ ...editedUser, budget_p: e.target.value })}
            >
              <option value="Budget">Budget</option>
              <option value="Moderate">Moderate</option>
              <option value="Luxury">Luxury</option>
            </select>
          ) : (
            <span>{user.budget_p === "average" ? "Medium" : user.budget_p}</span>
          )}
        </div>
        <div className="profile-row full-width">
          <label>About:</label>
          {isEditing ? (
            <textarea
              name="about"
              value={editedUser?.about || ""}
              onChange={e => setEditedUser({ ...editedUser, about: e.target.value })}
            />
          ) : (
            <span>{user.about}</span>
          )}
        </div>
        <div className="profile-row full-width">
          <label>Interests:</label>
          {isEditing ? (
            <div className="interest-tags">
              {allInterests.map((interest) => (
                <span
                  key={interest.id}
                  className={`tag ${editedUser?.interests?.includes(interest.id) ? "selected" : ""}`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  {interest.name}
                </span>
              ))}
            </div>
          ) : user.interests?.length > 0 ? (
            <div className="interests">
              {user.interests.map((item) => (
                <span key={item.interest_id} className="interest-tag">
                  {item.interest_name}
                </span>
              ))}
            </div>
          ) : (
            <span>None listed</span>
          )}
        </div>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={startEdit}>
            Edit Profile
          </button>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AboutSection;
