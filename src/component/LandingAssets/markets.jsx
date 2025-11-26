import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Market = ({header, text}) => {
  return (
    <div className="container-fluid">
      <h2 className="fw-bold fs-0 text-light"> { header }</h2>
      <p className="text sm">{ text }</p>
      <Link to="#" className="btn rounded btn-warning p-2 w-50"><span>Learn More</span></Link>
    </div>
  );
}

export default Market