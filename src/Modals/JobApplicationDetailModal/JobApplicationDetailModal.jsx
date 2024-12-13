import "./JobApplicationDetailModal.css";

const JobApplicationDetailModal = ({ isModalOpen, onClose, cv, additionalComments, status, employerComments }) => {
  if(!isModalOpen) {
    return null;
  }

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
      </div>
    </section>
  );
};

export default JobApplicationDetailModal;
