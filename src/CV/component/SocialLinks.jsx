import useAPICVStore from "../../Store/cvStore";
import "../Styles/teble.css";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function SocialLinks({ linksList, removeLink }) {
  const { removeSocialLink, cvData } = useAPICVStore();

  const deleteSocialLink = (linkId) => {
    removeSocialLink(linkId);
  };

  return (
    <div className="table-container">
      <table border={"1"}>
        <thead>
          <tr>
            <th className="cv-table-heading">Sr#</th>
            <th className="cv-table-heading">Link Name</th>
            <th className="cv-table-heading">Link</th>
            <th className="cv-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {linksList.map((link, index) => (
            <tr key={link.id}>
              <td>{index + 1}</td>
              <td>{link.name}</td>
              <td>{link.link}</td>
              <td>
                <RiDeleteBin2Fill
                  className="delete-icon"
                  onClick={() => {
                    removeLink(link.id);
                    deleteSocialLink(link.id);
                    toast.success("Link Deleted Successfully");
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
