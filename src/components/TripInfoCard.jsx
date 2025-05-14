import React from "react";
import calendar from "../icons/calendar.svg";
import clock from "../icons/clock.svg";
import dollar from "../icons/dollar-circle.svg";
import user from "../icons/user.svg";

function TripInfoCard({ date, duration, budget, gender, onJoinClick }) {
  return (
    <div className="trip-info-card">
      <div className="info-row">
        <div className="info-item">
          <img src={calendar} alt="calendar" />
          <span className="label">Date</span>
        </div>
        <div className="value">{date}</div>
      </div>

      <div className="info-row">
        <div className="info-item">
          <img src={clock} alt="clock" />
          <span className="label">Duration</span>
        </div>
        <div className="value">{duration}</div>
      </div>

      <div className="info-row">
        <div className="info-item">
          <img src={dollar} alt="dollar" />
          <span className="label">Budget</span>
        </div>
        <div className="value">{budget}</div>
      </div>

      <div className="info-row">
        <div className="info-item">
          <img src={user} alt="user" />
          <span className="label">Gender Preffered</span>
        </div>
        <div className="value">{gender}</div>
      </div>

      <button className="join-button" onClick={onJoinClick}>
        Request to Join
      </button>
    </div>
  );
}

export default TripInfoCard;
