import "./css/Authentication.css";
import back from "../icons/back-blue.svg";
import { useNavigate } from "react-router-dom";
import React from "react";
import SignIn from "../components/Singin";

function Login() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-go-back" onClick={handleGoBack}>
          <img src={back} alt="back" />
          Back to Home
        </div>
        <div className="login-step">
          <SignIn />
        </div>
      </div>

      <div className="login-right">
        <h2>Find Perfect Travel Companion</h2>
        <p>
          Connect with like-minded travelers who share your interests, travel
          style, and sense of adventure.
        </p>
      </div>
    </div>
  );
}

export default Login;
