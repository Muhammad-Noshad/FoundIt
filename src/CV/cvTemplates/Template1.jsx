import { useLocation } from "react-router-dom";
import "../Styles/template1.css";
import generatePDF from "../JS/PdfGeneration";
import { toast } from "react-toastify";

export default function Template1() {
  const location = useLocation();
  const { userData } = location.state || {};

  console.log(userData);

  return (
    <div
      id="cv-template1-outer-container"
      className="cv-template1-outer-ontainer container"
    >
      <div className="cv-template1-personal-information">
        <h1 className="cv-template1-username">{userData.name}</h1>
        <p className="cv-template1-personal-information">{userData.address}</p>
        <p className="cv-template1-personal-information">
          {userData.contact} &#9830; {userData.email}
        </p>
      </div>
      <h3 className="cv-template1-heading">Executive Summary</h3>
      <hr />
      <p className="cv-template1-date">{userData.exectiveSummary} </p>

      {/*--------------------- EDUCAION AREA -----------------*/}
      <div>
        <h3 className="cv-template1-heading">Education</h3>
        <hr />

        {userData.educationList.map((edu, index) => (
          <>
            <div className="cv-template1-education-heading">
              <p className="cv-template1-date">
                <span className="cv-template1-bold-inner-headings">
                  {edu.educationLevel}{" "}
                </span>
                &#45; {edu.specialization}
              </p>
              <p className="cv-template1-date cv-template1-date-allign">
                {edu.dateOfCompeletion}
              </p>
            </div>
            <p className="cv-template1-date">
              <span className="cv-template1-bold-inner-headings">
                Marks&#47;CGPA&#58;
              </span>{" "}
              {edu.obtMarks}&#47;
              {edu.totalMarks}
            </p>
            <p className="cv-template1-date">{edu.instituteName}</p>
          </>
        ))}
      </div>

      {/*--------------------- Technical Skills -----------------*/}

      <div>
        {userData.skillsList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template1-heading">Technical Skills</h3>
            <hr />{" "}
          </>
        ) : null}
        <ul>
          {userData.skillsList.map((skill, index) => (
            <li className="cv-template1-date cv-template1-skills" key={index}>
              <span className="cv-template1-bold-inner-headings">
                {skill.name}&#58;
              </span>
              {skill.skills}
            </li>
          ))}
        </ul>
      </div>

      {/*--------------------- Professional Experience-----------------*/}

      <div>
        {userData.experienceList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template1-heading">Professional Experience</h3>
            <hr />
          </>
        ) : null}

        {userData.experienceList.map((exp, index) => (
          <>
            <div className="cv-template1-education-heading">
              <p className="cv-template1-date">
                <b>{exp.company}</b>
              </p>
              <p className="cv-template1-date cv-template1-date-allign">
                {exp.startDate} &#45; {exp.endDate}
              </p>
            </div>
            <p className="cv-template1-date">{exp.description}</p>
          </>
        ))}
      </div>

      {/*--------------------- Projects -----------------*/}
      <div>
        {userData.projectList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template1-heading">Projects</h3>
            <hr />
          </>
        ) : null}

        {userData.projectList.map((pro, index) => (
          <>
            <p className="cv-template1-date">
              <span className="cv-template1-project-title">{pro.name}</span>
            </p>
            <p className="cv-template1-date">
              <span className="cv-template1-bold-inner-headings">
                Technologies&#58;{" "}
              </span>
              {pro.technologies}
            </p>
            <p className="cv-template1-date cv-template1-project-description">
              Description&#58;
            </p>
            <p className="cv-template1-date">{pro.description}</p>
          </>
        ))}
      </div>

      {/*---------------- Certificates --------------- */}

      <div>
        {userData.certificateList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template1-heading">Certicates</h3>
            <hr />
          </>
        ) : null}

        {userData.certificateList.map((certificate, index) => (
          <>
            <div className="cv-template1-education-heading">
              <p className="cv-template1-date cv-template1-certificate">
                {certificate.certificateName}
              </p>
              <p className="cv-template1-date cv-template1-date-allign cv-template1-date-allign">
                {certificate.certificateEarnedDate}
              </p>
            </div>
            <p className="cv-template1-date">
              {certificate.certificateInstitute}
            </p>
          </>
        ))}
      </div>
      {/*---------------- Socila Links --------------- */}
      <div>
        {userData.linksList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template1-heading">Social Links</h3>
            <hr />
          </>
        ) : null}

        {userData.linksList.map((link, index) => (
          <>
            <p className="cv-template1-date">
              <span className="cv-template1-bold-inner-headings">
                {link.name}
              </span>
              &#58;&nbsp;
              {link.link}
            </p>
          </>
        ))}
      </div>
      <button
        className="cv-template1-downloadPDF-button"
        onClick={() => {
          document
            .querySelector(".cv-template1-downloadPDF-button")
            .classList.add("cv-template1-downloadPDF-button-remove");
          document
            .querySelector(".cv-template1-outer-ontainer")
            .classList.add("cv-template1-outerDiv");
          generatePDF(".cv-template1-outer-ontainer");

          document
            .querySelector(".cv-template1-downloadPDF-button")
            .classList.remove("cv-template1-downloadPDF-button-remove");
          document
            .querySelector(".cv-template1-outer-ontainer")
            .classList.remove("cv-template1-outerDiv");

          toast.success("CV Downloaded Successfully");
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
