import "./JobApplicationsList.css";

import ManageJobApplicationCard from "../../../../Cards/JobPoster/ManageJopApplicationCard/ManageJobApplicationCard";

const JobApplicationsList = ({ jobApplications }) => {
  return (
    <section className="job-applications-list-poster">
      {
        jobApplications.map((value, index) => 
          <ManageJobApplicationCard 
            jobId={value.postedJob.jobId}
            applicationId={value.applicationId}
            applicantName={`${value.user.firstName} ${value.user.lastName}`}
            applicantEmail={value.user.email} 
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