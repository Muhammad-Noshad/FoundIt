import "./CreateJobPostModal.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import postedJobStore from "../../Store/postedJobStore";
import companyStore from "../../Store/companyStore";

import API from "../../API/API";
import validationSchema from "./validationSchema";

const CreateJobPostModal = ({ isModalOpen, onClose }) => {
  if (!isModalOpen) {
    return null;
  }

  const { fetchPostedJobsByCompanyId } = postedJobStore();
  const { company } = companyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    jobTitle: "",
    jobSalary: "",
    jobType: "FullTime",
    jobDescription: "",
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      values.company = company;
      const response = await API.post("/posted-job", values);
      toast.success("Job Created Successfully!");
      fetchPostedJobsByCompanyId(company?.companyId);
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <section className="create-job-post-modal modal-overlay">
      <div className="modal-content">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>Create Job Post</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({values, setFieldValue}) => (
            <div className="wrapper">
              <Form>
                <div>
                  <label htmlFor="jobTitle">Job Title:</label>
                  <Field
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    placeholder="Enter the job title"
                  />
                  <ErrorMessage name="jobTitle" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="jobSalary">Job Salary:</label>
                  <Field
                    id="jobSalary"
                    name="jobSalary"
                    type="text"
                    placeholder="Enter the job salary"
                  />
                  <ErrorMessage name="jobSalary" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="jobSalary">Job Type:</label>
                  <div role="group" aria-labelledby="jobType">
                    <Field
                      type="radio"
                      id="jobTypeFullTime"
                      name="jobType"
                      value="FullTime"
                      checked
                    />
                    <label htmlFor="jobTypeFullTime" className="button-secondary">Full Time</label>

                    <Field
                      type="radio"
                      id="jobTypePartTime"
                      name="jobType"
                      value="PartTime"
                    />
                    <label htmlFor="jobTypePartTime" className="button-secondary">Part Time</label>
                  </div>
                </div>

                <div>
                  <label htmlFor="jobDescription">Job Description:</label>
                  <ReactQuill
                    value={values.jobDescription}
                    onChange={(content) => setFieldValue("jobDescription", content)}
                  />
                  <ErrorMessage name="jobDescription" component="div" className="error" />
                </div>

                <button 
                  disabled={isSubmitting} 
                  type="submit" 
                  className={isSubmitting ? "button-primary disabled" : "button-primary"}
                >
                  Submit
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default CreateJobPostModal;