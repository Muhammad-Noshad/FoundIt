import "./ConfirmationModal.css";

const ConfirmationModal = ({ isModalOpen, onClose, title, message, setIsConfirmed }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <section className="confirmation-modal modal-overlay">
      <div className="modal-content">
        <p className="dark modal-cross" onClick={onClose}>
          &times;
        </p>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="button-section">
          <button className="button-yes" onClick={() => { setIsConfirmed(true); onClose();}}>Yes</button>
          <button className="button-no" onClick={() => { setIsConfirmed(false); onClose();}}>No</button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationModal;
