import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./AdminDashboard.css";
import UserList from "./components/UserList";
import DestinationList from "./components/DestinationList";
import TripList from "./components/TripList";
import RequestList from "./components/RequestList";

const API_URL = "http://localhost/trippartner/admin/dashboard.php";

const cardData = [
  {
    key: "total_users",
    label: "Total Users",
    color: "#1976d2",
    icon: "👤",
    component: UserList,
  },
  {
    key: "total_active_destinations",
    label: "Active Destinations",
    color: "#43a047",
    icon: "📍",
    component: DestinationList,
  },
  {
    key: "total_active_trips",
    label: "Total Trips",
    color: "#fbc02d",
    icon: "🧳",
    component: TripList,
  },
  {
    key: "new_destination_requests",
    label: "New Destination Requests",
    color: "#e53935",
    icon: "📝",
    component: RequestList,
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(cardData[0].key);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admintoken");
      if (!token) {
        setStats(null);
        setLoading(false);
        return;
      }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ token }).toString(),
      });
      const data = await response.json();
      if (data.data) {
        setStats(data.data);
      } else {
        setStats(null);
      }
    } catch (err) {
      setStats(null);
    }
    setLoading(false);
  };

  const handleCardClick = (cardKey) => {
    setActiveCard(cardKey);
  };

  const renderActiveComponent = () => {
    const activeCardData = cardData.find(card => card.key === activeCard);
    if (activeCardData && activeCardData.component) {
      const Component = activeCardData.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="dashboardContainer">
      <h2 className="dashboardTitle">Admin Dashboard</h2>
      {/* ToastContainer for admin toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
      {loading ? (
        <div className="dashboardLoading">Loading dashboard...</div>
      ) : stats ? (
        <>
          <div className="dashboardGrid">
            {cardData.map((card) => (
              <div
                key={card.key}
                className={`dashboardCard${activeCard === card.key ? " dashboardCardActive" : ""}`}
                style={{ borderTopColor: card.color, cursor: "pointer" }}
                onClick={() => handleCardClick(card.key)}
              >
                <div className="dashboardIcon" style={{ color: card.color }}>
                  {card.icon}
                </div>
                <div className="dashboardValue" style={{ color: card.color }}>
                  {stats && stats[card.key] ? stats[card.key] : 0}
                </div>
                <div className="dashboardLabel">{card.label}</div>
              </div>
            ))}
          </div>
          <div className="dashboardDetailsSection">
            {renderActiveComponent()}
          </div>
        </>
      ) : (
        <div className="dashboardError">Failed to load dashboard data.</div>
      )}
    </div>
  );
};

export default AdminDashboard;