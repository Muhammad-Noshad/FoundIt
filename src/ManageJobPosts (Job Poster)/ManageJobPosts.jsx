import "./ManageJobPosts.css";

import { useState, useEffect } from "react";
import postedJobStore from "../Store/postedJobStore";

import SearchBar from "../General/SearchBar/SearchBar";
import ManageJobPostsList from "./ManageJobPostsList/ManageJobPostsList";
import JobTypeFilter from "../JobSearch/JobTypeFilter/JobTypeFilter";
import JobSalaryFilter from "../JobSearch/SalaryFilter/JobSalaryFilter";

const ManageJobPosts = () => {
  const [filteredJobs, setFilteredJobs] = useState(postedJobStore.getState().postedJobs);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  useEffect(() => {
    let filter = postedJobStore.getState().postedJobs;

    filter = filter.filter(value => value.jobType.toLowerCase().includes(jobType.toLowerCase()));
    filter = filter.filter(value => value.company.companyLocation.toLowerCase().includes(jobLocation.toLowerCase()));
    filter = filter.filter(value => value.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()));

    if(!(minSalary === "" || maxSalary === ""))
      filter = filter.filter(value => parseFloat(value.jobSalary) >= parseFloat(minSalary) && parseFloat(value.jobSalary) <= parseFloat(maxSalary));

    setFilteredJobs(filter);
  }, [jobTitle, jobLocation, jobType, maxSalary, minSalary]);

  return (
    <section className="manage-job-posts container">
      <h1>Manage Job Posts</h1>
      <p className="dark subtitle">Manage your posted jobs.</p>
      <button className="button-primary">Create New Job Post</button>
      <SearchBar 
        values={[jobTitle, jobLocation]}
        setters={[setJobTitle, setJobLocation]}
        placeholders={["Enter Job Title", "Enter Job Location"]}
      />
      <div className="additional-filters">
        <JobTypeFilter 
          jobType={jobType} 
          setJobType={setJobType}
        />
        <JobSalaryFilter 
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        maxSalary={maxSalary}
        setMaxSalary={setMaxSalary}
        />
      </div>
      {
        filteredJobs.length?
        <ManageJobPostsList postedJobs={filteredJobs} />
        :
        <p className="dark no-jobs">No jobs to show! Try changing the filters.</p>
      }
    </section>
  );
}
 
export default ManageJobPosts;