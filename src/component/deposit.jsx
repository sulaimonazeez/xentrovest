import React from "react";
import DepositForm from "./depositAssets/depositForm.jsx";
import AuthHeader from "./homeAssets/authHeader.jsx";
import logo from "../assets/logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Deposit = () =>{
  return (
    <div className="min-vh-100 bg-dark">
      <AuthHeader logo={ logo }/><br /><br /><br />
      <div style={{maxWidth:"500px"}} className="mx-auto container-fluid mt-5">
        <DepositForm />
      </div>
    </div>
  )
}


export default Deposit;