import JobSeekerHero from "./JobSeeker/JobSeekerHero/JobSeekerHero";
import FeaturedJobs from "./General/FeaturedJobs/FeaturedJobs";
import HiringNow from "./JobSeeker/HiringNow/HiringNow";

import JobPosterHero from "./JobPoster/JobPosterHero/JobPosterHero";

import AdminHero from "./Admin/AdminHero/AdminHero";

import userStore from "../Store/userStore";

const HomePage = () => {
  const { user } = userStore();
  return (
    <section className="home-page">
      {
        user?.role === "JobSeeker"
        &&
        <>
          <JobSeekerHero />
          <FeaturedJobs 
            title={"Featured Jobs"}
            subtitle={"Apply for jobs from the top employers."}
            linkTo={"/job-search"}
          />
          <HiringNow />
        </>
      }
      {
        user?.role === "Employer"
        &&
        <>
          <JobPosterHero />
          <FeaturedJobs 
            title={"Recent Job Posts"}
            subtitle={"These are the jobs you posted recently."}
            linkTo={"/manage-job-posts"}
          />
        </>
      }
      {
        user?.role === "Admin"
        &&
        <>
          <AdminHero />
        </>
      }
    </section>
  );
}
 
export default HomePage;