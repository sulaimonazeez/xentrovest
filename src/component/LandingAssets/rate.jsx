import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Rate = ({des, value}) => {
  return (
    <div className="grid-wrapper">
      <p className="description">{ des }</p>
      <h2 className="utp-up text-light fw-bold">{ value }</h2>
    </div>
  )
}

export default Rate;