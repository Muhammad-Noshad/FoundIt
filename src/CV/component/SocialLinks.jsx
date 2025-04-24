import useAPICVStore from "../../Store/cvStore";
import "../Styles/teble.css";

export default function SocialLinks({ linksList, removeLink }) {
  const { removeSocialLink, cvData } = useAPICVStore();

  const deleteSocialLink = (linkId) => {
    removeSocialLink(linkId);
  };

  return (
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
              <button
                className="cv-table-remove-button"
                onClick={() => {
                  removeLink(link.id);
                  deleteSocialLink(link.id);
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
