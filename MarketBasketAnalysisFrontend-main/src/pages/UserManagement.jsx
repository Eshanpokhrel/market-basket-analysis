import React, { useEffect, useState } from "react";
import { protectedApi } from "../config/axios";
import "../styles/userManage.css"; // Import your CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await protectedApi.get("/admin/get-all-users");
        if (response.data.status === true) {
          setUsers(response.data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers(); // Call the function to fetch users
  }, []);
  console.log(users)

  const handleDeleteUser = async (userId) => {
    try {
      const response = await protectedApi.delete(
        `/admin/delete-user/${userId}`
      );
      if (response.data.success === true) {
        // Filter out the deleted user from the state
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isVerified ? "Verified " : "Not verified"} </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
