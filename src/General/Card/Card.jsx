import "./Card.css";

import { useState } from "react";

import JobDetailModal from "../JobDetailModal/JobDetailModal";
import JobApplyModal from "../JobApplyModal/JobApplyModal";

import logo from "../../images/icon/Foundit-icon.svg"

const Card = ({ jobId, jobTitle, jobType, jobSalary, jobDescription, companyName, companyLocation, companyLogo}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <section className="card">
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
          <img src={companyLogo || logo} alt="logo" />  
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
      />
      <JobApplyModal
        isModalOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobId={jobId}
      />
    </section>
  );
}
 
export default Card;