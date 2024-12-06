import "./JobDetailModal.css";

import companyStore from "../../Store/companyStore";

import logo from "../../images/icon/Foundit-icon.svg";

const JobDetailModal = ({ isModalOpen, onClose, jobTitle, jobType, jobSalary, jobDescription, companyName, companyLocation }) => {
  if(!isModalOpen) {
    return null;
  }

  const { company } = companyStore();

  return (
    <section className="job-detail-modal modal-overlay">
      <div className="modal-content">
        <p className="dark modal-cross" onClick={onClose}> &times; </p>
        <h1 className="job-title">{jobTitle}</h1>
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
            <img src={company?.companyLogo || logo} alt="logo" />  
          </div>
          <div className="right-section">
            <h6 className="job-company-name">{companyName}</h6>
            <p className="job-company-location dark">{companyLocation}</p>
          </div>
        </div>
        <p className="job-description">{jobDescription}</p>
      </div>
    </section>
  );
}
 
export default JobDetailModal;