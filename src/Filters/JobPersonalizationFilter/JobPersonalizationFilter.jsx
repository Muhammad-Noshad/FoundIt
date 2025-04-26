import "./JobPersonalizationFilter.css";

import { useEffect, useState } from "react";

import postedJobStore from "../../Store/postedJobStore";
import userStore from "../../Store/userStore";

export default function JobPersonalizationFilter({ setJobs }) {
  const { fetchRelatedPostedJobs, fetchPostedJobs } = postedJobStore();
  const { user } = userStore();

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(prev => !prev);
  };

  const handleOff = async() => {
    await fetchPostedJobs();
    setJobs(postedJobStore.getState().postedJobs);
  }

  const handleOn = async() => {
    await fetchRelatedPostedJobs(user.userId);
    setJobs(postedJobStore.getState().postedJobs);
  }

  useEffect(() => {
    if (isOn) {
      handleOn();
    }
    else {
      handleOff();
    }
  }, [isOn]);

  return (
    <section className="job-personalization-filter">
      <p>Personalize Jobs: </p>
      <div className={`switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
        <div className="ball"></div>
      </div>
    </section>
  );
}