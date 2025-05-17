import React, { useState } from "react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("sent"); // Default tab

  const renderTabContent = () => {
    switch (activeTab) {
      case "sent":
        return <SentInvitations />;
      case "received":
        return <ReceivedInvitations />;
      case "accepted":
        return <AcceptedInvitations />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        <Tab
          label="Sent"
          value="sent"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          label="Received"
          value="received"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          label="Accepted"
          value="accepted"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

const Tab = ({ label, value, activeTab, setActiveTab }) => (
  <button
    className={`py-2 px-4 border-b-2 ${
      activeTab === value
        ? "border-blue-500 font-semibold"
        : "border-transparent text-gray-500"
    }`}
    onClick={() => setActiveTab(value)}
  >
    {label}
  </button>
);

// Dummy components (replace with actual components)
const SentInvitations = () => <div>📤 Sent Invitations</div>;
const ReceivedInvitations = () => <div>📥 Received Invitations</div>;
const AcceptedInvitations = () => <div>✅ Accepted Invitations</div>;

export default UserProfile;
