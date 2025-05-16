import "./css/Authentication.css";
import back from "../icons/back-blue.svg";
import { useNavigate } from "react-router-dom";

import CreateAccount from "../components/CreateAccount";

function SignUp() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      <div className="signup-left">
        <div className="login-go-back" onClick={handleGoBack}>
          <img src={back} alt="back" />
          Back to Home
        </div>
        <div className="login-step">
          <CreateAccount />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
