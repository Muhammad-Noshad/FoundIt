import "./ManageJobApplicationCard.css";

import { useState } from "react";

import JobApplicationDetailModal from "../../../Modals/JobApplicationDetailModal/JobApplicationDetailModal";
import ApproveRejectModal from "../../../Modals/ApproveRejectModal/ApproveRejectModal";

const ManageJobApplicationCard = ({ jobId, applicationId, applicantName, applicantEmail, appliedDate, cv, additionalComments, status, employerComments}) => {
  const [isApplicationDetailModalOpen, setIsApplicationDetailModalOpen] = useState(false);
  const [isApproveRejectModalOpen, setIsApproveRejectModalOpen] = useState(false);
  const [mode, setMode] = useState("Approve");

  return (
    <section className="manage-job-application-card">
      <h6 className="applicant-name">{applicantName}</h6>
      <p className="applicant-email dark">{applicantEmail}</p>
      <h6 className={"application-status " + status.toLowerCase()}>{status.toUpperCase()}</h6>
      <h6 className="applied-date">Applied on {appliedDate}</h6>
      <div className="button-section">
        <button className="button-primary" onClick={() => setIsApplicationDetailModalOpen(true)}>View Application Details</button>
        <div className="application-status-button-section">
          <button 
            className={status === "Approved"? "button-no disabled": "button-no"}
            disabled={status === "Approved"}
            onClick={() => {
              setMode("Approve");
              setIsApproveRejectModalOpen(true);
            }}
          >
            Approve
          </button>
          <button 
            className={status === "Rejected"? "button-yes disabled": "button-yes"}
            disabled={status === "Rejected"}
            onClick={() => {
              setMode("Reject");
              setIsApproveRejectModalOpen(true);
            }}
          >
            Reject
          </button>
        </div>
      </div>
      <JobApplicationDetailModal
        isModalOpen={isApplicationDetailModalOpen}
        onClose={() => setIsApplicationDetailModalOpen(false)}
        cv={cv}
        additionalComments={additionalComments}
        status={status}
        employerComments={employerComments}
        applicantEmail={applicantEmail}
      />
      <ApproveRejectModal
        jobId={jobId}
        isModalOpen={isApproveRejectModalOpen}
        onClose={() => setIsApproveRejectModalOpen(false)}
        applicationId={applicationId}
        mode={mode}
      />
    </section>
  );
}
 
export default ManageJobApplicationCard;