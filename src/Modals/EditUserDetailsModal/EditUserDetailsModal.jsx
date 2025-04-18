import "./EditUserDetailsModal.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import allUsersStore from "../../Store/allUsersStore";

import validationSchema from "./validationSchema";
import API from "../../API/API";
import { toast } from "react-toastify";

const EditUserDetailsModal = ({ isModalOpen, onClose, firstName, lastName, email, userId, role, password }) => {
  if (!isModalOpen) {
    return null;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchAllUsers } = allUsersStore();

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const userData = {
        userId: userId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: role,
        password: password,
      };

      const formData = new FormData();
      formData.append("user", JSON.stringify(userData));

      const response = await API.post("/user", formData);
      toast.success("User Details Edited Successfully!");

      fetchAllUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <section className="edit-user-details-modal modal-overlay">
      <div className="modal-content container">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>Edit User Details</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <div className="wrapper">
              <Form>
                <div>
                  <label htmlFor="firstName">First Name:</label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter the first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name:</label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter the last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter the email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={
                    isSubmitting ? "button-primary disabled" : "button-primary"
                  }
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

export default EditUserDetailsModal;
