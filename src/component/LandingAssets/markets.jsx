import React from "react";
import { Link } from "react-router-dom";
const Market = ({header, text}) => {
  return (
    <div className="container-fluid">
      <h2 className="fw-bold text-light"> { header }</h2>
      <p className="text sm">{ text }</p>
      <Link to="#" className="btn rounded btn-warning p-2 w-50"><span>Learn More</span></Link>
    </div>
  );
}

export default Market