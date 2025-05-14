import "./css/Hero.css";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-head">Find Your Perfect Travel Partner</div>
        <div className="hero-body">
          Connect with like-minded travelers who share your interests, budget,
          and travel style for unforgettable adventures.
        </div>
        <button className="hero-cta" onClick={handleSignInClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}
export default Hero;
