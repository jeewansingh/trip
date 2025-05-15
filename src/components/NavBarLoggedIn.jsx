import "./css/NavBar.css";
import profile from "../icons/profile.svg";
import navlogo from "../icons/navlogo.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function NavBarLoggedIn() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
    // console.log("Clicked Profile button");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="nav-logo">
          <img src={navlogo} alt="Logo" />
        </Link>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/trips">Trips</Link>
          <Link to="/destinations">Destinations</Link>
          {/* <Link to="/about">About</Link> */}
        </nav>
        <div className="nav-profile" onClick={handleProfileClick}>
          <img src={profile} alt="profile" />
        </div>
      </div>
    </header>
  );
}
export default NavBarLoggedIn;
