import "./JobApplicationsList.css";

import JobApplicationCard from "../../../Cards/JobSeeker/JopApplicationCard/JobApplicationCard";

const JobApplicationsList = ({ jobApplications }) => {
  return (
    <section className="job-applications-list-seeker">
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
            companyLogo={value.postedJob.company.companyLogo}
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