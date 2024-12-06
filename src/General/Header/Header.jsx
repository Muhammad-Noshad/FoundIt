import "./Header.css";
import founditLogo from "../../images/icon/logo-color.svg";
import { Link, useNavigate } from "react-router-dom";
import userStore from "../../Store/userStore";
import postedJobStore from "../../Store/postedJobStore";
import jobApplicationStore from "../../Store/jobApplicationStore";
import companyStore from "../../Store/companyStore";

const Header = () => {
  const { user, setUser } = userStore();
  const setPostedJobs = postedJobStore((state) => state.setPostedJobs);
  const setJobApplications = jobApplicationStore((state) => state.setJobApplications);
  const setCompany = companyStore((state) => state.setCompany);
  
  const navigate = useNavigate();

  const logOut = () => {
    setUser(null);
    setPostedJobs([]);
    setCompany(null);
    setJobApplications(null);
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
          {
            user?.role === "JobSeeker"
            &&
            <>
            <Link to="/job-search">
            <p>Find Jobs</p>
            </Link>
            <Link to="/manage-job-applications">
              <p>Manage Job Applications</p>
            </Link>
            </>
          }
          {
            user?.role === "Employer"
            &&
            <>
            <Link to="/manage-job-posts">
            <p>Manage Job Posts</p>
            </Link>
            <Link to="/manage-job-applications">
              <p>Manage Job Applications</p>
            </Link>
            </>
          }
          <p onClick={logOut}>Log Out</p>
        </div>
      </div>
    </header>
  );
}
 
export default Header;