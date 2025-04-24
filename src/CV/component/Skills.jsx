import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";

export default function Skills({ skillsList, removeSkill }) {
  const { removeSkillList, cvData } = useAPICVStore();

  const deleteSkill = (skillId) => {
    removeSkillList(skillId);
  };

  return (
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
              <button
                className="cv-table-remove-button"
                onClick={() => {
                  removeSkill(skill.id);
                  deleteSkill(skill.id);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
