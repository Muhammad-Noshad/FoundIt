import "./SignIn.css";

import signInImg from "../../images/SignIn/sign-in-1.svg";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validationSchema from "./validationSchema";
import API from "../../API/API";
import userStore from "../../Store/userStore";
import postedJobStore from "../../Store/postedJobStore";
import jobApplicationStore from "../../Store/jobApplicationStore";
import companyStore from "../../Store/companyStore";
import allUsersStore from "../../Store/allUsersStore";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);
  const { fetchPostedJobs, fetchPostedJobsByCompanyId } = postedJobStore();
  const { fetchAllUsers } = allUsersStore();
  const { setCompany } = companyStore();
  const fetchJobApplicationsByUserId = jobApplicationStore(
    (state) => state.fetchJobApplicationsByUserId
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await API.post("/auth/login", values);
      toast.success("Sign In Successful!");
      setUser(response.data);

      if (response.data.role === "JobSeeker") {
        fetchPostedJobs();
        fetchJobApplicationsByUserId(response.data.userId);
      } else if (response.data.role === "Employer") {
        fetchPostedJobsByCompanyId(response.data.company.companyId);
        setCompany(response.data.company);
      } else if (response.data.role === "Admin") {
        fetchPostedJobs();
        fetchAllUsers();
      }

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occured", error);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="sign-in container">
      <div className="shadow-wrapper">
        <h1>Login to your Account</h1>
        <p className="dark">Welcome back! Please login to continue</p>
        <div className="wrapper">
          <div className="left-section">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className={
                    isSubmitting ? "button-primary disabled" : "button-primary"
                  }
                  type="submit"
                >
                  Sign In
                </button>
                <Link className="link" to="/sign-up">
                  Don't have an account? Register Now!
                </Link>
              </Form>
            </Formik>
          </div>
          <div className="right-section">
            <img src={signInImg} alt="sign-in-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
