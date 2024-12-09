import "./ManageJobPostsList.css";

import ManageJobPostCard from "../ManageJobPostCard/ManageJobPostCard";

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
 
export default ManageJobPostsList;