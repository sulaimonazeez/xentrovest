import React, { useEffect, useState } from "react";
import AuthHeader from "./homeAssets/authHeader.jsx";
import { BsArrowUpRight } from "react-icons/bs";
import axiosInstance from "./utility.jsx";
import logo from "../assets/logo.svg";

const TransactionSuccess = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDeposit = async () => {
      let response = await axiosInstance.get("/deposit/");
      if (response.status === 200 || response.status === 201) {
        setData(response.data);  // ✅ set the deposit list here
      }
    };

    fetchDeposit();
  }, []);

  return (
    <div>
      <AuthHeader logo={logo} />
      <br /><br /><br /><br />
      <div className="container-fluid">
        <h3 className="mt-4 text-light">Transactions</h3>

        <div style={{ backgroundColor: "#1f1f1f", maxWidth: "500px" }} className="p-3 mt-3 container-fluid rounded">
          <label className="text-secondary">All Transactions</label>
          <input
            type="search"
            className="form-control mt-3 text-light"
            placeholder="Search by Transaction ID"
            style={{ backgroundColor: "#2c2c2c", border: "none" }}
          />

          {/* ✅ Mapping transactions below */}
          {data.length === 0 ? (
            <p className="text-light mt-3">No transactions found</p>
          ) : (
            data.map((item, index) => (
              <div key={index} className="mt-2 rounded d-flex p-2" style={{ backgroundColor: "#2c2c2c", border: "none" }}>
                <div className="mt-3 me-2">
                  <BsArrowUpRight
                    style={{
                      backgroundColor: "#a3ffb0",
                      color: "#014421",
                      padding: "0.5rem",
                      borderRadius: "0.5rem"
                    }}
                    size={35}
                  />
                </div>
                <div className="me-1">
                  <p className="text-light sm mt-2">A Deposit of {item.amount} was...</p>
                  <p style={{ marginTop: "-0.60rem" }} className="sm text-warning">Pending</p>
                </div>
                <div className="mt-2">
                  <h6 className="fw-bold text-light">${item.amount}</h6>
                  <p className="text-secondary sm">{item.date || "Unknown Date"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;