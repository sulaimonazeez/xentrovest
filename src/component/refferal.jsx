import React, { useState } from "react";
import AuthHeader from "./homeAssets/authHeader.jsx";
import logo from "../assets/logo.svg";
import { BiCopy, BiSearch } from "react-icons/bi";
import "../css/home.css";

const Refferal = () => {
  const referralLink = "https://tradenex.netlify.app/register?ref=yourusername";
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-dark min-vh-100 text-light">
      <AuthHeader logo={logo} />
      <div className="container py-5">
        <h4 className="border-start border-warning ps-2 mb-4">Referrals</h4>

        {/* Referral Link Box */}
        <div className="bg-black p-4 rounded mb-4 shadow" style={{ maxWidth: "600px" }}>
          <label className="text-secondary mb-2">Referral Link</label>
         <div className="input-group mt-2">
            <input
              type="text"
              className="form-control bg-dark text-light border-0"
              value={referralLink}
              readOnly
            />
            <button className="btn btn-outline-dark text-secondary hover" onClick={handleCopy}>
              {copied ? "Copied":"Copy"}
            </button>
          </div>
        </div>

        {/* Referred Users Box */}
        <div className="bg-black p-4 rounded shadow" style={{ maxWidth: "600px" }}>
          <label className="text-secondary mb-2">Referred Users</label>
          <div className="d-flex align-items-center bg-dark p-2 rounded mb-3">
            <BiSearch className="text-secondary me-2" size={20} />
            <input
              type="text"
              placeholder="Search User"
              className="form-control text-light bg-dark border-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="text-end text-secondary">Total Referrals: 0</div>
        </div>
      </div>
    </div>
  );
};

export default Refferal;