import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost/trippartner/admin/get_users.php";
const UPLOADS_BASE = "http://localhost/trippartner/uploads/";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ token }).toString(),
      });
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setUsers(result.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setUsers([]);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("admintoken");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ 
          token,
          action: "delete",
          id 
        }).toString(),
      });
      const result = await response.json();
      if (result.success) {
        setUsers(prev => prev.filter(user => String(user.id) !== String(id)));
        toast.success("User deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete user.");
      }
    } catch (err) {
      toast.error("Error deleting user.");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/40";
    if (image.startsWith("http")) return image;
    // Remove ../uploads/ if present
    const clean = image.replace(/^\.\.\/uploads\//, "");
    return UPLOADS_BASE + clean;
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h3>User List</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img 
                  src={getImageUrl(user.image)} 
                  alt={user.name} 
                  width={40} 
                  height={40} 
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
              <td>
                <button 
                  className="admin-action-btn delete" 
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserList; 