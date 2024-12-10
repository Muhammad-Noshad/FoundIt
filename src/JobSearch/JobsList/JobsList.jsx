import "./JobsList.css";

import PostedJobCard from "../../Cards/JobSeeker/PostedJobCard/PostedJobCard";

const JobsList = ({ postedJobs }) => {
  return (
    <section className="jobs-list">
      {
        postedJobs.map((value, index) => 
          <PostedJobCard
            jobId={value.jobId}
            jobTitle={value.jobTitle} 
            jobType={value.jobType}
            jobSalary={value.jobSalary}
            jobDescription={value.jobDescription}
            companyName={value.company.companyName}
            companyLocation={value.company.companyLocation}
            companyLogo={value.company.companyLogo}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default JobsList;