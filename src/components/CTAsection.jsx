import "./css/CTAsection.css";
import { useNavigate } from "react-router-dom";

function CTAsection() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/signin");
  };
  return (
    <div className="cta-section">
      <div className="cta-head">Ready to Find Your Travel Partner?</div>
      <div className="cta-desc">
        Join thousands of travelers who've found their perfect travel companions
        through Wanderlust.
      </div>
      <button className="cta-button" onClick={handleGetStartedClick}>
        Get Stared Today
      </button>
    </div>
  );
}
export default CTAsection;
