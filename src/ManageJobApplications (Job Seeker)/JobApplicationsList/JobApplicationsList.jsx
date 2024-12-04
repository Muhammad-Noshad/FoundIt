import "./JobApplicationsList.css";

import JobApplicationCard from "../../General/JopApplicationCard/Card/JobApplicationCard";

const JobApplicationsList = ({ jobApplications }) => {
  return (
    <section className="job-applications-list">
      {
        jobApplications.map((value, index) => 
          <JobApplicationCard 
            applicationId={value.applicationId}
            jobTitle={value.postedJob.jobTitle} 
            jobType={value.postedJob.jobType}
            jobSalary={value.postedJob.jobSalary}
            jobDescription={value.postedJob.jobDescription}
            companyName={value.postedJob.company.companyName}
            companyLocation={value.postedJob.company.companyLocation}
            appliedDate={value.creationDate.split("T")[0]}
            cv={value.cv}
            additionalComments={value.jobSeekerComment}
            status={value.status}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default JobApplicationsList;