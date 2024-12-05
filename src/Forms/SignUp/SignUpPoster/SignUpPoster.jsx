import "./SignUpPoster.css";

import signUpImg from "../../../images/SignIn/sign-in-1.svg";

import { useState, useRef, useEffect } from "react";
import API from "../../../API/API";
import { toast } from "react-toastify";
import UserInfoForm from "./Forms/UserInfoForm/UserInfoForm";
import CompanyInfoForm from "./Forms/CompanyInfoForm/CompanyInfoForm";

const SignUpPoster = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const progressBar = useRef(null);

  useEffect(() => {
    if(step === 0) {
      progressBar.current.style.setProperty("--progress", "50%");
    }
    else if(step === 1) {
      progressBar.current.style.setProperty("--progress", "95.5%");
    }
  }, [step]);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    companyLocation: '',
    positionInCompany: '',
    companyLogo: undefined
  });

  const onSubmit = async() => {
    setIsSubmitting(true);
    try {
      Object.entries(userDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      Object.entries(companyDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await API.post("/job-application", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Sign Up Successful!");
    }
    catch(error) {
      toast.error(error.response.data.name);
      console.log("An error occured", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="sign-up-poster">
      <h6 className="progress-bar" ref={progressBar}></h6>
      <h1>Create Your Account</h1>
      <p className="dark">Join us today! Please fill in the details below</p>
      <div className="wrapper">
        <div className="left-section">
          {
            step === 0 
            &&
            <UserInfoForm 
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setStep={setStep}
            />
          }
          {
            step === 1
            &&
            <CompanyInfoForm
              companyInfo={companyInfo}
              setCompanyInfo={setCompanyInfo}
              setStep={setStep}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          }
        </div>
        <div className="right-section">
          <img src={signUpImg} alt="sign-up-seeker-img" />
        </div>
      </div>
    </section>
  );
}

export default SignUpPoster;
