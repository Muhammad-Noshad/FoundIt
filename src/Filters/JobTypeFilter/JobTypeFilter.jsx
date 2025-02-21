import "./JobTypeFilter.css";
import { useEffect, useRef } from "react";

const JobTypeFilter = ({ jobType, setJobType }) => {
  const filterRef = useRef(null);

  const changeBeforeElemPosition = (value) => {
    filterRef.current.style.setProperty("--before-left", `${value}%`);
  }

  const adjustOptionsColor = () => {
    const children = filterRef.current.children;

    if(jobType === "") {
      children[0].style.setProperty("--job-type-option", "var(--primary-color)");
      children[1].style.setProperty("--job-type-option", "var(--dark-color)");
      children[2].style.setProperty("--job-type-option", "var(--dark-color)");
    }
    else if(jobType == "PartTime") {
      children[0].style.setProperty("--job-type-option", "var(--dark-color)");
      children[1].style.setProperty("--job-type-option", "var(--primary-color)");
      children[2].style.setProperty("--job-type-option", "var(--dark-color)");
    }
    else if(jobType === "FullTime") {
      children[0].style.setProperty("--job-type-option", "var(--dark-color)");
      children[1].style.setProperty("--job-type-option", "var(--dark-color)");
      children[2].style.setProperty("--job-type-option", "var(--primary-color)");
    }
  }

  useEffect(() => {
    adjustOptionsColor();
  }, [jobType]);

  return (
    <section className="job-type-filter" ref={filterRef}>
      <h6 onClick={() => { changeBeforeElemPosition(0); setJobType(""); }}>All</h6>
      <h6 onClick={() => { changeBeforeElemPosition(33.3); setJobType("PartTime")}}>Part-Time</h6>
      <h6 onClick={() => { changeBeforeElemPosition(66.6); setJobType("FullTime")}}>Full-Time</h6>
    </section>
  );
}
 
export default JobTypeFilter;