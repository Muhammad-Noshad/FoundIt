import "./PostedJobCard.css";

import { useState } from "react";

import JobDetailModal from "../../../Modals/JobDetailModal/JobDetailModal";
import JobApplyModal from "../../../Modals/JobApplyModal/JobApplyModal";

const PostedJobCard = ({ jobId, jobTitle, jobType, jobSalary, jobDescription, companyName, companyLocation, companyLogo}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <section className="posted-job-card">
      <h6 className="job-title">{jobTitle}</h6>
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
        <button className="button-primary" onClick={() => setIsApplyModalOpen(true)}>Apply now</button>
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
      <JobApplyModal
        isModalOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobId={jobId}
      />
    </section>
  );
}
 
export default PostedJobCard;