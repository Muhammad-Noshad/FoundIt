import JobSeekerHero from "./JobSeeker/JobSeekerHero/JobSeekerHero";
import FeaturedJobs from "./JobSeeker/FeaturedJobs/FeaturedJobs";
import HiringNow from "./JobSeeker/HiringNow/HiringNow";

import JobPosterHero from "./JobPoster/JobPosterHero/JobPosterHero";

import userStore from "../Store/userStore";

const HomePage = () => {
  const { user } = userStore();
  return (
    <section className="home-page">
      {
        user.role === "JobSeeker"
        &&
        <>
          <JobSeekerHero />
          <FeaturedJobs />
          <HiringNow />
        </>
      }
      {
        user.role === "Employer"
        &&
        <>
          <JobPosterHero />
          <FeaturedJobs />
        </>
      }
    </section>
  );
}
 
export default HomePage;