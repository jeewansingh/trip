import "./css/ProfileCard.css";

export default function ProfileCard({
  onJoinClick,
  userImage,
  join_request,
  same_creator,
  name,
  gender,
  dob,
  location,
  about,
  interests = [],
  budget,
}) {
  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="profile-card">
      <div className="trip-details">About Trip Creator</div>
      <div className="user-details">
        <img className="user-details-image" src={userImage} alt="User" />
        <div className="user-details-name">{name}</div>
        {/* <div className="user-details-age">
          {calculateAge(dob)},{gender}
        </div> */}
        <div className="user-details-age">
          {dob}, {gender}
        </div>

        <div className="user-details-about">{about}</div>

        <div className="user-interest">
          <span className="label">Interests</span>
          <div className="user-interest-list">
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <span key={index}>{interest}</span>
              ))
            ) : (
              <span>No interests specified</span>
            )}
          </div>
        </div>

        <div className="user-interest">
          <span className="label">Location</span>
          <div className="user-interest-list">
            <div>{location}</div>
          </div>
        </div>

        <div className="user-interest">
          <span className="label">Budget Preference</span>
          <div className="user-interest-list">
            <div>{budget}</div>
          </div>
        </div>
      </div>

      {same_creator === 1 ? (
        <button className="join-button" disabled>
          You created this
        </button>
      ) : join_request === 1 ? (
        <button className="join-button" disabled>
          Request Sent
        </button>
      ) : (
        <button className="join-button" onClick={onJoinClick}>
          Request to Join
        </button>
      )}
    </div>
  );
}
