import "./JobApplicationsList.css";

// REMOVE THIS TEMP LOGIC
import { useState } from "react";

import JobApplicationCard from "../../../Cards/JobSeeker/JopApplicationCard/JobApplicationCard";

const JobApplicationsList = ({ jobApplications }) => {
  const tempL = []

  for(let i = 0; i < 11; i++) {
    tempL.push(...jobApplications);
  }


  const [tempList, setTempList] = useState(tempL);
  return (
    <section className="job-applications-list-seeker">
      {
        tempList?.map((value, index) => 
          <JobApplicationCard 
            applicationId={value.applicationId}
            jobTitle={value.postedJob.jobTitle} 
            jobType={value.postedJob.jobType}
            jobSalary={value.postedJob.jobSalary}
            jobDescription={value.postedJob.jobDescription}
            companyName={value.postedJob.company.companyName}
            companyLocation={value.postedJob.company.companyLocation}
            companyLogo={value.postedJob.company.companyLogo}
            companyId={value.postedJob.company.companyId}
            appliedDate={value.creationDate.split("T")[0]}
            cv={value.cv}
            additionalComments={value.jobSeekerComment}
            employerComments={value.employerComment}
            status={value.status}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default JobApplicationsList;