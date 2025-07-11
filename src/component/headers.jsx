import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "./auth.js";



const Header = ({ logo }) => { const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

return ( 
   <>
      <header style={{ borderBottom: "0.2px solid grey", zIndex: 1 }} className="position-fixed top-0 start-0 w-100 z-5 blur-bg shadow-lg" >
        <nav className="container d-flex justify-content-between align-items-center py-3">
          <div className="fs-3 fw-bold">
            <img className="logo" src={logo} alt="logo" style={{ height: "40px" }} />
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="#" className="nav-link text-white"><i className="bi bi-sun-fill"></i> </Link> 
            <Link to="/login" className="btn btn-warning rounded">login</Link>
            <button onClick={toggleSidebar} className="btn btn-link text-white fs-2"> <i className="bi bi-list"></i> </button> 
          </div> 
        </nav> 
      </header>

  <div
    className={`position-fixed top-0 start-0 h-100 bg-dark text-white shadow-lg transition-all ${
      isSidebarOpen ? "d-block" : "d-none"
    }`}
    style={{ width: "250px", paddingTop: "80px", zIndex: 1050 }}
  >
    <ul className="text-secondary side-bar ps-3">
      <li className="nav-item mb-5">
        <Link to="/home" className="text-secondary">
        <i className="bi bi-grid me-2"></i> Dashboard
      </Link>
      </li>
      <li className="nav-item mb-5"><Link to="/plan" className="text-secondary">
        <i className="bi bi-cash me-2"></i> Plans
      </Link></li>
      <li className="nav-item mb-5">
        <Link to="/deposit" className="text-secondary">
        <i className="bi bi-bank me-2"></i> Deposit
      </Link>
      </li>
      <li className="nav-item mb-5">
        <Link to="/withdrawl" className="text-secondary">
        <i className="bi bi-arrow-down-right me-2"></i> Withdrawal
      </Link>
      </li>
      <li className="nav-item mb-5"><Link to="/transaction" className="text-secondary">
        <i className="bi bi-clock-history me-2"></i> Transaction
      </Link></li>
      <li className="nav-item mb-5">
         <Link to="/refferal" className="text-secondary">
        <i className="bi bi-people me-2"></i> Referral
      </Link>
      </li>
     <li className="nav-item mb-5">
       <Link to="/profile" className="text-secondary">
        <i className="bi bi-person-circle me-2"></i> Profile
      </Link>
     </li>
    </ul>
  </div>
</>

); };

export default Header;

