import "./css/NavBar.css";
import signin from "../icons/singin.svg";
import navlogo from "../icons/navlogo.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
    console.log("Clicked Sign In button");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          <img src={navlogo} alt="Logo" />
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/trips">Trips</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/about">About</Link>
        </nav>
        <button className="sign-in-button" onClick={handleSignInClick}>
          <img src={signin} alt="Signin" />
          <span>Sign In</span>
        </button>
      </div>
    </header>
  );
}
export default NavBar;
