import { useLocation } from "react-router-dom";
import "../Styles/template2.css";
import generatePDF from "../JS/PdfGeneration";

export default function template2() {
  const location = useLocation();
  const { userData } = location.state || {};

  console.log(userData);

  return (
    <div
      id="cv-template2-outer-container"
      className="cv-template2-outer-ontainer"
    >
      <div className="cv-template2-personal-information">
        <h1 className="cv-template2-username">{userData.name}</h1>
        <hr />

        <div className="cv-template2-contact-info">
          <p className="cv-template2-side-headings">Contact</p>
          <div className="cv-template2-right-side">
            <div>
              <p>
                <b>Address</b>
              </p>
              <p>
                <b>Email</b>
              </p>
              <p>
                <b>Phone</b>
              </p>
            </div>
            <div>
              {" "}
              <p className="cv-template2-personal-information">
                {userData.address}
              </p>
              <p className="cv-template2-personal-information">
                {userData.contact}
              </p>
              <p className="cv-template2-personal-information">
                {userData.email}
              </p>
            </div>
          </div>
        </div>

        <hr />
      </div>

      <div className="cv-template2-contact-info">
        <h3 className="cv-template2-heading">Statement</h3>
        <div>
          <p className="cv-template2-date">{userData.exectiveSummary} </p>
        </div>
      </div>

      <hr />

      {/*--------------------- EDUCAION AREA -----------------*/}
      <div className="cv-template2-contact-info">
        <h3 className="cv-template2-heading">Education</h3>
        <div>
          {userData.educationList.map((edu, index) => (
            <>
              <div className="cv-template2-education-heading">
                <p className="cv-template2-date">
                  <span className="cv-template2-bold-inner-headings">
                    {edu.educationLevel}{" "}
                  </span>
                  &#45; {edu.specialization}
                </p>
                <p className="cv-template2-date cv-template2-date-allign">
                  {edu.dateOfCompeletion}
                </p>
              </div>
              <p className="cv-template2-date">
                <span className="cv-template2-bold-inner-headings">
                  Marks&#47;CGPA&#58;
                </span>{" "}
                {edu.obtMarks}&#47;
                {edu.totalMarks}
              </p>
              <p className="cv-template2-date">{edu.instituteName}</p>
            </>
          ))}
        </div>
      </div>

      <hr />
      {/*--------------------- Technical Skills -----------------*/}

      <div className="cv-template2-contact-info">
        {userData.skillsList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template2-heading">Technical Skills</h3>
          </>
        ) : null}

        <div>
          <ul>
            {userData.skillsList.map((skill, index) => (
              <li className="cv-template2-date cv-template2-skills" key={index}>
                <span className="cv-template2-bold-inner-headings">
                  {skill.name}&#58;
                </span>
                {skill.skills}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {userData.skillsList.length > 0 ? (
        <>
          {" "}
          <hr />
        </>
      ) : null}
      {/*--------------------- Professional Experience-----------------*/}

      <div className="cv-template2-contact-info">
        {userData.experienceList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template2-heading">Professional Experience</h3>
          </>
        ) : null}
        <div>
          {userData.experienceList.map((exp, index) => (
            <>
              <div className="cv-template2-education-heading">
                <p className="cv-template2-date">
                  <b>{exp.company}</b>
                </p>
                <p className="cv-template2-date cv-template2-date-allign">
                  {exp.startDate} &#45; {exp.endDate}
                </p>
              </div>
              <p className="cv-template2-date">{exp.description}</p>
            </>
          ))}
        </div>
      </div>

      {userData.experienceList.length > 0 ? (
        <>
          {" "}
          <hr />
        </>
      ) : null}
      {/*--------------------- Projects -----------------*/}
      <div className="cv-template2-contact-info">
        {userData.projectList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template2-heading">Projects</h3>
          </>
        ) : null}
        <div>
          {userData.projectList.map((pro, index) => (
            <>
              <p className="cv-template2-date cv-template2-project-Name">
                <span className="cv-template2-project-title">{pro.name}</span>
              </p>
              <p className="cv-template2-date">
                <span className="cv-template2-bold-inner-headings">
                  Technologies&#58;{" "}
                </span>
                {pro.technologies}
              </p>
              <p className="cv-template2-date cv-template2-project-description">
                Description&#58;
              </p>
              <p className="cv-template2-date">{pro.description}</p>
            </>
          ))}
        </div>
      </div>

      {userData.projectList.length > 0 ? (
        <>
          {" "}
          <hr />
        </>
      ) : null}
      {/*---------------- Certificates --------------- */}

      <div className="cv-template2-contact-info">
        {userData.certificateList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template2-heading">Certicates</h3>
          </>
        ) : null}
        <div>
          {userData.certificateList.map((certificate, index) => (
            <>
              <div className="cv-template2-education-heading">
                <p className="cv-template2-date cv-template2-certificate">
                  {certificate.certificateName}
                </p>
                <p className="cv-template2-date cv-template2-date-allign cv-template2-date-allign">
                  {certificate.certificateEarnedDate}
                </p>
              </div>
              <p className="cv-template2-date">
                {certificate.certificateInstitute}
              </p>
            </>
          ))}
        </div>
      </div>

      {userData.certificateList.length > 0 ? (
        <>
          {" "}
          <hr />
        </>
      ) : null}

      {/*---------------- Socila Links --------------- */}
      <div className="cv-template2-contact-info">
        {userData.linksList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template2-heading">Social Links</h3>
          </>
        ) : null}
        <div>
          {userData.linksList.map((link, index) => (
            <>
              <p className="cv-template2-date">
                <span className="cv-template2-bold-inner-headings">
                  {link.name}
                </span>
                &#58;&nbsp;
                {link.link}
              </p>
            </>
          ))}
        </div>
      </div>
      <button
        className="cv-template2-downloadPDF-button"
        onClick={() => {
          document
            .querySelector(".cv-template2-downloadPDF-button")
            .classList.add("cv-template2-downloadPDF-button-remove");
          document
            .querySelector(".cv-template2-outer-ontainer")
            .classList.add("cv-template2-outerDiv");
          generatePDF(".cv-template2-outer-ontainer");

          document
            .querySelector(".cv-template2-downloadPDF-button")
            .classList.remove("cv-template2-downloadPDF-button-remove");
          document
            .querySelector(".cv-template2-outer-ontainer")
            .classList.remove("cv-template2-outerDiv");
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
