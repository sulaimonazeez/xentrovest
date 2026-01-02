import React, { useEffect, useState } from "react";
import AuthHeader from "../component/homeAssets/authHeader.jsx";
//import { logout } from "../auth/auth";
//import axios from "axios";
import logo from "../assets/logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../api/utility.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Profile = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("loading...");
  const [firstName, setFirstName] = useState("loading...");
  const [lastName, setLastName] = useState("loading...");
  const [phone, setPhone] = useState("loading...");
  const [country, setCountry] = useState("loading...");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `${baseURL}/auth/profile/`);
        const data = response.data;
        const names = data.fullname ? data.fullname.split(" ") : ["", ""];
        setFirstName(names[0]);
        setLastName(names.slice(1).join(" "));
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setCountry(data.country || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [baseURL]);

  // Generate initials dynamically
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  const user = {
    name: `${firstName} ${lastName}`,
    email,
    initials,
    referralLink: "https://xentrovest.vercel.app/register/4636",
    phone,
    country,
    status: "Active",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="bg-dark min-vh-100 text-light">
      <AuthHeader logo={logo} />
      <div className="container pt-5" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4 border-start border-warning ps-2">Profile</h4>

        {/* User Details */}
        <div className="bg-black rounded p-4 mb-4 shadow">
          <h6 className="text-secondary">User Details</h6>
          <div className="text-center">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#f1b600",
                color: "#fff",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              {user.initials}
            </div>
            <h5 className="mt-3 fw-bold">{user.name}</h5>
            <p className="text-secondary text-decoration-underline">{user.email}</p>
            <span className="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill">
              {user.status}
            </span>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-black rounded p-4 mb-4 shadow">
          <h6 className="text-secondary">Referral Link</h6>
          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              value={user.referralLink}
              readOnly
            />
            <button
              className="btn btn-outline-dark text-secondary"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Update Info */}
        <div className="bg-black rounded p-4 shadow">
          <h6 className="text-secondary">Update Information</h6>
          <div className="mb-3">
            <label className="form-label text-light">Phone Number</label>
            <input
              type="text"
              className="form-control bg-dark text-secondary border-0"
              value={user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Country</label>
            <input
              type="text"
              className="form-control bg-dark text-secondary border-0"
              value={user.country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button className="btn btn-warning w-100 fw-bold text-dark">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;