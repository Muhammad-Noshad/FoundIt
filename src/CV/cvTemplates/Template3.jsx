import { useLocation } from "react-router-dom";
import "../Styles/template3.css";
import generatePDF from "../JS/PdfGeneration";
import { toast } from "react-toastify";

export default function template3() {
  const location = useLocation();
  const { userData } = location.state || {};

  console.log(userData);

  return (
    <div
      id="cv-template3-outer-container"
      className="cv-template3-outer-ontainer container"
    >
      <div className="cv-template3-personal-information">
        <h1 className="cv-template3-username">{userData.name}</h1>
        <p className="cv-template3-personal-information">{userData.address}</p>
        <p className="cv-template3-personal-information">
          {userData.contact} &#9830; {userData.email}
        </p>
      </div>
      <h3 className="cv-template3-heading">Profile</h3>

      <p className="cv-template3-date">{userData.exectiveSummary} </p>

      {/*--------------------- EDUCAION AREA -----------------*/}
      <div>
        <h3 className="cv-template3-heading">Education</h3>
        {userData.educationList.map((edu, index) => (
          <>
            <div className="cv-template3-education-heading">
              <p className="cv-template3-date">
                <span className="cv-template3-bold-inner-headings">
                  {edu.educationLevel}{" "}
                </span>
                &#45; {edu.specialization}
              </p>
              <p className="cv-template3-date cv-template3-date-allign">
                {edu.dateOfCompeletion}
              </p>
            </div>
            <p className="cv-template3-date">
              <span className="cv-template3-bold-inner-headings">
                Marks&#47;CGPA&#58;
              </span>{" "}
              {edu.obtMarks}&#47;
              {edu.totalMarks}
            </p>
            <p className="cv-template3-date">{edu.instituteName}</p>
          </>
        ))}
      </div>

      {/*--------------------- Technical Skills -----------------*/}

      <div>
        {userData.skillsList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template3-heading">Technical Skills</h3>{" "}
          </>
        ) : null}
        <ul>
          {userData.skillsList.map((skill, index) => (
            <li className="cv-template3-date cv-template3-skills" key={index}>
              <span className="cv-template3-bold-inner-headings">
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
            <h3 className="cv-template3-heading">Professional Experience</h3>
          </>
        ) : null}

        {userData.experienceList.map((exp, index) => (
          <>
            <div className="cv-template3-education-heading">
              <p className="cv-template3-date">
                <b>{exp.company}</b>
              </p>
              <p className="cv-template3-date cv-template3-date-allign">
                {exp.startDate} &#45; {exp.endDate}
              </p>
            </div>
            <p className="cv-template3-date">{exp.description}</p>
          </>
        ))}
      </div>

      {/*--------------------- Projects -----------------*/}
      <div>
        {userData.projectList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template3-heading">Projects</h3>
          </>
        ) : null}

        {userData.projectList.map((pro, index) => (
          <>
            <p className="cv-template3-date cv-template-project-name">
              <span className="cv-template3-project-title">{pro.name}</span>
            </p>
            <p className="cv-template3-date">
              <span className="cv-template3-bold-inner-headings">
                Technologies&#58;{" "}
              </span>
              {pro.technologies}
            </p>
            <p className="cv-template3-date cv-template3-project-description">
              Description&#58;
            </p>
            <p className="cv-template3-date">{pro.description}</p>
          </>
        ))}
      </div>

      {/*---------------- Certificates --------------- */}

      <div>
        {userData.certificateList.length > 0 ? (
          <>
            {" "}
            <h3 className="cv-template3-heading">Certicates</h3>
          </>
        ) : null}

        {userData.certificateList.map((certificate, index) => (
          <>
            <div className="cv-template3-education-heading">
              <p className="cv-template3-date cv-template3-certificate">
                {certificate.certificateName}
              </p>
              <p className="cv-template3-date cv-template3-date-allign cv-template3-date-allign">
                {certificate.certificateEarnedDate}
              </p>
            </div>
            <p className="cv-template3-date">
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
            <h3 className="cv-template3-heading">Social Links</h3>
          </>
        ) : null}

        {userData.linksList.map((link, index) => (
          <>
            <p className="cv-template3-date">
              <span className="cv-template3-bold-inner-headings">
                {link.name}
              </span>
              &#58;&nbsp;
              {link.link}
            </p>
          </>
        ))}
      </div>
      <button
        className="cv-template3-downloadPDF-button"
        onClick={() => {
          document
            .querySelector(".cv-template3-downloadPDF-button")
            .classList.add("cv-template3-downloadPDF-button-remove");
          document
            .querySelector(".cv-template3-outer-ontainer")
            .classList.add("cv-template3-outerDiv");
          generatePDF(".cv-template3-outer-ontainer");

          document
            .querySelector(".cv-template3-downloadPDF-button")
            .classList.remove("cv-template3-downloadPDF-button-remove");
          document
            .querySelector(".cv-template3-outer-ontainer")
            .classList.remove("cv-template3-outerDiv");

          toast.success("CV Downloaded Successfully");
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
