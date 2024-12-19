import "./styles/General.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import useVerifyUser from "./Hooks/useVerifyUser";
import userStore from "./Store/userStore";

import Header from "./General/Header/Header";
import Footer from "./General/Footer/Footer";
import HomePage from "./HomePage/HomePage";
import SignIn from "./Forms/SignIn/SignIn";
import SignUp from "./Forms/SignUp/SignUp";
import SignUpSeeker from "./Forms/SignUp/SignUpSeeker/SignUpSeeker";
import SignUpPoster from "./Forms/SignUp/SignUpPoster/SignUpPoster";
import NotFound from "./General/NotFound/NotFound";
import JobSearch from "./JobSearch/JobSearch";
import ManageJobApplicationsSeeker from "./ManageJobApplications/JobSeeker/ManageJobApplications (JobSeeker)";
import ManageJobApplicationsPoster from "./ManageJobApplications/JobPoster/ManageJobApplications (JobPoster)";
import ManageJobPosts from "./ManageJobPosts/ManageJobPosts";
import ManageProfilePoster from "./ManageProfile/JobPoster/ManageProfilePoster";
import ManageProfileSeeker from "./ManageProfile/JobSeeker/ManageProfileSeeker";

function App() {
  const location = useLocation();
  const { user } = userStore();
  const verifyUser = useVerifyUser();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [location.pathname]);

  const shouldShowHeaderFooter = !["/sign-in", "/sign-up", "/sign-up-seeker", "/sign-up-poster", "/404"].includes(location.pathname);

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up-seeker" element={<SignUpSeeker />} />
        <Route path="/sign-up-poster" element={<SignUpPoster />} />

        {/* Employer Routes */}
        <Route path="/" element={user?.role === "Employer" ? <HomePage /> : null} />
        <Route path="/manage-job-posts" element={user?.role === "Employer" ? <ManageJobPosts /> : null} />
        <Route path="/manage-job-applications" element={user?.role === "Employer" ? <ManageJobApplicationsPoster /> : null} />
        <Route path="/manage-profile" element={user?.role === "Employer" ? <ManageProfilePoster /> : null} />

        {/* Job Seeker Routes */}
        <Route path="/" element={user?.role === "JobSeeker" ? <HomePage /> : null} />
        <Route path="/job-search" element={user?.role === "JobSeeker" ? <JobSearch /> : null} />
        <Route path="/manage-job-applications" element={user?.role === "JobSeeker" ? <ManageJobApplicationsSeeker /> : null} />
        <Route path="/manage-profile" element={user?.role === "JobSeeker" ? <ManageProfileSeeker /> : null} />

        {/* Redirect unauthenticated users */}
        {!user && <Route path="/" element={<Navigate to="/sign-in" />} />}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {shouldShowHeaderFooter && <Footer />}
      <ToastContainer autoClose={3500} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss pauseOnHover />
    </>
  );
}

export default App;
