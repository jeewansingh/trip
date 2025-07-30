import React, { useState } from "react";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import AboutSection from "../components/AboutSection";
import CreatedTripSection from "../components/CreatedTripSection";
import InvitationSent from "../components/InvitationSent";
import InvitationReceived from "../components/InvitatonReceived";
import InvitationAccepted from "../components/InvitationAccepted";
import "./css/UserProfile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutSection />;
      case "created":
        return <CreatedTripSection/>;
      case "sent":
        return <InvitationSent/>;
      case "received":
        return <InvitationReceived/>;
        case "accepted":
        return <InvitationAccepted/>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever key you use for auth
    window.location.href = "/signin"; // redirect to login or homepage

    alert("Logged out!");
  };

  return (
    <div>
      <NavBarLoggedIn />
      <div className="profile-container">
        <aside className="sidebar">
          <div className="sidebar-header">My Profile</div>
          <ul className="sidebar-menu">
            <li
              className={activeTab === "about" ? "active" : ""}
              onClick={() => setActiveTab("about")}
            >
              About
            </li>
            <li
              className={activeTab === "created" ? "active" : ""}
              onClick={() => setActiveTab("created")}
            >
              Created Trips
            </li>
            <li
              className={activeTab === "sent" ? "active" : ""}
              onClick={() => setActiveTab("sent")}
            >
              Sent Invitations
            </li>
            <li
              className={activeTab === "received" ? "active" : ""}
              onClick={() => setActiveTab("received")}
            >
              Received Invitations
            </li>
            <li
              className={activeTab === "accepted" ? "active" : ""}
              onClick={() => setActiveTab("accepted")}
            >
              Accepted Invitations
            </li>
          </ul>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </aside>
        <main className="profile-content">{renderContent()}</main>
      </div>
    </div>
  );   
};

export default Profile;
