import templateImage1 from "../images/template1.png";
import templateImage2 from "../images/template2.png";
import templateImage3 from "../images/template3.png";
import Template1 from "../cvTemplates/template1";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/templates.css";

export default function Templates({ setTemplates, userData }) {
  const navigate = useNavigate();

  const serializableUserData = {
    name: userData.name,
    address: userData.address,
    contact: userData.contact,
    email: userData.email,
    linksList: userData.linksList,
    exectiveSummary: userData.exectiveSummary,
    educationList: userData.educationList,
    experienceList: userData.experienceList,
    projectList: userData.projectList,
    skillsList: userData.skillsList,
    certificateList: userData.certificateList,
  };

  console.log(serializableUserData);

  return (
    <>
      <div className="cv-template-container-outerDiv">
        <button
          className="cv-template-container-closeButton"
          onClick={() => {
            setTemplates(false);
          }}
        >
          X
        </button>

        {/*-------------- CV Templates to get the Displlay Informajtion i various Types------------------ */}

        <div className="cv-template-container-innerDiv">
          <img
            className="cv-template-container-cvTemplateImage"
            src={templateImage1}
            alt=""
          />
          <button
            className="cv-template-container-preview-button"
            onClick={() => {
              navigate("/CV-template1", {
                state: { userData: serializableUserData },
              });
            }}
          >
            Preview
          </button>
        </div>
        <div className="cv-template-container-innerDiv">
          <img
            className="cv-template-container-cvTemplateImage"
            src={templateImage2}
            alt=""
          />
          <button
            className="cv-template-container-preview-button"
            onClick={() => {
              navigate("/CV-template2", {
                state: { userData: serializableUserData },
              });
            }}
          >
            Preview
          </button>
        </div>
        <div className="cv-template-container-innerDiv">
          <img
            className="cv-template-container-cvTemplateImage"
            src={templateImage3}
            alt=""
          />
          <button
            className="cv-template-container-preview-button"
            onClick={() => {
              navigate("/CV-template3", {
                state: { userData: serializableUserData },
              });
            }}
          >
            Preview
          </button>
        </div>
      </div>
    </>
  );
}
