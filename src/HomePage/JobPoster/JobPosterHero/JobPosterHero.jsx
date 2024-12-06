import "./JobPosterHero.css";
import heroImg1 from "../../../images/Hero/hero-img-1.svg";

const JobPosterHero = () => {
  return (
    <section className="hero background-gradient">
      <div className="container">
        <div className="left-section">
          <h1>Find the right talent to drive your business forward.</h1>
          <p className="dark">Connect with skilled professionals eager to contribute to your company’s success. Whether you’re filling a critical role or expanding your team, we’ll help you discover exceptional candidates tailored to your needs.</p>
          <button className="button-primary">Find Candidates Now</button>
        </div>
        <div className="right-section">
          <img src={heroImg1} alt="hero-img-1" />
        </div>
      </div>
    </section>
  );
}
 
export default JobPosterHero;