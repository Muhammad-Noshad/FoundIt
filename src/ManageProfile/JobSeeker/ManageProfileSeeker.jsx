import "./ManageProfileSeeker.css";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import userStore from "../../Store/userStore";

import validationSchema from "./validationSchema";
import API from "../../API/API";

const ManageProfileSeeker = () => {
  const { user, fetchUserById } = userStore();

  const [mode, setMode] = useState("View");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: user?.password,
  };

  const handleSubmit = async(values) => {
    setIsSubmitting(true);
    try {
      const userData = {
        userId: user.userId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: "JobSeeker"
      };

      const formData = new FormData();
      formData.append("user", JSON.stringify(userData));

      const response = await API.post("/user", formData);
      toast.success("Profile Edited Successfully!");
      fetchUserById(user.userId);
      console.log(userStore.getState().user);
    }
    catch(error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occured", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="manage-profile-seeker container">
      <h1>Manage Profile</h1>
      <p className="dark subtitle">View and Edit your profile.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                readOnly={mode === "View"}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                readOnly={mode === "View"}
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
                readOnly={mode === "View"}
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
                readOnly={mode === "View"}
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {mode === "View" && (
              <button
                className="button-primary"
                onClick={() => setMode("Edit")}
              >
                Edit Profile
              </button>
            )}
            {mode === "Edit" && (
              <div className="button-section">
                <button
                  disabled={isSubmitting} 
                  className={isSubmitting? "button-secondary disabled": "button-secondary"}
                  onClick={() => setMode("View")}
                >
                  Back
                </button>
                <button 
                  disabled={isSubmitting} 
                  className={isSubmitting? "button-primary disabled": "button-primary"} 
                  type="submit"
                >
                  Submit
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ManageProfileSeeker;
