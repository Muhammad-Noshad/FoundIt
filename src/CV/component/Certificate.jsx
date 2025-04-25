import "../Styles/teble.css";
import useAPICVStore from "../../Store/cvStore";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Certificate({ certificateList, removeCertificate }) {
  const { removeCertificateList, cvData } = useAPICVStore();

  const deleteCertificate = (certificateId) => {
    removeCertificateList(certificateId);
  };

  return (
    <div className="table-container">
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
                <RiDeleteBin2Fill
                  className="delete-icon"
                  onClick={() => {
                    removeCertificate(certificate.id);
                    deleteCertificate(certificate.id);
                    toast.success("Certificate Deleted Successfully");
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
