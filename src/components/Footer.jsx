import logo from "../icons/Trip Partner.svg";

import "./css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src={logo} alt="Logo" className="footer-logo" />
      </div>
      <div className="footer-text">
        Trip Partner Match. All rights reserved.
      </div>
      <div className="footer-socials"> Social Media Icons </div>
    </footer>
  );
}
export default Footer;
