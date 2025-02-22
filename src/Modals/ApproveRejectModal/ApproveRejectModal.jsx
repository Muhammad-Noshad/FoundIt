import "./ApproveRejectModal.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import validationSchema from "./validationSchema";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

import jobApplicationStore from "../../Store/jobApplicationStore";
import API from "../../API/API";

const ApproveRejectModal = ({ isModalOpen, onClose, applicationId, mode, jobId }) => {
  if (!isModalOpen) {
    return null;
  }

  const { fetchJobApplicationsByPostId } = jobApplicationStore();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState("");

  const initialValues = {
    additionalComments: "",
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if(mode === "Approve") {
        values.applicationStatus = "Approved";
      }
      else if(mode === "Reject") {
        values.applicationStatus = "Rejected";
      }
      values.jobApplicationId = applicationId;

      const response = await API.post("/job-application/update-status", values);
      fetchJobApplicationsByPostId(jobId);
      if(mode === "Approve") {
        toast.success("Job Application Approved Successully!");
      }
      else if(mode === "Reject") {
        toast.success("Job Application Rejected Successully!");
      }
    } 
    catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsSubmitting(false);
    onClose();
  };

  useEffect(() => {
    if(isConfirmed) {
      onSubmit(values)
    }
  }, [isConfirmed])

  return (
    <section className="approve-reject-modal modal-overlay">
      <div className="modal-content container">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>
          { mode === "Approve" && "Job Application Approval" }
          { mode === "Reject" && "Job Application Rejection" }
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <div className="wrapper">
              <Form>
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
                  type="button" 
                  onClick={() => { setValues(values); setIsConfirmationModalOpen(true); }}
                  className={isSubmitting? "button-primary disabled": "button-primary"}
                >
                  { mode }
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <ConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        title={mode === "Approve"? "Approval Confirmation": "Rejection Confirmation"}
        message={mode === "Approve"? "Are you sure you want to approve this application?": "Are you sure you want to reject this application?"}
        setIsConfirmed={setIsConfirmed}
        onClose={() => setIsConfirmationModalOpen(false)}
      />
    </section>
  );
};

export default ApproveRejectModal;
