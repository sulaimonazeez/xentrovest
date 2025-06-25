import React from "react";

const Market = ({header, text}) => {
  return (
    <div className="container-fluid">
      <h2 className="fw-bold text-light"> { header }</h2>
      <p className="text sm">{ text }</p>
      <a href="#" className="btn rounded btn-warning p-2 w-50"><span>Learn More</span></a>
    </div>
  );
}

export default Market