import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import API from "../API/API";

import userStore from "../Store/userStore";
import postedJobStore from "../Store/postedJobStore";
import jobApplicationStore from "../Store/jobApplicationStore";
import companyStore from "../Store/companyStore";
import allUsersStore from "../Store/allUsersStore";

const useVerifyUser = () => {
  const nonSignInPaths = ["/sign-in", "/sign-up", "/sign-up-poster", "/sign-up-seeker"]
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const redirectToSignInPage = () => {
    if(!nonSignInPaths.includes(location.pathname)) {
      navigate("/sign-in");
    }
  }

  useEffect(() => {
    const verifyUser = async () => {
      if(userStore.getState().user) {
        return;
      }
      
      try {
        const response = await API.get("/auth/verify");

        if (response.status !== 200) {
          redirectToSignInPage();
          return;
        }

        userStore.getState().setUser(response.data);

        if (response.data.role === "JobSeeker") {
          postedJobStore.getState().fetchPostedJobs();
          jobApplicationStore.getState().fetchJobApplicationsByUserId(response.data.userId);
        } else if (response.data.role === "Employer") {
          postedJobStore.getState().fetchPostedJobsByCompanyId(response.data.company.companyId);
          companyStore.getState().setCompany(response.data.company);
        } else if (response.data.role === "Admin") {
          postedJobStore.getState().fetchPostedJobs();
          allUsersStore.getState().fetchAllUsers();
        }

        navigate("/");
      } catch (error) {
        redirectToSignInPage();
        console.error("An error occurred:", error);
      }
    };

    verifyUser();
  }, [navigate]);
};

export default useVerifyUser;
