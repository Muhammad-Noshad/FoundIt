import "./ManageJobApplications (JobSeeker).css";

import { useState, useEffect } from "react";
import jobApplicationStore from "../../Store/jobApplicationStore";

import JobApplicationsList from "./JobApplicationsList/JobApplicationsList";
import SearchBar from "../../Filters/SearchBar/SearchBar";
import JobTypeFilter from "../../Filters/JobTypeFilter/JobTypeFilter";
import JobSalaryFilter from "../../Filters/JobSalaryFilter/JobSalaryFilter";
import ApplicationStatusFilter from "../../Filters/ApplicationStatusFilter/ApplicationStatusFilter";

const ManageJobApplicationsSeeker = () => {
  const { jobApplications } = jobApplicationStore();
  const [filteredJobApplications, setFilteredJobApplications] = useState(jobApplications);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");

  useEffect(() => {
    let filter = jobApplicationStore.getState().jobApplications;

    filter = filter?.filter(value => value.postedJob.jobType.toLowerCase().includes(jobType.toLowerCase()));
    filter = filter?.filter(value => value.status.toLowerCase().includes(applicationStatus.toLowerCase()));
    filter = filter?.filter(value => value.postedJob.company.companyName.toLowerCase().includes(companyName.toLowerCase()));    
    filter = filter?.filter(value => value.postedJob.company.companyLocation.toLowerCase().includes(jobLocation.toLowerCase()));
    filter = filter?.filter(value => value.postedJob.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()));

    if(!(minSalary === "" || maxSalary === ""))
      filter = filter?.filter(value => parseFloat(value.postedJob.jobSalary) >= parseFloat(minSalary) && parseFloat(value.postedJob.jobSalary) <= parseFloat(maxSalary));

    setFilteredJobApplications(filter);
  }, [jobTitle, jobLocation, companyName, jobType, maxSalary, minSalary, applicationStatus, jobApplications]);


  return (
    <section className="manage-job-applications container">
      <h1>Manage Job Applications</h1>
      <p className="dark subtitle">Manage your Job Applications.</p>
      <SearchBar 
        values={[jobTitle, jobLocation, companyName]}
        setters={[setJobTitle, setJobLocation, setCompanyName]}
        placeholders={["Enter Job Title", "Enter Job Location", "Enter Company Name"]}
      />
      <div className="additional-filters">
        <JobTypeFilter 
          jobType={jobType} 
          setJobType={setJobType}
        />
        <ApplicationStatusFilter 
          applicationStatus={applicationStatus}
          setApplicationStatus={setApplicationStatus}
        />
        <JobSalaryFilter 
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        maxSalary={maxSalary}
        setMaxSalary={setMaxSalary}
        />
      </div>
      {
        filteredJobApplications.length?
        <JobApplicationsList jobApplications={filteredJobApplications} />
        :
        <p className="dark no-job-applications">No job applications to show! Try changing search filters or applying for a job.</p>
      }
    </section>
  );
}
 
export default ManageJobApplicationsSeeker;