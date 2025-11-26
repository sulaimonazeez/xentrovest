import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./css/nav.css";


const NavBar = () => {
  return (
    <header className="skyblue d-flex align-items-center justify-content-center p-4">
      <div className="text-center">
        <h4 className="text-warning mb-2">Administration Panel</h4>
        <div className="d-flex align-items-center justify-content-center flex-nowrap">
  <p className="small fw-bold text-warning mb-0 me-2">Welcome, admin</p>
  <Link className="small fw-bold text-light text-decoration-none d-inline" to="/">VIEW SITE /</Link>
  <Link className="small fw-bold text-light text-decoration-none d-inline" to="/"><small>CHANGE PASSWORD /</small></Link>
  <Link className="small fw-bold text-light text-decoration-none d-inline" to="/"><small>LOGOUT</small></Link>
</div>
      </div>
    </header>
  );
};

export default NavBar;