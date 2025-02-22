import "./JobApplyModal.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import userStore from "../../Store/userStore";
import jobApplicationStore from "../../Store/jobApplicationStore";

import validationSchema from "./validationSchema";
import API from "../../API/API";
import { toast } from "react-toastify";

const JobApplyModal = ({ isModalOpen, onClose, jobId }) => {
  if (!isModalOpen) {
    return null;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const user = userStore(state => state.user);
  const fetchJobApplicationsByUserId = jobApplicationStore(state => state.fetchJobApplicationsByUserId);

  const initialValues = {
    cv: undefined,
    additionalComments: "",
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("cv", file);
    setSelectedFileName(file.name);
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      formData.append("cv", values.cv);
      formData.append("additionalComments", values.additionalComments);
      formData.append("userId", user.userId);
      formData.append("jobId", jobId);

      const response = await API.post("/job-application", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Job Applied Successully!");
      fetchJobApplicationsByUserId(user.userId);
    } 
    catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <section className="job-apply-modal modal-overlay">
      <div className="modal-content container">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>Apply For Job</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <div className="wrapper">
              <Form>
                <div>
                  <label htmlFor="cv">Upload CV (PDF only):</label>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                  <p className="dark">Chosen File: {selectedFileName || "None"}</p>
                  <label htmlFor="cv" className="button-primary">
                    Choose File
                  </label>
                  <ErrorMessage name="cv" component="div" className="error" />
                </div>
                <div>
                  <label htmlFor="additionalComments">Additional Comments:</label>
                  <Field
                    id="additionalComments"
                    name="additionalComments"
                    as="textarea"
                    rows="4"
                    placeholder="Enter any additional comments here"
                  />
                  <ErrorMessage name="additionalComments" component="div" className="error" />
                </div>
                <button 
                  disabled={isSubmitting} 
                  type="submit" 
                  className={isSubmitting? "button-primary disabled": "button-primary"}
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

export default JobApplyModal;
