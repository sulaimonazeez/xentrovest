import React from "react";
import AuthHeader from "./homeAssets/authHeader.jsx";
import logo from "../assets/logo.svg";

const Profile = () => {
  const user = {
    name: "Ade VidXpert",
    email: "hacihod638@saproy.com",
    initials: "AV",
    referralLink: "https://tradenex.netlify.app/register/12345",
    phone: "+234 800 000 0000",
    country: "Nigeria",
    status: "Active"
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
            <span className="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill">{user.status}</span>
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
            <button className="btn btn-outline-dark text-secondary" onClick={handleCopy}>
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
              defaultValue={user.phone}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Country</label>
            <input
              type="text"
              className="form-control bg-dark text-secondary border-0"
              defaultValue={user.country}
            />
          </div>
          <button className="btn btn-warning w-100 fw-bold text-dark">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;