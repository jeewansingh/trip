import "./css/ProfileCard.css";

export default function ProfileCard({ onJoinClick, userImage }) {
  return (
    <div className="profile-card">
      <div className="trip-details">About Trip Creator</div>
      <div className="user-details">
        <img className="user-details-image" src={userImage} alt="User" />
        <div className="user-details-name">John Doe</div>
        <div className="user-details-age">24, Male</div>

        <div className="user-details-about">
          About About About About About About About About About About About
          About About About About About About About About About About About
          About
        </div>
        <div className="user-interest">
          <span className="label">Interests</span>
          <div className="user-interest-list trip-interest">
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>

            {/* <div className="trip-interest">
              {tripDetails.interests.map((interest, index) => (
                <span key={index}>{interest}</span>
              ))}
            </div> */}
          </div>
        </div>
        <div className="user-interest">
          <span className="label">Langauges</span>
          <div className="user-interest-list trip-interest">
            <span>Test</span>
            <span>Test</span>
            <span>Test</span>

            {/* <div className="trip-interest">
              {tripDetails.interests.map((interest, index) => (
                <span key={index}>{interest}</span>
              ))}
            </div> */}
          </div>
        </div>
        <div className="user-interest">
          <span className="label">Location</span>
          <div className="user-interest-list ">
            <div>Heelo</div>
          </div>
        </div>
        <div className="user-interest">
          <span className="label">Budget Preference</span>
          <div className="user-interest-list ">
            <div>Average</div>
          </div>
        </div>
      </div>
      <button className="join-button" onClick={onJoinClick}>
        Request to Join
      </button>
    </div>
  );
}
