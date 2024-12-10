import "./styles/General.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
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
import ManageJobApplications from "./ManageJobApplications/JobSeeker/ManageJobApplications (JobSeeker)";
import ManageJobPosts from "./ManageJobPosts/ManageJobPosts";

function App() {
  const location = useLocation();
  const { user } = userStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [location.pathname]);

  const excludedPaths = ["/sign-in", "/sign-up", "/sign-up-seeker", "/sign-up-poster", "/404"];
  const isExcludedPath = excludedPaths.includes(location.pathname);

  return (
    <>
      {
        !isExcludedPath
        && 
        <Header />
      }
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up-seeker" element={<SignUpSeeker />} />
        <Route path="/sign-up-poster" element={<SignUpPoster />} />
        {
          user?.role === "Employer" 
            && 
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/manage-job-posts" element={<ManageJobPosts />} />
          </>
        }
        {
          user?.role === "JobSeeker" 
          &&
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/manage-job-applications" element={<ManageJobApplications />} />
          </>
        }
        {
          !user 
          &&
          <Route path="/" element={<Navigate to="/sign-in" />} />
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        !isExcludedPath
        &&
        <Footer />
      }
      <ToastContainer
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </>
  );
}

export default App;
