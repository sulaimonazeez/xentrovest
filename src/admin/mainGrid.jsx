import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/main.css";

const MainGrid = ({databaseName}) =>{
  const navigate = useNavigate();
  return (
    <div className="p-2 container-fluid d-flex justify-content-between">
      <p className="cursor fw-bold text-primary" onClick={()=>{
            navigate(`/admin/${databaseName}`);
          }}>{ databaseName }</p>
      <div className="d-flex gap-4">
        <p className="text-primary">Add</p>
        <p className="text-primary">Change</p>
      </div>
    </div>
  )
}

export default MainGrid;