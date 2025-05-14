import NavBar from "../components/NavBar";
import "./css/TripDetails.css";
import NavBarLoggedIn from "../components/NavBarLoggedIn";
import TripInfoCard from "../components/TripInfoCard";
import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import location from "../icons/Locationwhite.svg";
import back from "../icons/chevron-left.svg";
import userImage from "../images/user.jpg";
import calendar from "../icons/calendar.svg";
import clock from "../icons/clock.svg";
import dollar from "../icons/dollar-circle.svg";
import user from "../icons/user.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TripDetails() {
  const { id } = useParams(); // Tis id will be used to fetch the destination details
  const loginStatus = 1; // 0 for not logged in, 1 for logged in

  const tripDetails = {
    id: 1,
    name: "Explore Bali",
    location: "Bali, Indonesia",
    date: "March 15, 2025",
    duration: "7 days",
    budget: "$1,200",
    createdBy: "John Doe",
    interests: ["beach", "culture", "food"],
    description:
      "Exploring the beaches, temples and local culture of Bali. Looking for laid-back travelers who enjoy d",
  };
  const handleJoinClick = () => {
    toast.success("Join request sent");

    console.log(tripDetails.date, tripDetails.duration);
    // You can navigate or trigger action here
  };
  return (
    <div>
      {loginStatus === 1 ? <NavBarLoggedIn /> : <NavBar />}
      <div className="trip-details-container">
        <div className="trip-details-head">
          <div className="go-back" onClick={() => window.history.back()}>
            <img src={back} alt="back" />
            Back to all tips
          </div>
          <div className="trip-details-header">
            <div>
              <div className="trip-details-title"> {tripDetails.name}</div>
              <div className="trip-details-subtitle">
                <img src={location} alt="location" />
                <div className="trip-details-location-name">
                  {tripDetails.location}
                </div>
              </div>
            </div>
            {/* <div className="trip-details-created">
              <img src={userImage} alt="user" className="trip-details-user" />
              <div className="trip-details-created-by">
                <span>Created By</span>
                <div className="trip-details-created-by-name">
                  {tripDetails.createdBy}
                </div>
              </div>
            </div> */}
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
                  <img src={user} alt="user" />
                  <span className="label">Gender Preffered</span>
                </div>
                <div className="value">Male</div>
              </div>
            </div>
          </div>

          {/* <TripInfoCard
            date={tripDetails.date}
            duration={tripDetails.duration}
            budget={tripDetails.budget}
            gender="Male"
            onJoinClick={handleJoinClick}
          /> */}
          <ProfileCard onJoinClick={handleJoinClick} userImage={userImage} />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}
export default TripDetails;
