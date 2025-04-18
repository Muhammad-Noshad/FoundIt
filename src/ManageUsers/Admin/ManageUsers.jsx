import "./ManageUsers.css";

import { useState, useEffect } from "react";
import allUsersStore from "../../Store/allUsersStore";

import SearchBar from "../../Filters/SearchBar/SearchBar";
import ManageUsersList from "./ManageUsersList/ManageUsersList";
import RoleFilter from "../../Filters/RoleFilter/RoleFilter";

const ManageUsers = () => {
  const { users } = allUsersStore();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    let filter = allUsersStore.getState().users;

    filter = filter.filter(value => value.firstName.toLowerCase().includes(firstName.toLowerCase()));
    filter = filter.filter(value => value.lastName.toLowerCase().includes(lastName.toLowerCase()));
    filter = filter.filter(value => value.email.toLowerCase().includes(email.toLowerCase()));
    filter = filter.filter(value => value.role.toLowerCase().includes(role.toLowerCase()));

    setFilteredUsers(filter);
  }, [firstName, lastName, email, users, role]);

  return (
    <section className="manage-users container">
      <h1>Manage Users</h1>
      <p className="dark subtitle">Manage users.</p>
      <SearchBar 
        values={[firstName, lastName, email]}
        setters={[setFirstName, setLastName, setEmail]}
        placeholders={["Enter First Name", "Enter Last Name", "Enter Email"]}
      />
      <div className="additional-filters">
        <RoleFilter
          role={role}
          setRole={setRole}
        />
      </div>
      {
        filteredUsers?.length?
        <ManageUsersList users={filteredUsers} />
        :
        <p className="dark no-jobs">No users to show! Try changing the filters.</p>
      }
    </section>
  );
}
 
export default ManageUsers;