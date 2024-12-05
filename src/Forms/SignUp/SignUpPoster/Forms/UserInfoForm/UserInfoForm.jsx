import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import validationSchema from "./validationSchema";

const UserInfoForm = ({ userInfo, setUserInfo, setStep }) => {
  const handleSubmit = (values) => {
    setUserInfo(values);
    setStep(1);
  }

  return (
    <Formik 
      initialValues={userInfo}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          className="button-primary" 
          type="submit"
        >
          Next
        </button>
        <Link className="link" to="/sign-in">
          Already have an account? Sign In!
        </Link>
      </Form>
    </Formik>
  );
};

export default UserInfoForm;
