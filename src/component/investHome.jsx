import React from "react";
import Investment from "./homeAssets/investment.jsx";
import AuthHeader from "./homeAssets/authHeader.jsx";
import logo from "../assets/logo.svg";

const HomeInvestment = () =>{
  return (
    <div>
      <AuthHeader logo={ logo } /><br /><br />
      <div style={{ backgroundColor: "#1C1C1C"}} className="p-3 bg-black container-fluid rounded">
          <h3 className="mt-5 text-light">Trading Plans</h3>
          <Investment colors={'text-secondary'} plan={"Basic Plan"} amount={"$699 - $999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
          
          <Investment colors={'text-secondary'} plan={"Vast Plan"} amount={"$1,000 - $2,999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
          
          <Investment colors={'text-secondary'} plan={"Mega Plan"} amount={"$3,000 - $4,999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
          
          <Investment colors={'text-secondary'} plan={"Teran Plan"} amount={"$5,000 - Unlimited"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
      </div>
    </div>
  )
}

export default HomeInvestment;