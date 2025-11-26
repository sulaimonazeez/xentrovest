import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LiveTrade = () =>{
  return (
    <div style={{ backgroundColor: "#1C1C1C"}} className="container-fluid rounded p-3 mt-5">
      <p className="sm text-secondary">Ongoing Trade</p>
      <p className="mt-3 text-center sm text-secondary">No ongoing trades yet</p>
      <div className="text-center">
        <Link style={{ backgroundColor: "#2A2A2A"}} className="rounded btn fw-bold text-light text-center p-2" to="/subcribe"><span style={{ marginRight: "0.50rem"}} className="bi bi-star"></span> Subscribe to a plan </Link>
      </div>
    </div>
  )
}

export default LiveTrade;