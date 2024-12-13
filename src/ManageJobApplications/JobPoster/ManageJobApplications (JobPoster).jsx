import "./ManageJobApplications (JobPoster).css";

import { useState } from "react";

import JobPosts from "./JobPosts/JobPosts";
import JobApplications from "./JobApplications/JobApplications";

const ManageJobApplicationsPoster = () => {
  const [mode, setMode] = useState("JobPosts");

  return (
    <section className="manage-job-posts container">
      <h1>Manage Job Applications</h1>
      <p className="dark subtitle">Manage your job applications.</p>
      {
        mode === "JobPosts"
        &&
        <JobPosts setMode={setMode} />
      }
      {
        mode === "JobApplications"
        &&
        <JobApplications setMode={setMode} />
      }
    </section>
  );
}
 
export default ManageJobApplicationsPoster;