import "./Hero.css";
import heroImg1 from "../../images/Hero/hero-img-1.svg";

const Hero = () => {
  return (
    <section className="hero background-gradient">
      <div className="container">
        <div className="left-section">
          <h1>Find a job that aligns with your interests and skills.</h1>
          <p className="dark">Discover thousands of opportunities tailored to your skills, aspirations, and career goals. Whether you're starting fresh or taking the next big step, we’re here to connect you with the perfect role.</p>
          <button className="button-primary">Find Jobs Now</button>
        </div>
        <div className="right-section">
          <img src={heroImg1} alt="hero-img-1" />
        </div>
      </div>
    </section>
  );
}
 
export default Hero;