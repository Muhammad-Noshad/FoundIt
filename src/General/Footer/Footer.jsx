import "./Footer.css";

import logo from "../../images/icon/logo-color.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="top-section">
          <div className="left-section">
            <img src={logo} alt="logo" />
            <p className="dark">Call Now: 0354-5012350</p>
            <p className="dark">12th Street, 5th Block</p>
            <p className="dark">Lahore, Punjab, Pakistan</p>
          </div>
          <div className="right-section">
            <h6>The right place for job seekers and employers.</h6>
          </div>
        </div>
        <div className="bottom-section">
          <p className="dark">@ 2024 Foundit - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;