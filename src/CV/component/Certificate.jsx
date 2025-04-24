import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";

export default function Certificate({ certificateList, removeCertificate }) {
  const { removeCertificateList, cvData } = useAPICVStore();

  const deleteCertificate = (certificateId) => {
    removeCertificateList(certificateId);
  };

  return (
    <>
      <table border={"1"}>
        <thead>
          <tr>
            <th className="cv-table-heading">Sr#</th>
            <th className="cv-table-heading">Certificate Name</th>
            <th className="cv-table-heading">Institute Name</th>
            <th className="cv-table-heading">Date</th>
            <th className="cv-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {certificateList.map((certificate, index) => (
            <tr key={certificate.id}>
              <td>{index + 1}</td>
              <td>{certificate.certificateName}</td>
              <td>{certificate.certificateInstitute}</td>
              <td>{certificate.certificateEarnedDate}</td>
              <td>
                <button
                  className="cv-table-remove-button"
                  onClick={() => {
                    removeCertificate(certificate.id);
                    deleteCertificate(certificate.id);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
