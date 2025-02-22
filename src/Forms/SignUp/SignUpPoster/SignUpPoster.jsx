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
    if (step === 0) {
      progressBar.current.style.setProperty("--progress", "50%");
    } else if (step === 1) {
      progressBar.current.style.setProperty("--progress", "95.5%");
    }
  }, [step]);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyLocation: "",
    positionInCompany: "",
    companyLogo: undefined,
  });

  const onSubmit = async (companyInfo) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const { companyLogo, ...otherCompanyInfo } = companyInfo;

      formData.append("companyLogo", companyLogo);

      formData.append("companyInfo", JSON.stringify(otherCompanyInfo));

      userInfo.role = "Employer";
      formData.append("userInfo", JSON.stringify(userInfo));

      const response = await API.post("/auth/sign-up/job-poster", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Sign Up Successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occured", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="sign-up-poster container">
      <div className="shadow-wrapper">
        <h6 className="progress-bar" ref={progressBar}></h6>
        <h1>Create Your Account</h1>
        <p className="dark">Join us today! Please fill in the details below</p>
        <div className="wrapper">
          <div className="left-section">
            {step === 0 && (
              <UserInfoForm
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setStep={setStep}
              />
            )}
            {step === 1 && (
              <CompanyInfoForm
                companyInfo={companyInfo}
                setCompanyInfo={setCompanyInfo}
                setStep={setStep}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
          <div className="right-section">
            <img src={signUpImg} alt="sign-up-seeker-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPoster;
