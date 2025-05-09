import "./JobSearch.css";

import { useState, useEffect } from "react";
import postedJobStore from "../Store/postedJobStore";

import SearchBar from "../Filters/SearchBar/SearchBar";
import JobsList from "./JobsList/JobsList";
import JobTypeFilter from "../Filters/JobTypeFilter/JobTypeFilter";
import JobSalaryFilter from "../Filters/JobSalaryFilter/JobSalaryFilter";
import JobPersonalizationFilter from "../Filters/JobPersonalizationFilter/JobPersonalizationFilter";

const JobSearch = () => {
  const [filteredJobs, setFilteredJobs] = useState(postedJobStore.getState().postedJobs);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    let filter = postedJobStore.getState().postedJobs;

    filter = filter.filter(value => value.jobType.toLowerCase().includes(jobType.toLowerCase()));
    filter = filter.filter(value => value.company.companyName.toLowerCase().includes(companyName.toLowerCase()));    
    filter = filter.filter(value => value.company.companyLocation.toLowerCase().includes(jobLocation.toLowerCase()));
    filter = filter.filter(value => value.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()));

    if(!(minSalary === "" || maxSalary === ""))
      filter = filter.filter(value => parseFloat(value.jobSalary) >= parseFloat(minSalary) && parseFloat(value.jobSalary) <= parseFloat(maxSalary));

    setFilteredJobs(filter);
  }, [jobTitle, jobLocation, companyName, jobType, maxSalary, minSalary]);

  return (
    <section className="job-search container">
      <h1>Job Search</h1>
      <p className="dark subtitle">Search for your desired job matching skills.</p>
      <JobPersonalizationFilter
        setJobs={setFilteredJobs}
      />
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
        <JobSalaryFilter 
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        maxSalary={maxSalary}
        setMaxSalary={setMaxSalary}
        />
      </div>
      {
        filteredJobs.length?
        <JobsList postedJobs={filteredJobs} />
        :
        <p className="dark no-jobs">No jobs to show! Try changing the filters.</p>
      }
    </section>
  );
}
 
export default JobSearch;