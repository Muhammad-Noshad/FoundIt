import { useEffect, useRef, useState } from "react";
import Education from "./component/Education";
import Project from "./component/Project";
import SocialLinks from "./component/SocialLinks";
import Experience from "./component/Experience";
import Skills from "./component/Skills";
import useCVStore from "./store/store";
import { v4 as uuidv4 } from "uuid";
import Certificate from "./component/Certificate";
import Templates from "./component/Templates.jsx";
import userStore from "../Store/userStore";
import useAPICVStore from "../Store/cvStore";
import { RxUpdate } from "react-icons/rx";
import "./Styles/CV.css";
import { toast } from "react-toastify";

export default function CV() {
  const [getUserData, setUserdata] = useState();

  const {
    educationList,
    addEducation,
    setEducation,
    removeEducation,
    projectList,
    addProject,
    setProject,
    removeProject,
    linksList,
    addLink,
    setLink,
    removeLink,
    experienceList,
    addExperience,
    setExperience,
    removeExperience,
    skillsList,
    addSkill,
    setSkill,
    removeSkill,
    certificateList,
    addCertificate,
    setCertificate,
    removeCertificate,
  } = useCVStore();

  //References to stores the values of the inputs
  const name = useRef("");
  const address = useRef("");
  const contact = useRef("");
  const email = useRef("");
  const linkName = useRef("");
  const link = useRef("");
  const exectiveSummary = useRef("");
  const educationLevel = useRef("");
  const specialization = useRef("");
  const instituteName = useRef("");
  const obtMarks = useRef(0);
  const totalMarks = useRef(0);
  const dateOfCompeletion = useRef("");
  const experienceCompany = useRef("");
  const startExperienceDate = useRef("");
  const endExperienceDate = useRef("");
  const experienceDescription = useRef("");
  const projectName = useRef("");
  const technologies = useRef("");
  const projectDescription = useRef("");
  const skillName = useRef(null);
  const skills = useRef(null);
  const certificateName = useRef(null);
  const certificateInstitute = useRef(null);
  const certificateEarnedDate = useRef(null);

  //Validation Functions

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactRegex = /^[0-9]{11}$/; // Only 13 digits for contact number
    const message = document.querySelector(".cv-view-message");

    if (!fetchedUser) {
      message.textContent = "CV for the User has not been Created.";
      message.classList.add("cv-error");
      return;
    }

    // Check if fields are empty (excluding experience, projects, certificates, and social links)
    if (
      !name.current.value ||
      !address.current.value ||
      !contact.current.value ||
      !email.current.value ||
      !exectiveSummary.current.value ||
      educationList.length === 0
    ) {
      message.textContent = "Education is Required.";
      message.classList.add("cv-error");
      return false;
    }

    // Check if the email format is valid
    if (!emailRegex.test(email.current.value)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Check if contact number is 13 digits and only numbers
    if (!contactRegex.test(contact.current.value)) {
      alert("Please enter a valid 13-digit phone number.");
      return false;
    }

    // If all checks pass
    setTemplates(true);
    return true;
  };

  //Function to get the user data

  function UserData() {
    //validateForm to ensure validation before proceeding
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: name.current.value,
      address: address.current.value,
      contact: contact.current.value,
      email: email.current.value,
      linksList: linksList,
      exectiveSummary: exectiveSummary.current.value,
      educationList: educationList,
      experienceList: experienceList,
      projectList: projectList,
      skillsList: skillsList,
      certificateList: certificateList,
    };

    setUserdata(userData);
    return userData;
  }

  const [getTemplates, setTemplates] = useState(false);

  //----------------- Function to Create a CV ---------------------
  const {
    createCV,
    fetchCV,
    addSocialLinks,
    addEducationObj,
    addExperienceObj,
    addCertificateObj,
    addProjectObj,
    addSkillsToCV,
    updateCvName,
    updateCvAddress,
    updateCvPhone,
    updateCvEmail,
    updateCvSummary,
  } = useAPICVStore();

  //------------------ Craeting the CV -----------------------

  const handleClick = () => {
    createCV({
      name: name.current.value,
      userId: userStore.getState().user.userId,
      address: address.current.value,
      executiveSummary: exectiveSummary.current.value,
      email: email.current.value,
      phone: contact.current.value,
    });
  };

  //------------------ Function to Add Links ---------------------

  const handleAddSocials = (socialLinKObj) => {
    const cvID = userStore.getState().user.userId;

    addSocialLinks({
      cvID,
      socials: [
        {
          linkName: socialLinKObj.name,
          linkAddress: socialLinKObj.link,
        },
      ],
    });
  };

  //--------------------- Function to Add Education --------------------

  const handleAddEducation = (educationObj) => {
    addEducationObj({
      cvID: userStore.getState().user.userId,
      education: [
        {
          educationLevel: educationObj.educationLevel,
          degreeName: educationObj.specialization,
          specialization: educationObj.specialization,
          institute: educationObj.instituteName,
          obtainedMarks: Number(educationObj.obtMarks),
          totalMarks: Number(educationObj.totalMarks),
          dateOfCompletion: new Date(educationObj.dateOfCompeletion),
        },
      ],
    });
  };

  //-------------------- Function to Add Experience -----------------

  const handleAddExperience = (experienceObj) => {
    addExperienceObj({
      cvID: userStore.getState().user.userId,
      experience: [
        {
          companyName: experienceObj.company,
          role: experienceObj.description,
          fromDate: new Date(experienceObj.startDate),
          toDate: new Date(experienceObj.endDate),
        },
      ],
    });
  };

  //--------------------- Function to Add Projects ---------------------
  const handleAddProjects = (projectObj) => {
    addProjectObj({
      cvID: userStore.getState().user.userId,
      projects: [
        {
          projectName: projectObj.name,
          technologiesUsed: projectObj.technologies,
          description: projectObj.description,
        },
      ],
    });
  };

  //-------------------- Function to add Certificates ----------------------

  const handleAddCerttificates = (certificateObj) => {
    addCertificateObj({
      cvID: userStore.getState().user.userId,
      certificates: [
        {
          certificateName: certificateObj.certificateName,
          institute: certificateObj.certificateInstitute,
          dateOfCompletion: new Date(certificateObj.certificateEarnedDate),
        },
      ],
    });
  };

  // --------------------- Function to add skills ---------------------
  const handleAddSkills = (skill) => {
    addSkillsToCV({
      cvID: userStore.getState().user.userId,
      skills: [
        {
          skill: skill.name,
          description: skill.skills,
        },
      ],
    });
  };

  //----------------------- Update Function ------------------

  //-------- Update CV Name --------------

  const handleUpdateCVName = (newName) => {
    const cvId = userStore.getState().user.userId;
    updateCvName(cvId, newName);
  };

  //-------- Update CV Address --------------

  const handleUpdateCVAddress = (newAddress) => {
    const cvId = userStore.getState().user.userId;
    updateCvAddress(cvId, newAddress);
  };

  //-------- Update CV Phone Number --------------

  const handleUpdateCVPhone = (newPhone) => {
    const cvId = userStore.getState().user.userId;
    updateCvPhone(cvId, newPhone);
  };

  //-------- Update CV Email --------------

  const handleUpdateCVEmail = (newEmail) => {
    const cvId = userStore.getState().user.userId;
    updateCvEmail(cvId, newEmail);
  };

  //-------- Update CV Summary --------------

  const handleUpdateCVSummary = (newSummary) => {
    const cvId = userStore.getState().user.userId;
    updateCvSummary(cvId, newSummary);
  };

  //---------------------- Function To Get the USERCV DATA ---------------------
  const [fetchedUser, setFetchedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = userStore.getState().user.userId;
      await fetchCV(userId);
      const cvData = useAPICVStore.getState().cvData;
      setFetchedUser(cvData);
    };

    fetchData();
  }, []);

  //-------------------- Function to set the values of Variables -----------------
  useEffect(() => {
    if (fetchedUser) {
      name.current.value = fetchedUser.name;
      address.current.value = fetchedUser.address;
      exectiveSummary.current.value = fetchedUser.executiveSummary;
      email.current.value = fetchedUser.email;
      contact.current.value = fetchedUser.phone;

      const tempEdu = [];

      fetchedUser.education.map((edu) =>
        tempEdu.push({
          id: edu.id,
          educationLevel: edu.educationLevel,
          specialization: edu.specialization,
          instituteName: edu.institute,
          dateOfCompeletion: new Date(
            edu.dateOfCompletion
          ).toLocaleDateString(),
          obtMarks: edu.obtainedMarks,
          totalMarks: edu.totalMarks,
        })
      );

      setEducation(tempEdu);

      const tempSocials = [];

      fetchedUser.socials.map((social) =>
        tempSocials.push({
          id: social.id,
          name: social.linkName,
          link: social.linkAddress,
        })
      );

      setLink(tempSocials);

      const tempCertificates = [];

      fetchedUser.certificates.map((certificate) =>
        tempCertificates.push({
          id: certificate.id,
          certificateName: certificate.certificateName,
          certificateInstitute: certificate.institute,
          certificateEarnedDate: new Date(
            certificate.dateOfCompletion
          ).toLocaleDateString(),
        })
      );

      setCertificate(tempCertificates);

      const tempProjects = [];

      fetchedUser.projects.map((project) =>
        tempProjects.push({
          id: project.id,
          description: project.description,
          name: project.projectName,
          technologies: project.technologiesUsed,
        })
      );

      setProject(tempProjects);

      const tempExperiences = []; 

      fetchedUser.experience.map((experience) =>
        tempExperiences.push({
          company: experience.companyName,
          fromDate: new Date(experience.fromDate).toLocaleDateString(),
          id: experience.id,
          description: experience.role,
          toDate: new Date(experience.toDate).toLocaleDateString(),
        })
      );

      setExperience(tempExperiences);

      const tempSkills = [];

      fetchedUser.skills.map((skill) =>
        tempSkills.push({
          id: skill.id,
          name: skill.skill,
          skills: skill.description,
        })
      );

      setSkill(tempSkills);
    }
  }, [
    fetchedUser,
    SocialLinks,
    Education,
    Project,
    Skills,
    Experience,
    Certificate,
    CV,
  ]);

  return (
    <div className="cv-main_container" id="cv-content">
      {/* --------------- Templlates of the CVs -------------- */}
      {getTemplates ? (
        <Templates setTemplates={setTemplates} userData={getUserData} />
      ) : null}
      {/* --------------------- Header Section Info ---------------------- */}
      <div className="cv-header-info">
        <div className="cv-dual-div">
          <input
            className="cv-input-field"
            type="text"
            placeholder="Name"
            ref={name}
          />

          <RxUpdate
            className="cv-update-button"
            onClick={() => {
              const message = document.querySelector(".cv-name-update");
              if (!fetchedUser) {
                message.textContent = "CV for the User has not been Created.";
                message.classList.add("cv-error");
                return;
              }

              if (name.current.value !== "") {
                handleUpdateCVName(name.current.value);
                message.textContent = "Name has been Updated Successfully.";
                message.classList.add("cv-success");
              } else {
                message.textContent = "First Enter your Name Please.";
                message.classList.add("cv-error");
              }

              setTimeout(() => {
                message.textContent = "";
                message.classList.remove("cv-success", "cv-error");
              }, 2000);
            }}
          />
        </div>
        <p className="cv-update-messages cv-name-update"></p>
        <div className="cv-dual-div">
          <input
            className="cv-input-field"
            name=""
            id=""
            placeholder="Address"
            ref={address}
          />

          <RxUpdate
            className="cv-update-button"
            onClick={() => {
              const message = document.querySelector(".cv-adress-update");

              if (!fetchedUser) {
                message.textContent = "CV for the User has not been Created.";
                message.classList.add("cv-error");
                return;
              }

              if (address.current.value !== "") {
                handleUpdateCVAddress(address.current.value);
                message.textContent = "Adress has been Updated Successfully.";
                message.classList.add("cv-success");
              } else {
                message.textContent = "First Enter your Address Please.";
                message.classList.add("cv-error");
              }

              setTimeout(() => {
                message.textContent = "";
                message.classList.remove("cv-success", "cv-error");
              }, 2000);
            }}
          />
        </div>
        <p className="cv-update-messages cv-adress-update"></p>
        <div className="cv-dual-div">
          <input
            className="cv-input-field"
            type="tel"
            placeholder="Contact"
            ref={contact}
          />

          <RxUpdate
            className="cv-update-button"
            onClick={() => {
              const message = document.querySelector(".cv-phone-update");

              if (!fetchedUser) {
                message.textContent = "CV for the User has not been Created.";
                message.classList.add("cv-error");
                return;
              }

              if (contact.current.value !== "") {
                if (
                  contact.current.value.length !== 11 ||
                  !/^\d{11}$/.test(contact.current.value)
                ) {
                  message.textContent =
                    "Phone Number should be 11 Numeric Digits.";
                  message.classList.add("cv-error");
                  return;
                }

                handleUpdateCVPhone(contact.current.value);
                // message.textContent =
                //   "Phone Number has been Updated Successfully.";
                // message.classList.add("cv-success");
                toast.success("Phone Number has been Updated Successfully.")
              } else {
                message.textContent = "First Enter your Contact Please.";
                message.classList.add("cv-error");
              }

              setTimeout(() => {
                message.textContent = "";
                message.classList.remove("cv-success", "cv-error");
              }, 2000);
            }}
          />
        </div>
        <p className="cv-update-messages cv-phone-update"></p>
        <div className="cv-dual-div">
          <input
            className="cv-input-field"
            type="email"
            placeholder="Email"
            ref={email}
          />

          <RxUpdate
            className="cv-update-button"
            onClick={() => {
              const message = document.querySelector(".cv-email-update");

              if (!fetchedUser) {
                message.textContent = "CV for the User has not been Created.";
                message.classList.add("cv-error");
                return;
              }
              if (email.current.value !== "") {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.current.value)) {
                  message.textContent = "First Enter a Valid Email Please.";
                  message.classList.add("cv-error");
                  return;
                }
                handleUpdateCVEmail(email.current.value);
                message.textContent = "Email has been Updated.";
                message.classList.add("cv-success");
              } else {
                message.textContent = "First Enter your Email Please.";
                message.classList.add("cv-error");
              }

              setTimeout(() => {
                message.textContent = "";
                message.classList.remove("cv-success", "cv-error");
              }, 2000);
            }}
          />
        </div>
        <p className="cv-update-messages cv-email-update"></p>

        {/* --------------------- Exective Summary ---------------------- */}
        <p className="cv-headings">Exective Summary</p>
        <textarea
          className="cv-textarea-field"
          name=""
          id=""
          placeholder="Exective Summary"
          rows={"6"}
          ref={exectiveSummary}
        ></textarea>
        <p className="cv-update-summary"></p>
        <button
          className="cv-add-information-button"
          onClick={() => {
            const message = document.querySelector(".cv-update-summary");

            if (!fetchedUser) {
              message.textContent = "CV for the User has not been Created.";
              message.classList.add("cv-error");
              return;
            }

            if (exectiveSummary.current.value !== "") {
              handleUpdateCVSummary(exectiveSummary.current.value);
              message.textContent = "Exective Summary has been Updated.";
              message.classList.add("cv-success");
            } else {
              message.textContent = "First enter some Summary.";
              message.classList.add("cv-error");
            }

            setTimeout(() => {
              message.textContent = "";
              message.classList.remove("cv-success", "cv-error");
            }, 2000);
          }}
        >
          Update Exective Summary
        </button>
        <p className="cv-create-button-success cv-message">
          CV has been created Successfully.
        </p>
        <button
          className="cv-add-information-button"
          onClick={() => {
            const successElement = document.querySelector(
              ".cv-create-button-success"
            );
            if (fetchedUser) {
              successElement.innerHTML = "The CV for this UserId Exists.";
              successElement.classList.add("cv-error");
            } else {
              if (
                name.current.value === "" ||
                address.current.value === "" ||
                email.current.value === "" ||
                contact.current.value === "" ||
                exectiveSummary.current.value === ""
              ) {
                successElement.innerHTML = "All above Info is required.";
                successElement.classList.add("cv-error");
                return;
              }
              handleClick();
              successElement.innerHTML = "The CV Created Successfully";
              successElement.classList.add("cv-success");
            }

            setTimeout(() => {
              successElement.classList.remove("cv-success", "cv-error");
            }, 2000);
          }}
        >
          Create CV
        </button>

        <p className="cv-headings">Social Links</p>
      </div>
      {/* --------------------- Social Links Info ---------------------- */}
      <input
        className="cv-input-field"
        type="text"
        placeholder="Link Name"
        ref={linkName}
      />
      <input
        className="cv-input-field"
        type="text"
        placeholder="Social Link"
        ref={link}
      />
      <p className="cv-message choose1">Success/Failure Message</p>
      <button
        className="cv-add-information-button"
        onClick={() => {
          document.querySelector(".choose1").textContent = "";

          const message = document.querySelector(".choose1");
          if (linkName.current.value !== "" && link.current.value !== "") {
            if (!fetchedUser) {
              message.textContent = "CV for the User has not been Created.";
              message.classList.add("cv-success");
            } else {
              addLink({
                id: uuidv4(),
                name: linkName.current.value,
                link: link.current.value,
              });

              handleAddSocials({
                name: linkName.current.value,
                link: link.current.value,
              });
              message.textContent = "Link added Successfully";
              message.classList.add("cv-success");
            }

            linkName.current.value = "";
            link.current.value = "";
          } else {
            document.querySelector(".choose1").classList.add("cv-error");
            document.querySelector(".choose1").textContent =
              "Required all the info";
          }

          setTimeout(() => {
            message.classList.remove("cv-success", "cv-error");
          }, 2000);
        }}
      >
        Add Social Link
      </button>

      {linksList.length != 0 ? (
        <SocialLinks linksList={linksList} removeLink={removeLink} />
      ) : null}

      {/* --------------------- Education Section Info ---------------------- */}
      <p className="cv-headings">Education</p>
      <select className="cv-input-field" name="" id="" ref={educationLevel}>
        <option value=""> --Select an Option --</option>
        <option value="PhD">PhD</option>
        <option value="Master">Master</option>
        <option value="Bachlor">Bachlor</option>
        <option value="Inter">Inter</option>
        <option value="Matric">Matric</option>
      </select>
      <input
        className="cv-input-field"
        type="text"
        placeholder="Specialization"
        ref={specialization}
      />
      <input
        className="cv-input-field"
        type="text"
        placeholder="Institute Name"
        ref={instituteName}
      />
      <div className="cv-mini_container">
        <input
          className="cv-input-field"
          type="text"
          name=""
          id=""
          placeholder="Obt. Marks/CGPA"
          ref={obtMarks}
        />
        <input
          className="cv-input-field"
          type="text"
          placeholder="Total Marks/CGPA"
          ref={totalMarks}
        />
      </div>
      <div className="cv-mini_container">
        <p className="cv-mini-inner-heading">Date of completion</p>
        <input className="cv-input-field" type="date" ref={dateOfCompeletion} />
      </div>
      <p className="cv-message choose2">Success/Failure Message</p>
      <button
        className="cv-add-information-button"
        onClick={() => {
          const message = document.querySelector(".choose2");
          message.value = "";

          if (
            educationLevel.current.value !== "" &&
            specialization.current.value !== "" &&
            instituteName.current.value !== "" &&
            dateOfCompeletion.current.value !== "" &&
            obtMarks.current.value !== "" &&
            totalMarks.current.value !== ""
          ) {
            if (!fetchedUser) {
              message.textContent = "CV for the User has not been Created.";
              message.classList.add("cv-error");
            } else {
              if (obtMarks.current.value > totalMarks.current.value) {
                message.textContent =
                  "Obtained Marks can't be Greater than Total Marks.";
                message.classList.add("cv-error");
                return;
              }

              addEducation({
                id: uuidv4(),
                educationLevel: educationLevel.current.value,
                specialization: specialization.current.value,
                instituteName: instituteName.current.value,
                dateOfCompeletion: dateOfCompeletion.current.value,
                obtMarks: obtMarks.current.value,
                totalMarks: totalMarks.current.value,
              });

              //---------------- Backend Call---------------

              handleAddEducation({
                educationLevel: educationLevel.current.value,
                specialization: specialization.current.value,
                instituteName: instituteName.current.value,
                dateOfCompeletion: dateOfCompeletion.current.value,
                obtMarks: obtMarks.current.value,
                totalMarks: totalMarks.current.value,
              });

              message.textContent = "Education added Successfully";
              message.classList.add("cv-success");

              // Reset values
              educationLevel.current.value = "";
              specialization.current.value = "";
              instituteName.current.value = "";
              dateOfCompeletion.current.value = "";
              obtMarks.current.value = "";
              totalMarks.current.value = "";
            }
          } else {
            message.value = "Required all the info";
            message.classList.add("cv-error");
          }

          setTimeout(() => {
            message.classList.remove("cv-success", "cv-error");
          }, 2000);
        }}
      >
        Add Education
      </button>

      {educationList.length > 0 ? (
        <Education
          educationList={educationList}
          removeEducation={removeEducation}
        />
      ) : null}

      {/*------------------ Technical Skills Section */}
      <p className="cv-headings">Technical Skills</p>
      <input
        className="cv-input-field"
        type="text"
        placeholder="Technical Skill"
        ref={skillName}
      />
      <input
        className="cv-input-field"
        type="text"
        placeholder="Technologies, Tools, Frameworks (separated by commas)"
        ref={skills}
      />
      <p className="cv-message choose4">Success/Failure Message</p>
      <button
        className="cv-add-information-button"
        onClick={() => {
          const message = document.querySelector(".choose4");
          message.textContent = "";

          if (!fetchedUser) {
            message.textContent = "CV for the User has not been Created.";
            message.classList.add("cv-error");
            return;
          }
          if (skillName.current.value !== "" && skills.current.value !== "") {
            addSkill({
              id: uuidv4(),
              name: skillName.current.value,
              skills: skills.current.value,
            });

            //------------ API Calling ----------------
            handleAddSkills({
              name: skillName.current.value,
              skills: skills.current.value,
            });

            message.textContent = "Skills added Successfully";
            message.classList.add("cv-success");
            skillName.current.value = "";
            skills.current.value = "";
          } else {
            message.classList.add("cv-error");
            message.textContent = "Required all the info";
          }

          setTimeout(() => {
            message.classList.remove("cv-success", "cv-error");
          }, 2000);
        }}
      >
        Add Technical Skills
      </button>

      {skillsList.length > 0 ? (
        <Skills skillsList={skillsList} removeSkill={removeSkill} />
      ) : null}
      {/* --------------------- Experience ---------------------- */}
      <p className="cv-headings">Experience</p>
      <input
        className="cv-input-field"
        type="text"
        name=""
        id=""
        placeholder="Institute/Company Name"
        ref={experienceCompany}
      />
      <div className="cv-mini_container">
        <p className="cv-mini-inner-heading">From</p>
        <input
          className="cv-input-field"
          type="date"
          ref={startExperienceDate}
        />
        <p className="cv-mini-inner-heading">To</p>
        <input className="cv-input-field" type="date" ref={endExperienceDate} />
      </div>
      <p className="cv-message choose6">Success/Failure Message </p>
      <textarea
        className="cv-textarea-field"
        name=""
        id=""
        placeholder="Experience"
        rows={"6"}
        ref={experienceDescription}
      ></textarea>
      <button
        className="cv-add-information-button"
        onClick={() => {
          const message = document.querySelector(".choose6");
          message.classList.remove("cv-error");
          message.classList.remove("cv-success");

          if (!fetchedUser) {
            message.textContent = "CV for the User has not been Created.";
            message.classList.add("cv-error");
            return;
          }
          if (
            experienceCompany.current.value !== "" &&
            startExperienceDate.current.value !== "" &&
            endExperienceDate.current.value !== "" &&
            experienceDescription.current.value !== ""
          ) {
            const startDate = new Date(startExperienceDate.current.value);
            const endDate = new Date(endExperienceDate.current.value);

            if (startDate > endDate) {
              message.textContent = "Start Date can't Exceed from End Date.";
              message.classList.add("cv-error");
              return;
            }

            addExperience({
              id: uuidv4(),
              company: experienceCompany.current.value,
              startDate: startExperienceDate.current.value,
              endDate: endExperienceDate.current.value,
              description: experienceDescription.current.value,
            });

            //----------------------- Backend Call ----------------------

            handleAddExperience({
              company: experienceCompany.current.value,
              startDate: startExperienceDate.current.value,
              endDate: endExperienceDate.current.value,
              description: experienceDescription.current.value,
            });

            message.textContent = "Experince added Successfully";
            message.classList.add("cv-success");

            experienceCompany.current.value = "";
            startExperienceDate.current.value = "";
            endExperienceDate.current.value = "";
            experienceDescription.current.value = "";
          } else {
            message.textContent = "Required all the info";
            message.classList.add("cv-error");
          }

          setTimeout(() => {
            message.classList.remove("cv-error", "cv-success");
          }, 2000);
        }}
      >
        Add Experience
      </button>

      {experienceList.length > 0 ? (
        <Experience
          experienceList={experienceList}
          removeExperience={removeExperience}
        />
      ) : null}
      {/* --------------------- Projects Section Info ---------------------- */}
      <p className="cv-headings">Projects</p>
      <input
        className="cv-input-field"
        type="text"
        placeholder="Project Name"
        ref={projectName}
      />
      <input
        className="cv-input-field"
        type="text"
        name=""
        id=""
        placeholder="Technologies (Separated by Commas)"
        ref={technologies}
      />
      <textarea
        className="cv-textarea-field"
        name=""
        id=""
        placeholder="Project Description"
        rows={"6"}
        ref={projectDescription}
      ></textarea>
      <p className="cv-message choose3">Success/Failure Message </p>
      <button
        className="cv-add-information-button"
        onClick={() => {
          const message = document.querySelector(".choose3");

          if (!fetchedUser) {
            message.textContent = "CV for the User has not been Created.";
            message.classList.add("cv-error");
            return;
          }
          if (
            projectName.current.value !== "" &&
            technologies.current.value !== "" &&
            projectDescription.current.value !== ""
          ) {
            addProject({
              id: uuidv4(),
              name: projectName.current.value,
              technologies: technologies.current.value,
              description: projectDescription.current.value,
            });

            //--------------------- Backend Call------------------
            handleAddProjects({
              name: projectName.current.value,
              technologies: technologies.current.value,
              description: projectDescription.current.value,
            });

            message.textContent = "Project added Successfully";

            message.classList.add("cv-success");

            projectName.current.value = "";
            technologies.current.value = "";
            projectDescription.current.value = "";
          } else {
            message.classList.add("cv-error");
            message.textContent = "Required all the info";
          }
          setTimeout(() => {
            message.classList.remove("cv-success", "cv-error");
          }, 2000);
        }}
      >
        Add Project
      </button>

      {projectList.length != 0 ? (
        <Project projectList={projectList} removeProject={removeProject} />
      ) : null}
      {/*------------------ Certificates Section ------------------- */}
      <p className="cv-headings">Certificates</p>
      <input
        className="cv-input-field"
        type="text"
        placeholder="Certificate Name"
        ref={certificateName}
      />
      <input
        className="cv-input-field"
        type="text"
        placeholder="Got From"
        ref={certificateInstitute}
      />
      <div className="cv-mini_container">
        <p className="cv-mini-inner-heading">Date:</p>
        <input
          className="cv-input-field"
          type="date"
          ref={certificateEarnedDate}
        />
      </div>
      <p className="cv-message choose5">Success/Failure Message</p>
      <button
        className="cv-add-information-button"
        onClick={() => {
          const message = document.querySelector(".choose5");
          message.textContent = "";
          if (!fetchedUser) {
            message.textContent = "CV for the User has not been Created.";
            message.classList.add("cv-error");
            return;
          }
          if (
            certificateName.current.value !== "" &&
            certificateInstitute.current.value !== "" &&
            certificateEarnedDate.current.value !== ""
          ) {
            addCertificate({
              id: uuidv4(),
              certificateName: certificateName.current.value,
              certificateInstitute: certificateInstitute.current.value,
              certificateEarnedDate: certificateEarnedDate.current.value,
            });

            //---------- Backend Call --------------

            handleAddCerttificates({
              certificateName: certificateName.current.value,
              certificateInstitute: certificateInstitute.current.value,
              certificateEarnedDate: certificateEarnedDate.current.value,
            });
            message.textContent = "Link added Successfully";

            message.classList.add("cv-success");

            certificateName.current.value = "";
            certificateInstitute.current.value = "";
            certificateEarnedDate.current.value = "";
          } else {
            message.textContent = "Required all the info";
            message.classList.add("cv-error");
          }
          setTimeout(() => {
            message.classList.remove("cv-error", "cv-success");
          }, 2000);
        }}
      >
        Add Certificate
      </button>

      {certificateList.length != 0 ? (
        <Certificate
          certificateList={certificateList}
          removeCertificate={removeCertificate}
        />
      ) : null}
      {/* --------------------- View or Generation ---------------------- */}

      <p className="cv-view-message"></p>
      <button
        className="cv-add-information-button"
        onClick={() => {
          UserData();
        }}
      >
        View CV
      </button>
    </div>
  );
}
