import "./EmailModal.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

import ReactQuill from "react-quill";
import DOMPurify from "dompurify";

import API from "../../API/API";
import validationSchema from "./validationSchema";

const EmailModal = ({ isModalOpen, onClose, companyId, userEmail, toEmail }) => {
  if (!isModalOpen) {
    return null;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    subject: "",
    body: "",
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      values.body = DOMPurify.sanitize(values.body);
      values.companyId = companyId;
      values.userEmail = userEmail;
      values.toEmail = toEmail;
      const response = await API.post("/email", values);
      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <section className="email-modal modal-overlay">
      <div className="modal-content container">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>Send Email</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <div className="wrapper">
              <Form>
                <div>
                  <label htmlFor="subject">Subject:</label>
                  <Field
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Enter the subject"
                  />
                  <ErrorMessage name="subject" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="body">Body:</label>
                  <ReactQuill
                    value={values.body}
                    onChange={(content) => setFieldValue("body", content)}
                  />
                  <ErrorMessage name="body" component="div" className="error" />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={isSubmitting ? "button-primary disabled" : "button-primary"}
                >
                  Send Email
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default EmailModal;
