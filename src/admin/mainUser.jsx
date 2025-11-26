import React from "react";
import MainGrid from "./mainGrid.jsx";
import { useNavigate } from "react-router-dom";

const MainUser = () =>{
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-3">
        <h5 className="text-light">Site administration</h5>
        <div className="row">
          <div className="col"><p className="p-2 skyblue text-light">AUTHENTICATION AND AUTHORIZATION</p></div>
          <div onClick={ ()=>{
            navigate("/admin/User")
          }} className=""><MainGrid databaseName="User"/></div>
          <div className="me-3 bg-dark"><MainGrid databaseName="Groups"/></div>
          
        </div>
      </div>
  )
}

export default MainUser;