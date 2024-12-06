import "./HiringNow.css";

import googleLogo from "../../../images/HiringNow/google.svg";
import microsoftLogo from "../../../images/HiringNow/microsoft.svg";
import flipkartIcon from "../../../images/HiringNow/flipkart.svg";
import youtubeIcon from "../../../images/HiringNow/youtube.svg";
import ibmIcon from "../../../images/HiringNow/ibm.svg";

const HiringNow = () => {
  return (
    <section className="hiring-now">
        <div className="container">
          <div className="top-section">
            <h6></h6>
            <h6>Top Companies Hiring Now</h6>
            <h6></h6>
          </div>
          <div className="bottom-section">
            <img src={googleLogo} alt="logo" />
            <img src={microsoftLogo} alt="logo" />
            <img src={flipkartIcon} alt="logo" />
            <img src={youtubeIcon} alt="logo" />
            <img src={ibmIcon} alt="logo" />
          </div>
        </div>
    </section>
  );
}
 
export default HiringNow;