import "./JobApplicationDetailModal.css";

import { useState } from "react";

import EmailModal from "../EmailModal/EmailModal";
import userStore from "../../Store/userStore";

const JobApplicationDetailModal = ({ isModalOpen, onClose, cv, additionalComments, status, employerComments, companyId }) => {
  if(!isModalOpen) {
    return null;
  }

  const { user } = userStore();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  return (
    <section className="job-application-detail-modal modal-overlay">
      <div className="modal-content">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>Job Application Detail</h1>
        <h6>Uploaded CV:</h6>
        <button className="button-primary" onClick={() => window.open(cv, "_blank")}>View</button>
        <h6>Your Additional Comments:</h6>
        <p>{additionalComments || "No Additional Comments Provided."}</p>
        {
          status !== "Applied"?
          <>
            <h6>Employer Comments:</h6>
            <p>{employerComments || "No Additional Comments Provided."}</p>
          </>
          :
          null
        }
        {
          user?.role === "JobSeeker"
          &&
          <button 
            className="button-primary"
            onClick={() => setIsEmailModalOpen(true)}
          >
            Email Employer
          </button>
        }
      </div>
      <EmailModal
        isModalOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        companyId={companyId}
        userEmail={user?.email}
      />
    </section>
  );
};

export default JobApplicationDetailModal;
