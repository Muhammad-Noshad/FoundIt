import "./ManageUserCard.css";

import trashImg from "../../../images/icon/trash.svg";

import { useState } from "react";
import { toast } from "react-toastify";

import API from "../../../API/API";
import allUsersStore from "../../../Store/allUsersStore";
import userStore from "../../../Store/userStore";

import EditUserDetailsModal from "../../../Modals/EditUserDetailsModal/EditUserDetailsModal";
import ConfirmationModal from "../../../Modals/ConfirmationModal/ConfirmationModal";
import EmailModal from "../../../Modals/EmailModal/EmailModal";

const ManageUserCard = ({ userId, firstName, lastName, email, role, password }) => {
  const { user } = userStore();

  const [isEditUserDetailsModalOpen, setIsEditUserDetailsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleUserDeletion = async() => {
    try {
      await API.delete(`/user/${userId}`);
      toast.success("User deleted successfully!");
      allUsersStore.getState().fetchAllUsers();
    }
    catch(error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("An error occurred", error);
    }
    setIsConfirmed(false);
  }

  if(isConfirmed) {
    handleUserDeletion();
  }

  return (
    <section className="manage-user-card">
      <div className="top-section">
        <h6 className="user-name">{`${firstName} ${lastName}`}</h6>
        <img
          src={trashImg}
          className="trash"
          alt="trash"
          onClick={() => setIsConfirmationModalOpen(true)}
        />
      </div>
      <p className="user-email dark">{email}</p>
      <div className="button-section">
        <button className="button-secondary" onClick={() => setIsEmailModalOpen(true)}>Contact</button>
        <button className="button-primary" onClick={() => setIsEditUserDetailsModalOpen(true)}>Edit</button>
      </div>
      <ConfirmationModal
        setIsConfirmed={setIsConfirmed}
        isModalOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title={"Confirm Deletion"}
        message={"Are you sure you want to delete this User?"}
      />
      <EditUserDetailsModal
        isModalOpen={isEditUserDetailsModalOpen}
        onClose={() => setIsEditUserDetailsModalOpen(false)}
        firstName={firstName}
        lastName={lastName}
        email={email}
        userId={userId}
        role={role}
        password={password}
      />
      <EmailModal
        isModalOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        userEmail={user?.email}
        toEmail={email}
      />
    </section>
  );
};

export default ManageUserCard;
