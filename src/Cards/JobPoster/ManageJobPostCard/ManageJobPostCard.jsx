import "./ManageJobPostCard.css";

import trashImg from "../../../images/icon/trash.svg";

import { useState } from "react";

import JobDetailModal from "../../../Modals/JobDetailModal/JobDetailModal";
import ConfirmationModal from "../../../Modals/ConfirmationModal/ConfirmationModal";

const ManageJobPostCard = ({ jobId, jobTitle, jobType, jobSalary, jobDescription, companyName, companyLocation, companyLogo}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleJobPostDeletion = async() => {
    try {
      // const response = await API.delete(`/job-application/${applicationId}`);
      toast.success("Application deleted successfully!");
      // jobApplicationStore.getState().fetchJobApplicationsById(userStore.getState().user.userId);
    }
    catch(error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsConfirmed(false);
  }

  if(isConfirmed) {
    handleJobPostDeletion();
  }

  return (
    <section className="manage-job-post-card">
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
        <button className="button-secondary" onClick={() => setIsDetailModalOpen(true)}>View Details</button>
        <button className="button-primary">Edit Job Post</button>
      </div>
      <JobDetailModal 
        isModalOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        jobTitle={jobTitle} 
        jobType={jobType}
        jobSalary={jobSalary}
        jobDescription={jobDescription}
        companyName={companyName}
        companyLocation={companyLocation}
        companyLogo={companyLogo}
      />
      <ConfirmationModal
        setIsConfirmed={setIsConfirmed}
        isModalOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title={"Confirm Deletion"}
        message={"Are you sure you want to delete this Job Post?"}
      />
    </section>
  );
}
 
export default ManageJobPostCard;