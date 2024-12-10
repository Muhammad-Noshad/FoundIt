import "./FeaturedJobs.css";

import { Link } from "react-router-dom";

import PostedJobCard from "../../../Cards/JobSeeker/PostedJobCard/PostedJobCard";
import postedJobStore from "../../../Store/postedJobStore";

const FeaturedJobs = ({ title, subtitle, linkTo }) => {
  const postedJobs = postedJobStore((state) => state.postedJobs);

  return (
    <section className="featured-jobs">
      <div className="container">
        <h1>{title}</h1>
        <p className="dark">{subtitle}</p>
        <div className="job-cards">
          {
            postedJobs.slice(0, 3).map((value, index) =>
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
        </div>
        <Link className="link" to={linkTo}>View all</Link>
      </div>
    </section>
  );
}
 
export default FeaturedJobs;