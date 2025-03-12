import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import axios from "axios";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();  // ✅ Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createUser", { name, email, age })
      .then(() => {
        navigate("/");  // ✅ Redirect to home after adding user
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Age:</label>
            <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success me-2">Submit</button>
          
          {/* ✅ Add Back Button */}
          <button type="button" className="btn btn-success me-2 bg-black"  onClick={() => navigate("/")}>Back to Home</button>
        </form>
      </div>
    </div>
  );
}
