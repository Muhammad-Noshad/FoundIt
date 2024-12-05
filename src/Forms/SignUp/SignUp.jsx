import "./SignUp.css";

import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="sign-up container">
      <div className="wrapper">
        <h1>Sign Up</h1>
        <p className="dark">Who do you want to sign up as?</p>
        <Link to="/sign-up-seeker">
          <button className="button-primary">
            Sign Up as Job Seeker
          </button>
        </Link>
        <div className="divider">
              <h6></h6>
              <h6>Or</h6>
              <h6></h6>
            </div>
        <Link to="/sign-up-poster">
          <button className="button-primary">
            Sign Up as Job Poster
          </button>
        </Link>
        <Link className="link" to="/sign-in">Already have an account? Sign In!</Link>
      </div>
    </section>
  );
}
 
export default SignUp;