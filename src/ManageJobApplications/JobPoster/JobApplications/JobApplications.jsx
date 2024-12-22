import "./JobApplications.css";

import { useState, useEffect } from "react";
import jobApplicationStore from "../../../Store/jobApplicationStore";

import JobApplicationsList from "./JobApplicationsList/JobApplicationsList";
import SearchBar from "../../../Filters/SearchBar/SearchBar";
import ApplicationStatusFilter from "../../../Filters/ApplicationStatusFilter/ApplicationStatusFilter";

const JobApplications = ({ setMode }) => {
  const { jobApplications } = jobApplicationStore();
  const [filteredJobApplications, setFilteredJobApplications] = useState(jobApplications);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");

  useEffect(() => {
    let filter = jobApplicationStore.getState().jobApplications;

    filter = filter?.filter(value => value.status.toLowerCase().includes(applicationStatus.toLowerCase()));
    filter = filter?.filter(value => `${value.user.firstName} ${value.user.lastName}`.toLowerCase().includes(applicantName.toLowerCase()));    
    filter = filter?.filter(value => value.user.email.toLowerCase().includes(applicantEmail.toLowerCase()));

    setFilteredJobApplications(filter);
  }, [applicantName, applicantEmail, applicationStatus, jobApplications]);

  const handleBackToJobPosts = () => {
    setMode("JobPosts")
  }

  return (
    <section className="job-applications container">
      <SearchBar 
        values={[applicantName, applicantEmail]}
        setters={[setApplicantName, setApplicantEmail]}
        placeholders={["Enter Applicant Name", "Enter Applicant Email"]}
      />
      <div className="additional-filters">
        <ApplicationStatusFilter 
          applicationStatus={applicationStatus}
          setApplicationStatus={setApplicationStatus}
        />
        <button 
          className="button-primary"
          onClick={handleBackToJobPosts}
        >
          Back to Job Posts
        </button>
      </div>
      {
        filteredJobApplications.length?
        <JobApplicationsList jobApplications={filteredJobApplications} />
        :
        <p className="dark no-job-applications">No job applications to show!</p>
      }
    </section>
  );
}
 
export default JobApplications;