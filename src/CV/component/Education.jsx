import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Education({ educationList, removeEducation }) {
  const { removeEducationList, cvData } = useAPICVStore();

  const deleteEducation = (eduId) => {
    removeEducationList(eduId);
  };

  return (
    <div className="table-container">
      <table border={"1"}>
        <thead>
          <tr>
            <th className="cv-table-heading">Sr#</th>
            <th className="cv-table-heading">Qualification</th>
            <th className="cv-table-heading">Specialization</th>
            <th className="cv-table-heading">Institute</th>
            <th className="cv-table-heading">Obt. Marks/CGPA</th>
            <th className="cv-table-heading">Total Marks/CGPA</th>
            <th className="cv-table-heading">Date of Completion</th>
            <th className="cv-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {educationList.map((edu, index) => (
            <tr key={edu.id}>
              <td>{index + 1}</td>
              <td>{edu.educationLevel}</td>
              <td>{edu.specialization}</td>
              <td>{edu.instituteName}</td>
              <td>{edu.obtMarks}</td>
              <td>{edu.totalMarks}</td>
              <td>{edu.dateOfCompeletion}</td>
              <td>
                <RiDeleteBin2Fill
                  className="delete-icon"
                  onClick={() => {
                    removeEducation(edu.id);
                    deleteEducation(edu.id);
                    toast.success("Education Deleted Successfully");
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
