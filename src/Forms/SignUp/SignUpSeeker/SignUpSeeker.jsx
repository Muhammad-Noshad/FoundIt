import "./SignUpSeeker.css";

import signUpImg from "../../../images/SignIn/sign-in-1.svg";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import validationSchema from "./validationSchema";
import API from "../../../API/API";
import { toast } from "react-toastify";

const SignUpSeeker = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const onSubmit = async(values) => {
    setIsSubmitting(true);
    try {
      const response = await API.post("/auth/sign-up/job-seeker", { ...values, role: "JobSeeker" });
      toast.success("Sign Up Successful!");
    }
    catch(error) {
      console.error("An error occured", error);
      toast.error(error.response.data.name);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="sign-up-seeker">
      <h1>Create Your Account</h1>
      <p className="dark">Join us today! Please fill in the details below</p>
      <div className="wrapper">
        <div className="left-section">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button 
                disabled={isSubmitting} 
                className={isSubmitting? "button-primary disabled": "button-primary"} 
                type="submit"
              >
                Register
              </button>
              <Link className="link" to="/sign-in">Already have an account? Sign In!</Link>
            </Form>
          </Formik>
        </div>
        <div className="right-section">
          <img src={signUpImg} alt="sign-up-seeker-img" />
        </div>
      </div>
    </section>
  );
}

export default SignUpSeeker;
