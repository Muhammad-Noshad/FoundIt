import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Experience({ experienceList, removeExperience }) {
  const { removeExperienceList, cvData } = useAPICVStore();

  const deleteExperience = (experienceId) => {
    removeExperienceList(experienceId);
  };
  return (
    <div className="table-container">
      <table border={"1"}>
        <thead>
          <tr>
            <th className="cv-table-heading">Sr#</th>
            <th className="cv-table-heading">Company Name</th>
            <th className="cv-table-heading">From</th>
            <th className="cv-table-heading">To</th>
            <th className="cv-table-heading">Description</th>
            <th className="cv-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {experienceList.map((exp, index) => (
            <tr key={exp.id}>
              <td>{index + 1}</td>
              <td>{exp.company}</td>
              <td>{exp.startDate}</td>
              <td>{exp.endDate}</td>
              <td>{exp.description}</td>
              <td>
                <RiDeleteBin2Fill
                  className="delete-icon"
                  onClick={() => {
                    removeExperience(exp.id);
                    deleteExperience(exp.id);
                    toast.success("Experience Deleted Successfully");
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
