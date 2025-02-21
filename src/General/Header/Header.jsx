import "./Header.css";

import founditLogo from "../../images/icon/logo-color.svg";
import downArrowImg from "../../images/icon/down-arrow.png";

import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../API/API";

import userStore from "../../Store/userStore";
import postedJobStore from "../../Store/postedJobStore";
import jobApplicationStore from "../../Store/jobApplicationStore";
import companyStore from "../../Store/companyStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = userStore();
  const setPostedJobs = postedJobStore((state) => state.setPostedJobs);
  const setJobApplications = jobApplicationStore(
    (state) => state.setJobApplications
  );
  const setCompany = companyStore((state) => state.setCompany);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = async () => {
    try {
      const response = await API.delete("/auth/logout");

      setUser(null);
      setPostedJobs([]);
      setCompany(null);
      setJobApplications(null);
      navigate("/sign-in");
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  const handleLogoClick = () => {
    if(window.innerWidth > 730) {
      navigate("/");
    }
    else {
      if(menuRef.current.computedStyleMap().get("height").value === 0) {
        menuRef.current.style.setProperty("--menu-height", "auto");
        menuRef.current.style.setProperty("--menu-pad", "4em");
      }
      else {
        menuRef.current.style.setProperty("--menu-height", "0");
        menuRef.current.style.setProperty("--menu-pad", "0");
      }
    }
  }

  return (
    <header>
      <div className="container">
        <div className="left-section">
          <div className="logo-section" onClick={handleLogoClick}>
            <img src={founditLogo} alt="logo" />
          </div>
        </div>
        <div ref={menuRef} className="right-section">
          <Link to="/">
            <p>Home</p>
          </Link>
          {user?.role === "JobSeeker" && (
            <>
              <Link to="/job-search">
                <p>Find Jobs</p>
              </Link>
            </>
          )}
          <div
            className={`custom-dropdown ${isOpen ? "active" : ""}`}
            ref={dropDownRef}
          >
            <p className="selected" onClick={() => setIsOpen(!isOpen)}>
              Manage
              <img src={downArrowImg} alt="down-arrow" className="icon" />
            </p>
            {isOpen && (
              <div className="options">
                {user?.role === "Employer" && (
                  <Link to="/manage-job-posts">
                    <div onClick={() => setIsOpen(false)}>Job Posts</div>
                  </Link>
                )}
                <Link to="/manage-job-applications">
                  <div onClick={() => setIsOpen(false)}>Job Applications</div>
                </Link>
                <Link to="/manage-profile">
                  <div onClick={() => setIsOpen(false)}>Profile</div>
                </Link>
              </div>
            )}
          </div>
          <p onClick={logOut}>Log Out</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
