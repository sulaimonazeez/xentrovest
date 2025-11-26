import React, { useState } from "react";
import AuthHeader from "./homeAssets/authHeader.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../assets/logo.svg";
import axiosInstance from "./utility.jsx";

const WithdrawBTC = () => {
  const [btcAddress, setBtcAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!btcAddress || !amount || !password) {
      setMessage({ type: "danger", text: "All fields are required" });
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/withdraw/", {
        btc_address: btcAddress,
        amount,
        password,
      });
      setLoading(false);

      if (res.status === 200 || res.status === 201) {
        setMessage({ type: "success", text: "Withdrawal Request Sent Successfully" });
        setBtcAddress("");
        setAmount("");
        setPassword("");
      }
    } catch (error) {
      setLoading(false);
      setMessage({ type: "danger", text: error?.response?.data?.error || "Something went wrong" });
    }
  };

  return (
    <div className="bg-dark min-vh-100 text-light">
      <AuthHeader logo={logo} />
      <div className="container mt-5 pt-5" style={{ maxWidth: "500px" }}>
        <h4 className="mt-5 mb-4 border-start border-warning ps-2">Withdraw BTC</h4>

        <div className="bg-black rounded p-4 shadow">
          {message && (
            <div className={`alert alert-${message.type} py-2`} role="alert">
              {message.text}
            </div>
          )}
          <form onSubmit={handleWithdraw}>
            <div className="mb-3">
              <label className="form-label text-light">BTC Wallet Address</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-0"
                placeholder="Enter BTC wallet address"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Amount (in USD)</label>
              <input
                type="number"
                className="form-control bg-dark text-light border-0"
                placeholder="Enter amount in USD"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-0"
                placeholder="Confirm password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold"
              disabled={loading}
            >
              {loading ? "Processing..." : "Withdraw BTC"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawBTC;