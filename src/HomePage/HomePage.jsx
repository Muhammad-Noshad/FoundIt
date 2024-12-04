import Hero from "./Hero/Hero";
import FeaturedJobs from "./FeaturedJobs/FeaturedJobs";
import HiringNow from "./HiringNow/HiringNow";

const HomePage = () => {
  return (
    <section className="home-page">
      <Hero />
      <FeaturedJobs />
      <HiringNow />
    </section>
  );
}
 
export default HomePage;