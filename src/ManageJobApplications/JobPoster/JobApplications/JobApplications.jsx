import "./JobApplications.css";

import { useState, useEffect } from "react";
import jobApplicationStore from "../../../Store/jobApplicationStore";

import JobApplicationsList from "./JobApplicationsList/JobApplicationsList";
import SearchBar from "../../../Filters/SearchBar/SearchBar";
import ApplicationStatusFilter from "../../../Filters/ApplicationStatusFilter/ApplicationStatusFilter";

const JobApplications = ({ setMode }) => {
  const { jobApplications } = jobApplicationStore();
  const [filteredJobApplications, setFilteredJobApplications] = useState(jobApplications);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");

  useEffect(() => {
    let filter = jobApplicationStore.getState().jobApplications;

    filter = filter?.filter(value => value.status.toLowerCase().includes(applicationStatus.toLowerCase()));
    filter = filter?.filter(value => value.postedJob.company.companyName.toLowerCase().includes(companyName.toLowerCase()));    
    filter = filter?.filter(value => value.postedJob.company.companyLocation.toLowerCase().includes(jobLocation.toLowerCase()));
    filter = filter?.filter(value => value.postedJob.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()));

    setFilteredJobApplications(filter);
  }, [jobTitle, jobLocation, companyName, applicationStatus, jobApplications]);

  const handleBackToJobPosts = () => {
    setMode("JobPosts")
  }

  return (
    <section className="job-applications container">
      <SearchBar 
        values={[jobTitle, jobLocation, companyName]}
        setters={[setJobTitle, setJobLocation, setCompanyName]}
        placeholders={["Enter Job Title", "Enter Job Location", "Enter Company Name"]}
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