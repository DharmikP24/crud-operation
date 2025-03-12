import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users") // Ensure this matches your backend route
      .then((result) => {
        console.log("Fetched Users:", result.data);
        setUsers(result.data);
      })
      .catch((err) => console.log("Axios Error:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this user?")) { // Confirmation pop-up ✅
      axios
        .delete(`http://localhost:3001/deleteUser/${id}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== id)); // Update state without reload ✅
        })
        .catch((err) => console.log("Axios Error:", err));
    }
  };

  // Fix: Ensure user.name exists before calling toLowerCase()
  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to="/create" className="btn btn-success mb-2">Add</Link>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
