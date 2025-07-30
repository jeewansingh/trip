import React, { useState, useEffect } from "react";
import "./css/TripDetails.css";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import locationIcon from "../icons/Locationwhite.svg";
import back from "../icons/chevron-left.svg";
import calendar from "../icons/calendar.svg";
import clock from "../icons/clock.svg";
import dollar from "../icons/dollar-circle.svg";
import userIcon from "../icons/user.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api/apiurl";

function TripDetails() {
  const { id } = useParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(API.GET_TRIP_DETAILS, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ trip_id: id, token }),
        });

        const data = await response.json();
        if (data.trip && data.creator) {
          setTripDetails(data.trip);
          setCreator(data.creator);
        } else {
          toast.error("Trip not found.");
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleJoinClick = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost/trippartner/other/join_request.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ trip_id: id, token }),
        }
      );

      const data = await response.json();
      toast.success(data.message);

      // ✅ Update the join_request field locally in tripDetails
      setTripDetails((prev) => ({
        ...prev,
        join_request: 1, // or true if you’re using boolean
      }));
    } catch (error) {
      console.error("Join request error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!tripDetails || !creator) return <div>Loading...</div>;

  return (
    <div>
      <NavBarLoggedIn />
      <div className="trip-details-container">
        <div className="trip-details-head">
          <div className="go-back" onClick={() => window.history.back()}>
            <img src={back} alt="back" />
            Back to all trips
          </div>
          <div className="trip-details-header">
            <div>
              <div className="trip-details-title">{tripDetails.name}</div>
              <div className="trip-details-subtitle">
                <img src={locationIcon} alt="location" />
                <div className="trip-details-location-name">
                  {tripDetails.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="trip-details-content">
          <div className="trip-details-description">
            <div className="trip-details">Trip Details</div>
            <p>{tripDetails.description}</p>

            <div className="trip-interest">
              {tripDetails.interests.map((interest, index) => (
                <span key={index}>{interest}</span>
              ))}
            </div>

            <div className="trip-info-card">
              <div className="info-row">
                <div className="info-item">
                  <img src={calendar} alt="calendar" />
                  <span className="label">Date</span>
                </div>
                <div className="value">{tripDetails.date}</div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <img src={clock} alt="clock" />
                  <span className="label">Duration</span>
                </div>
                <div className="value">{tripDetails.duration}</div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <img src={dollar} alt="dollar" />
                  <span className="label">Budget</span>
                </div>
                <div className="value">{tripDetails.budget}</div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <img src={userIcon} alt="user" />
                  <span className="label">Gender Preferred</span>
                </div>
                <div className="value">{tripDetails.p_gender}</div>
              </div>
            </div>
          </div>

          <ProfileCard
            onJoinClick={handleJoinClick}
            same_creator={tripDetails.same_creator}
            join_request={tripDetails.join_request}
            userImage={creator.image}
            name={creator.name}
            gender={creator.gender}
            dob={creator.dob}
            location={creator.location}
            about={creator.about}
            interests={creator.interest}
            budget={creator.budget}
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}

export default TripDetails;
