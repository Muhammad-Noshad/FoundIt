import "./FeaturedJobs.css";

import { Link } from "react-router-dom";

import PostedJobCard from "../../../Cards/JobSeeker/PostedJobCard/PostedJobCard";
import postedJobStore from "../../../Store/postedJobStore";
import ManageJobPostCard from "../../../Cards/JobPoster/ManageJobPostCard/ManageJobPostCard";
import userStore from "../../../Store/userStore";

const FeaturedJobs = ({ title, subtitle, linkTo }) => {
  const postedJobs = postedJobStore((state) => state.postedJobs);
  const user = userStore((state) => state.user);

  return (
    <section className="featured-jobs">
      <div className="container">
        <h1>{title}</h1>
        <p className="dark">{subtitle}</p>
        <div className="job-cards">
          {
            postedJobs.length?
            postedJobs.slice(0, 3).map((value, index) => {
              if(user?.role === "Employer") {
                return (
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
              else if(user?.role === "JobSeeker") {
                return (
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
            }
            )
            :
            <p className="dark no-jobs">No jobs to show!</p>
          }
        </div>
        <Link className="link" to={linkTo}>View all</Link>
      </div>
    </section>
  );
}
 
export default FeaturedJobs;