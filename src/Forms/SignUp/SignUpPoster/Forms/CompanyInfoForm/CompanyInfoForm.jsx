import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import validationSchema from "./validationSchema";
import { useState } from "react";

const CompanyInfoForm = ({ companyInfo, setCompanyInfo, setStep, onSubmit, isSubmitting }) => {
  const [selectedFileName, setSelectedFileName] = useState(companyInfo.companyLogo?.name || "");

  const handleSubmit = (values) => {
    setCompanyInfo(values);
    onSubmit();
  };

  const handlePrev = (values) => {
    setCompanyInfo(values);
    setStep(0);
  };

  return (
    <Formik 
      initialValues={companyInfo} 
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="companyLocation">Company Location</label>
            <Field
              type="text"
              id="companyLocation"
              name="companyLocation"
              placeholder="Enter company location"
            />
            <ErrorMessage
              name="companyLocation"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="companyName">Company Name</label>
            <Field
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
            />
            <ErrorMessage name="companyName" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="positionInCompany">Position in Company</label>
            <Field
              type="text"
              id="positionInCompany"
              name="positionInCompany"
              placeholder="Enter your position in the company"
            />
            <ErrorMessage
              name="positionInCompany"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="companyLogo">Company Logo</label>
            <input
            style={{display: "none"}}
              type="file"
              id="companyLogo"
              name="companyLogo"
              accept="image/*"
              onChange={(event) => {
                setFieldValue("companyLogo", event.target.files[0]);
                setSelectedFileName(event.currentTarget.files[0].name);
              }}
            />
            <p className="dark">Chosen File: {selectedFileName || "None"}</p>
            <label 
              htmlFor="companyLogo" 
              className="button-primary"
              style={{
                border: "2px solid",
                fontWeight: "600",
                transition: "all 0.15s ease-in-out",
                cursor: "pointer",
                borderRadius: "5px",
                padding: "0.25em 0",
                width: "100%",
                textAlign: "center",
                marginBottom: "0.25em"
              }}
            >
              Choose File
            </label>
            <ErrorMessage name="companyLogo" component="div" className="error" />
          </div>

          <div 
            className="bottom-section" 
            style={{
              display: "flex", 
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5em"
            }}
            >
            <button
              type="button"
              disabled={isSubmitting} 
              className={isSubmitting? "button-secondary disabled": "button-secondary"} 
              onClick={() => handlePrev(values)}
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={isSubmitting} 
              className={isSubmitting? "button-primary disabled": "button-primary"} 
            >
              Submit
            </button>
          </div>
          <Link className="link" to="/sign-in">
            Already have an account? Sign In!
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyInfoForm;
