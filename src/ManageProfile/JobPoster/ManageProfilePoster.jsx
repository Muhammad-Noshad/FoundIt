import "./ManageProfilePoster.css";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import userStore from "../../Store/userStore";
import companyStore from "../../Store/companyStore";
import validationSchema from "./validationSchema";
import API from "../../API/API";

const ManageProfilePoster = () => {
  const { user } = userStore();
  const { company } = companyStore();

  const [mode, setMode] = useState("View");
  const [selectedFileName, setSelectedFileName] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: user?.password,
    companyName: company?.companyName,
    companyLocation: company?.companyLocation,
    positionInCompany: company?.positionInCompany,
    companyLogo: undefined,
  };

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    try {
      if(!values.companyLogo) {
        values.companyLogo = company.companyLogo;
      }
      console.log(values);
      toast.success("Profile Edited Successfully!")
    }
    catch(error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occured", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="manage-profile-poster container">
      <h1>Manage Profile</h1>
      <p className="dark subtitle">View and Edit your profile.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
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

            <div>
              <label htmlFor="companyName">Company Name</label>
              <Field
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                readOnly={mode === "View"}
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="companyLocation">Company Location</label>
              <Field
                type="text"
                id="companyLocation"
                name="companyLocation"
                placeholder="Enter company location"
                readOnly={mode === "View"}
              />
              <ErrorMessage
                name="companyLocation"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="positionInCompany">Position in Company</label>
              <Field
                type="text"
                id="positionInCompany"
                name="positionInCompany"
                placeholder="Enter your position in the company"
                readOnly={mode === "View"}
              />
              <ErrorMessage
                name="positionInCompany"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="companyLogo">Company Logo</label>
              <div className="company-logo-section">
                {mode === "Edit" && (
                  <div>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="companyLogo"
                      name="companyLogo"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue("companyLogo", event.target.files[0]);
                        setSelectedFileName(event.currentTarget.files[0].name);
                      }}
                      readOnly={mode === "View"}
                    />
                    <p className="dark" style={{marginBottom: "0.25em"}}>
                      Chosen File: {selectedFileName || "None"}
                    </p>
                    <label
                      htmlFor="companyLogo"
                      className="button-primary"
                      style={{
                        border: "2px solid",
                        fontWeight: "600",
                        transition: "all 0.15s ease-in-out",
                        cursor: "pointer",
                        borderRadius: "5px",
                        padding: "0.25em 1.5em",
                        textAlign: "center",
                      }}
                    >
                      Choose File
                    </label>
                    <ErrorMessage
                      name="companyLogo"
                      component="div"
                      className="error"
                    />
                  </div>
                )}
                <img 
                  src={company?.companyLogo} 
                  alt="company-logo"
                  style={{marginLeft: "auto"}}
                />
              </div>
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

export default ManageProfilePoster;
