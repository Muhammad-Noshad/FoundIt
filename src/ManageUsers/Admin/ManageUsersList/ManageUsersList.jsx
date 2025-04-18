import "./ManageUsersList.css";

import ManageUserCard from "../../../Cards/Admin/ManageUserCard/ManageUserCard";

const ManageUsersList = ({ users }) => {
  return (
    <section className="manage-users-list">
      {
        users.map((value, index) => 
          <ManageUserCard 
            userId={value.userId}
            firstName={value.firstName}
            lastName={value.lastName}
            email={value.email}
            role={value.role}
            password={value.password}
            key={index}
          />
        )
      }
    </section>
  );
}
 
export default ManageUsersList;