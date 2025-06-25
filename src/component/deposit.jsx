import React from "react";
import DepositForm from "./depositAssets/depositForm.jsx";
import AuthHeader from "./homeAssets/authHeader.jsx";
import logo from "../assets/logo.svg";
const Deposit = () =>{
  return (
    <div>
      <AuthHeader logo={ logo }/><br /><br /><br />
      <div className="container-fluid mt-5">
        <DepositForm />
      </div>
    </div>
  )
}


export default Deposit;