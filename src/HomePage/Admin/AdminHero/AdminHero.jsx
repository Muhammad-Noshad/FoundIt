import "./AdminHero.css";
import heroImg1 from "../../../images/Hero/hero-img-1.svg";

const AdminHero = () => {
  return (
    <section className="hero background-gradient">
      <div className="container">
        <div className="left-section">
          <h1>Hello, Admin!</h1>
          <p className="dark">Welcome to Foundit&apos;s Admin page!</p>
        </div>
        <div className="right-section">
          <img src={heroImg1} alt="hero-img-1" />
        </div>
      </div>
    </section>
  );
}
 
export default AdminHero;