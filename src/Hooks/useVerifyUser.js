import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../API/API";

import userStore from "../Store/userStore";
import postedJobStore from "../Store/postedJobStore";
import jobApplicationStore from "../Store/jobApplicationStore";
import companyStore from "../Store/companyStore";

const useVerifyUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if(userStore.getState().user) {
        return;
      }
      
      try {
        const response = await API.get("/auth/verify");

        if (response.status !== 200) {
          return;
        }

        userStore.getState().setUser(response.data);

        if (response.data.role === "JobSeeker") {
          postedJobStore.getState().fetchPostedJobs();
          jobApplicationStore.getState().fetchJobApplicationsByUserId(response.data.userId);
        } else if (response.data.role === "Employer") {
          postedJobStore.getState().fetchPostedJobsByCompanyId(response.data.company.companyId);
          companyStore.getState().setCompany(response.data.company);
        }

        navigate("/");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    verifyUser();
  }, [navigate]);
};

export default useVerifyUser;
