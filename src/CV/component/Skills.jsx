import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Skills({ skillsList, removeSkill }) {
  const { removeSkillList, cvData } = useAPICVStore();

  // Delete Skill Function Call
  const deleteSkill = (skillId) => {
    removeSkillList(skillId);
  };

  return (
    <div className="table-container">
      <table border={"1"}>
        <thead>
          <tr>
            <th className="cv-table-heading">Sr#</th>
            <th className="cv-table-heading">Skill</th>
            <th className="cv-table-heading">Technologies</th>
            <th className="cv-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {skillsList.map((skill, index) => (
            <tr key={skill.id}>
              <td>{index + 1}</td>
              <td>{skill.name}</td>
              <td>{skill.skills}</td>
              <td>
                <RiDeleteBin2Fill
                  className="delete-icon"
                  onClick={() => {
                    removeSkill(skill.id);
                    deleteSkill(skill.id);
                    toast.success("Skill Deleted Successfully");
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
