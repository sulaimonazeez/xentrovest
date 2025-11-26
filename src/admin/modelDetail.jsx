import React, { useEffect, useState } from "react";
import NavBar from "./navbar.jsx";
import { useParams } from "react-router-dom";
import UserTable from "./userTable.jsx";
import axiosInstance from "../component/utility.jsx";

const ModelDetail = () => {
  const { model } = useParams();
  const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null); // user to edit
const [formData, setFormData] = useState({ fullname: "", email: "" });

const handleEdit = (user) => {
  setSelectedUser(user);
  setFormData(user); // pre-fill form
};
const handleUpdate = async () => {
  try {
    await axiosInstance.put(`/model/${model}/${selectedUser._id}`, formData);
    alert("Updated successfully!");
    setSelectedUser(null);
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        let response = await axiosInstance.get(`/model/${model}`);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (model) fetchDetail();
  }, [model]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/model/${model}/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <UserTable handleEdit={ handleEdit } data={users} onDelete={handleDelete} />
      {selectedUser && (
  <div className="modal show d-block">
    <div className="modal-dialog">
      <div className="modal-content bg-dark text-light">
        <div className="modal-header">
          <h5 className="modal-title">Edit {model}</h5>
          <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
        </div>

        <div className="modal-body">
          {Object.keys(formData).map((field) => {
            if (
              field === "_id" ||
              field === "createdAt" ||
              field === "updatedAt" ||
              field === "__v" ||
              field === "password"
            ) return null;

            return (
              <div key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={formData[field] || ""}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Cancel</button>
          <button className="btn btn-success" onClick={handleUpdate}>Save</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ModelDetail;