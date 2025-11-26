import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = ({ logo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Header */}
      <header
        style={{ borderBottom: "0.2px solid grey", zIndex: 1 }}
        className="position-fixed top-0 start-0 w-100 shadow-lg bg-dark"
      >
        <nav className="container d-flex justify-content-between align-items-center py-3">
          {/* Logo */}
          <div className="fs-3 fw-bold">
            <img src={logo} alt="logo" style={{ height: "40px" }} />
          </div>

          {/* Desktop Menu (visible md and above) */}
          <div className="d-none d-md-flex align-items-center gap-4">
            <Link to="/home" className="nav-link text-white">Dashboard</Link>
            <Link to="/plan" className="nav-link text-white">Plans</Link>
            <Link to="/deposit" className="nav-link text-white">Deposit</Link>
            <Link to="/withdrawl" className="nav-link text-white">Withdrawal</Link>
            <Link to="/transaction" className="nav-link text-white">Transaction</Link>
            <Link to="/refferal" className="nav-link text-white">Referral</Link>
            <Link to="/profile" className="nav-link text-white">Profile</Link>
          </div>

          {/* Mobile Icons */}
          <div className="d-flex d-md-none align-items-center gap-3">
            <Link to="#" className="nav-link text-white"><i className="bi bi-sun-fill"></i></Link>
            <Link to="/login" className="btn btn-warning rounded">login</Link>
            <button onClick={toggleSidebar} className="btn btn-link text-white fs-2">
              <i className="bi bi-list"></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar (Mobile Only) */}
      <div
        className={`d-md-none position-fixed top-0 start-0 h-100 bg-dark text-white shadow-lg ${
          isSidebarOpen ? "d-block" : "d-none"
        }`}
        style={{ width: "250px", paddingTop: "80px", zIndex: 1050 }}
      >
        <ul className="ms-4 list-unstyled ps-3">
          <li className="mb-4">
            <Link to="/home" className="text-secondary text-decoration-none"><i className="bi bi-grid me-2"></i> Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/plan" className="text-secondary text-decoration-none"><i className="bi bi-cash me-2"></i> Plans</Link>
          </li>
          <li className="mb-4">
            <Link to="/deposit" className="text-secondary text-decoration-none"><i className="bi bi-bank me-2"></i> Deposit</Link>
          </li>
          <li className="mb-4">
            <Link to="/withdrawl" className="text-decoration-none text-secondary"><i className="bi bi-arrow-down-right me-2"></i> Withdrawal</Link>
          </li>
          <li className="mb-4">
            <Link to="/transaction" className="text-decoration-none text-secondary"><i className="bi bi-clock-history me-2"></i> Transaction</Link>
          </li>
          <li className="mb-4">
            <Link to="/refferal" className="text-decoration-none text-secondary"><i className="bi bi-people me-2"></i> Referral</Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="text-decoration-none text-secondary"><i className="bi bi-person-circle me-2"></i> Profile</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;