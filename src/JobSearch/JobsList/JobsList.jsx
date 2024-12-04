import "./JobsList.css";

import Card from "../../General/Card/Card";

const JobsList = ({ postedJobs }) => {
  return (
    <section className="jobs-list">
      {
        postedJobs.map((value, index) => 
          <Card 
            jobId={value.jobId}
            jobTitle={value.jobTitle} 
            jobType={value.jobType}
            jobSalary={value.jobSalary}
            jobDescription={value.jobDescription}
            companyName={value.company.companyName}
            companyLocation={value.company.companyLocation}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default JobsList;