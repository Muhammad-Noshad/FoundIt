import "./RoleFilter.css";
import { useEffect, useRef } from "react";

const RoleFilter = ({ role, setRole }) => {
  const filterRef = useRef(null);

  const changeBeforeElemPosition = (value) => {
    filterRef.current.style.setProperty("--before-left", `${value}%`);
  }

  const adjustOptionsColor = () => {
    const children = filterRef.current.children;

    if(role === "") {
      children[0].style.setProperty("--role-option", "var(--primary-color)");
      children[1].style.setProperty("--role-option", "var(--dark-color)");
      children[2].style.setProperty("--role-option", "var(--dark-color)");
      children[3].style.setProperty("--role-option", "var(--dark-color)");
    }
    else if(role === "Admin") {
      children[0].style.setProperty("--role-option", "var(--dark-color)");
      children[1].style.setProperty("--role-option", "var(--primary-color)");
      children[2].style.setProperty("--role-option", "var(--dark-color)");
      children[3].style.setProperty("--role-option", "var(--dark-color)");
    }
    else if(role === "Employer") {
      children[0].style.setProperty("--role-option", "var(--dark-color)");
      children[1].style.setProperty("--role-option", "var(--dark-color)");
      children[2].style.setProperty("--role-option", "var(--primary-color)");
      children[3].style.setProperty("--role-option", "var(--dark-color)");
    }
    else if(role === "JobSeeker") {
      children[0].style.setProperty("--role-option", "var(--dark-color)");
      children[1].style.setProperty("--role-option", "var(--dark-color)");
      children[2].style.setProperty("--role-option", "var(--dark-color)");
      children[3].style.setProperty("--role-option", "var(--primary-color)");
    }
  }

  useEffect(() => {
    adjustOptionsColor();
  }, [role]);

  return (
    <section className="role-filter" ref={filterRef}>
      <h6 onClick={() => { changeBeforeElemPosition(0); setRole(""); }}>All</h6>
      <h6 onClick={() => { changeBeforeElemPosition(25); setRole("Admin")}}>Admin</h6>
      <h6 onClick={() => { changeBeforeElemPosition(50); setRole("Employer")}}>Employer</h6>
      <h6 onClick={() => { changeBeforeElemPosition(75); setRole("JobSeeker")}}>Job Seeker</h6>
    </section>
  );
}
 
export default RoleFilter;