import "./Header.css";
import founditLogo from "../../images/icon/logo-color.svg";
import { Link, useNavigate } from "react-router-dom";
import userStore from "../../Store/userStore";
import postedJobStore from "../../Store/postedJobStore";

const Header = () => {
  const setUser = userStore((state) => state.setUser);
  const setPostedJobs = postedJobStore((state) => state.setPostedJobs);
  const navigate = useNavigate();

  const logOut = () => {
    setUser(null);
    setPostedJobs([]);
    navigate("/sign-in");
  }

  return (
    <header>
      <div className="container">
        <div className="left-section">
          <Link to="/">
            <img src={founditLogo} alt="logo" />
          </Link>
        </div>
        <div className="right-section">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/job-search">
            <p>Find Jobs</p>
          </Link>
          <Link to="/manage-job-applications">
            <p>Manage Job Applications</p>
          </Link>
          <p onClick={logOut}>Log Out</p>
        </div>
      </div>
    </header>
  );
}
 
export default Header;