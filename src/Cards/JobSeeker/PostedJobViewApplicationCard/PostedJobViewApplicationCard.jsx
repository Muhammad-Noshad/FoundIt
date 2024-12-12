import "./PostedJobViewApplicationCard.css";

const PostedJobViewApplicationCard = ({ jobId, jobTitle, jobType, jobSalary, jobDescription, companyName, companyLocation, companyLogo}) => {
  return (
    <section className="posted-job-view-application-card">
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
      <button className="button-primary">View Job Applications</button>
    </section>
  );
}
 
export default PostedJobViewApplicationCard;