import "./ManageJobPostsList.css";

import ManageJobPostCard from "../../Cards/JobPoster/ManageJobPostCard/ManageJobPostCard";

const ManageJobPostsList = ({ postedJobs }) => {
  return (
    <section className="manage-job-posts-list">
      {
        postedJobs.map((value, index) => 
          <ManageJobPostCard 
            jobId={value.jobId}
            jobTitle={value.jobTitle} 
            jobType={value.jobType}
            jobSalary={value.jobSalary}
            jobDescription={value.jobDescription}
            company={value.company}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default ManageJobPostsList;