import "./FeaturedJobs.css";

import { Link } from "react-router-dom";

import Card from "../../General/Card/Card";
import postedJobStore from "../../Store/postedJobStore";

const FeaturedJobs = () => {
  const postedJobs = postedJobStore((state) => state.postedJobs);

  return (
    <section className="featured-jobs">
      <div className="container">
        <h1>Featured Jobs</h1>
        <p className="dark">Apply for jobs from the top employers.</p>
        <div className="job-cards">
          {
            postedJobs.slice(0, 3).map((value, index) =>
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
        </div>
        <Link className="link" to="/job-search">View all</Link>
      </div>
    </section>
  );
}
 
export default FeaturedJobs;