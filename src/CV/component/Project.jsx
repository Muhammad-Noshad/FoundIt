import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Project({ projectList, removeProject }) {
  const { removeProjectList, cvData } = useAPICVStore();

  const deleteProject = (projectId) => {
    removeProjectList(projectId);
  };

  return (
    <div className="table-container">
      <table border={"1"}>
        <thead>
          <tr>
            <th className="cv-table-heading">Sr#</th>
            <th className="cv-table-heading">Project Name</th>
            <th className="cv-table-heading">Technologies</th>
            <th className="cv-table-heading">Description</th>
            <th className="cv-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((pro, index) => (
            <tr key={pro.id}>
              <td>{index + 1}</td>
              <td>{pro.name}</td>
              <td>{pro.technologies}</td>
              <td>{pro.description}</td>
              <td>
                <RiDeleteBin2Fill
                  className="delete-icon"
                  onClick={() => {
                    removeProject(pro.id);
                    deleteProject(pro.id);
                    toast.success("Project Deleted Successfully");
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
