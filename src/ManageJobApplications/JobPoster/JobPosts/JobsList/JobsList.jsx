import "./JobsList.css";

import PostedJobViewApplicationCard from "../../../../Cards/JobSeeker/PostedJobViewApplicationCard/PostedJobViewApplicationCard";

const JobsList = ({ setMode, postedJobs }) => {
  return (
    <section className="jobs-list">
      {
        postedJobs.map((value, index) => 
          <PostedJobViewApplicationCard
            jobId={value.jobId}
            jobTitle={value.jobTitle} 
            jobType={value.jobType}
            jobSalary={value.jobSalary}
            companyName={value.company.companyName}
            companyLocation={value.company.companyLocation}
            companyLogo={value.company.companyLogo}
            setMode={setMode}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default JobsList;