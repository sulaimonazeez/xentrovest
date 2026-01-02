import React from "react";
import Investment from "../component/homeAssets/investment.jsx";
import AuthHeader from "../component/homeAssets/authHeader.jsx";
import logo from "../assets/logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const HomeInvestment = () =>{
  return (
    <div className="bg-black min-vh-100">
      <AuthHeader logo={ logo } /><br /><br />
      <div style={{ backgroundColor: "#1C1C1C"}} className="p-3 bg-black container-fluid rounded">
          <h3 className="mt-5 text-light">Trading Plans</h3>
        <div className="row">
        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
          <Investment colors={'text-secondary'} plan={"Basic Plan"} amount={"$699 - $999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
        </div>
        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
          <Investment colors={'text-secondary'} plan={"Vast Plan"} amount={"$1,000 - $2,999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
        </div>
        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
          <Investment colors={'text-secondary'} plan={"Mega Plan"} amount={"$3,000 - $4,999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
        </div>
        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
          <Investment colors={'text-secondary'} plan={"Teran Plan"} amount={"$5,000 - Unlimited"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default HomeInvestment;