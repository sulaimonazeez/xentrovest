import React from "react";

const Rate = ({des, value}) => {
  return (
    <div className="grid-wrapper">
      <p className="description">{ des }</p>
      <h2 className="utp-up text-light fw-bold">{ value }</h2>
    </div>
  )
}

export default Rate;