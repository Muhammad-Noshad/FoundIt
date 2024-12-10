import "./JobApplicationCard.css";

import trashImg from "../../../images/icon/trash.svg";

import { toast } from "react-toastify";
import { useState } from "react";

import JobDetailModal from "../../../Modals/JobDetailModal/JobDetailModal";
import JobApplicationDetailModal from "../../../Modals/JobApplicationDetailModal/JobApplicationDetailModal";
import ConfirmationModal from "../../../Modals/ConfirmationModal/ConfirmationModal";
import jobApplicationStore from "../../../Store/jobApplicationStore";
import userStore from "../../../Store/userStore";
import API from "../../../API/API";

const JobApplicationCard = ({ applicationId, jobTitle, jobType, jobSalary, jobDescription, companyName, companyLocation, companyLogo, appliedDate, cv, additionalComments, status}) => {
  const [isJobDetailModalOpen, setIsJobDetailModalOpen] = useState(false);
  const [isApplicationDetailModalOpen, setIsApplicationDetailModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleApplicationDeletion = async() => {
    try {
      const response = await API.delete(`/job-application/${applicationId}`);
      toast.success("Application deleted successfully!");
      jobApplicationStore.getState().fetchJobApplicationsById(userStore.getState().user.userId);
    }
    catch(error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsConfirmed(false);
  }

  if(isConfirmed) {
    handleApplicationDeletion();
  }

  return (
    <section className="job-application-card">
      <div className="top-section">
        <h6 className="job-title">{jobTitle}</h6>
        <img 
          src={trashImg} 
          className="trash" 
          alt="trash"
          onClick={() => setIsConfirmationModalOpen(true)}
        />
      </div>
      <div className="job-subtitle">
        {
          jobType === "FullTime"?
          <h6 className="job-type full-time">FULL TIME</h6>
          :
          <h6 className="job-type part-time">PART TIME</h6>
        }
        <p className="dark">Salary: {jobSalary} PKR</p>
      </div>
      <div className="application-details">
        <h6 className="applied-date">Applied on {appliedDate}</h6>
        <h6 className={status.toLowerCase()}>{status.toUpperCase()}</h6>
      </div>
      <div className="job-company-details">
        <div className="left-section">
          <img src={companyLogo} alt="logo" />  
        </div>
        <div className="right-section">
          <h6 className="job-company-name">{companyName}</h6>
          <p className="job-company-location dark">{companyLocation}</p>
        </div>
      </div>
      <div className="button-section">
        <button className="button-secondary" onClick={() => setIsJobDetailModalOpen(true)}>View Job Details</button>
        <button className="button-primary" onClick={() => setIsApplicationDetailModalOpen(true)}>View Application Details</button>
      </div>
      <JobDetailModal 
        isModalOpen={isJobDetailModalOpen}
        onClose={() => setIsJobDetailModalOpen(false)}
        jobTitle={jobTitle} 
        jobType={jobType}
        jobSalary={jobSalary}
        jobDescription={jobDescription}
        companyName={companyName}
        companyLocation={companyLocation}
        companyLogo={companyLogo}
      />
      <JobApplicationDetailModal
        isModalOpen={isApplicationDetailModalOpen}
        onClose={() => setIsApplicationDetailModalOpen(false)}
        cv={cv}
        additionalComments={additionalComments}
      />
      <ConfirmationModal
        setIsConfirmed={setIsConfirmed}
        isModalOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title={"Confirm Deletion"}
        message={"Are you sure you want to delete this Job Application?"}
      />
    </section>
  );
}
 
export default JobApplicationCard;