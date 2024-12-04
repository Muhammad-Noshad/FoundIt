import { useEffect, useRef } from "react";
import "./ApplicationStatusFilter.css";

const ApplicationStatusFilter = ({ applicationStatus, setApplicationStatus }) => {
  const filterRef = useRef(null);

  const changeBeforeElemPosition = (value) => {
    filterRef.current.style.setProperty("--before-left", `${value}%`);
  }

  const adjustOptionsColor = () => {
    const children = filterRef.current.children;

    if(applicationStatus === "") {
      children[0].style.setProperty("--application-status-option", "var(--primary-color)");
      children[1].style.setProperty("--application-status-option", "var(--dark-color)");
      children[2].style.setProperty("--application-status-option", "var(--dark-color)");
      children[3].style.setProperty("--application-status-option", "var(--dark-color)");
    }
    else if(applicationStatus == "Applied") {
      children[0].style.setProperty("--application-status-option", "var(--dark-color)");
      children[1].style.setProperty("--application-status-option", "var(--primary-color)");
      children[2].style.setProperty("--application-status-option", "var(--dark-color)");
      children[3].style.setProperty("--application-status-option", "var(--dark-color)");
    }
    else if(applicationStatus === "Approved") {
      children[0].style.setProperty("--application-status-option", "var(--dark-color)");
      children[1].style.setProperty("--application-status-option", "var(--dark-color)");
      children[2].style.setProperty("--application-status-option", "var(--primary-color)");
      children[3].style.setProperty("--application-status-option", "var(--dark-color)");
    }
    else if(applicationStatus === "Rejected") {
      children[0].style.setProperty("--application-status-option", "var(--dark-color)");
      children[1].style.setProperty("--application-status-option", "var(--dark-color)");
      children[2].style.setProperty("--application-status-option", "var(--dark-color)");
      children[3].style.setProperty("--application-status-option", "var(--primary-color)");
    }
  }

  useEffect(() => {
    adjustOptionsColor();
  }, [applicationStatus]);

  return (
    <section className="application-status-filter" ref={filterRef}>
      <h6 onClick={() => { changeBeforeElemPosition(0); setApplicationStatus(""); }}>All</h6>
      <h6 onClick={() => { changeBeforeElemPosition(25.5); setApplicationStatus("Applied")}}>Applied</h6>
      <h6 onClick={() => { changeBeforeElemPosition(51.5); setApplicationStatus("Approved")}}>Approved</h6>
      <h6 onClick={() => { changeBeforeElemPosition(77.5); setApplicationStatus("Rejected")}}>Rejected</h6>
    </section>
  );
}
 
export default ApplicationStatusFilter;