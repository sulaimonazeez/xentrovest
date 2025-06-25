import React from "react";

const Icons = ({ icon, header, text }) =>{
  return (
    <div className="container-fluid">
      <i className={icon}></i>
      <h5 className="text-light mt-2">{ header }</h5>
      <p className="sm text-secondary">{ text }</p>
    </div>
  )
}

export default Icons;