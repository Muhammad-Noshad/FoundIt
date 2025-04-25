import "./Header.css";

import founditLogo from "../../images/icon/logo-color.svg";
import downArrowImg from "../../images/icon/down-arrow.png";

import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../API/API";
import EmailModal from "../../Modals/EmailModal/EmailModal";

import userStore from "../../Store/userStore";
import postedJobStore from "../../Store/postedJobStore";
import jobApplicationStore from "../../Store/jobApplicationStore";
import companyStore from "../../Store/companyStore";
import useAPICVStore from "../../Store/cvStore";

const Header = () => {
  const dropDownRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownArrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const adminEmail = "admin@gmail.com";

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
      await API.delete("/auth/logout");

      setUser(null);
      setPostedJobs([]);
      setCompany(null);
      setJobApplications(null);
      navigate("/sign-in");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const openMenu = () => {
    menuRef.current.style.setProperty("--menu-height", "auto");
    menuRef.current.style.setProperty("--menu-pad", "4em");
    dropdownArrowRef.current.style.setProperty(
      "--drop-down-arrow-rotate",
      "180deg"
    );
  };

  const closeMenu = () => {
    menuRef.current.style.setProperty("--menu-height", "0");
    menuRef.current.style.setProperty("--menu-pad", "0");
    dropdownArrowRef.current.style.setProperty(
      "--drop-down-arrow-rotate",
      "0deg"
    );
  };

  const handleLogoClick = () => {
    if (window.innerWidth > 730) {
      navigate("/");
    } else {
      if (menuRef.current.computedStyleMap().get("height").value === 0) {
        openMenu();
      } else {
        closeMenu();
      }
    }
  };

  const handleMenuClick = (e) => {
    if (!e.target.classList.contains("dropdown")) {
      closeMenu();
    }
  };

  const fetchCV = useAPICVStore((state) => state.fetchCV);

  const handleGenerateCVClick = async (userId) => {
    console.groupCollapsed(userId);
    setIsOpen(false);
    await fetchCV(userId);
    console.log("Fetched CV:", useAPICVStore.getState().cvData);
  };

  return (
    <header>
      <div className="container">
        <div className="left-section">
          <div className="logo-section" onClick={handleLogoClick}>
            <img src={founditLogo} alt="logo" className="logo" />
            <img
              src={downArrowImg}
              alt="down-arrow"
              ref={dropdownArrowRef}
              className="icon"
            />
          </div>
        </div>
        <div
          ref={menuRef}
          className="right-section"
          onClick={(e) => handleMenuClick(e)}
        >
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
            <p className="dropdown" onClick={() => setIsOpen(!isOpen)}>
              Manage
              <img
                src={downArrowImg}
                alt="down-arrow"
                className="dropdown icon"
              />
            </p>
            {isOpen && (
              <div className="options">
                {user.role === "Admin" && (
                  <Link to="/manage-users">
                    <div onClick={() => setIsOpen(false)}>Users</div>
                  </Link>
                )}
                {user?.role !== "JobSeeker" && (
                  <Link to="/manage-job-posts">
                    <div onClick={() => setIsOpen(false)}>Job Posts</div>
                  </Link>
                )}
                <Link to="/manage-job-applications">
                  <div onClick={() => setIsOpen(false)}>Job Applications</div>
                </Link>
                {user?.role === "JobSeeker" && (
                  <Link to="/generate-CV">
                    <div
                      onClick={() =>
                        handleGenerateCVClick(userStore.getState().user.userId)
                      }
                    >
                      Generate CV
                    </div>
                  </Link>
                )}
                <Link to="/manage-profile">
                  <div onClick={() => setIsOpen(false)}>Profile</div>
                </Link>
              </div>
            )}
          </div>
          {
            user?.role !== "Admin"? 
            <p onClick={() => setIsEmailModalOpen(true)}>Contact</p>
            :
            null
          }
          <p onClick={logOut}>Log Out</p>
        </div>
      </div>
      <EmailModal
        isModalOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        userEmail={user?.email}
        toEmail={adminEmail}
      />
    </header>
  );
};

export default Header;
