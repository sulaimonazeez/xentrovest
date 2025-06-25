import React, { useEffect, useState } from "react";
import BalanceGrid from "./balanceGrid.jsx";
import axiosInstance from "../utility.jsx";
import { Link } from "react-router-dom";
const Dashboard = () =>{
  const [ balance, setBalance ] = useState(0);
  const [profit, setProfit] = useState(0);
  const [bonus, setBonus] = useState(0);


  useEffect(() => {
  const fetchBalance = async () => {
    try {
      const response = await axiosInstance.get("/balance/");
      if (response.status === 200 || response.status === 201) {
        setBalance(response.data.balance);
        setProfit(response.data.profit);
        setBonus(response.data.bonus);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Error Occurred");
    }
  };

  fetchBalance();
}, []);
  
  return (
    <div style={{ backgroundColor: "#1C1C1C"}} className="text-light container-fluid d-block p-2 rounded">
      <p className="mb-2 mt-2 sm text-secondary">Finanace</p>
      <BalanceGrid balance={balance} description={"TOTAL BALANCE"} icon={`bi bi-wallet`}/>
      <BalanceGrid balance={profit} description={"TOTAL PROFIT (ONGOING TRADE)"} icon={`bi bi-graph-up-arrow`}/>
      <BalanceGrid balance={bonus} description={"TOTAL BONUS"} icon={`bi bi-currency-exchange`}/>
      <div className="btns mt-3">
        <Link className="p-2 btn btn-warning rounded" to="/deposit">Deposit <span style={{position:"relative", left: "0.10rem"}} className="fw-bold bi bi-plus"></span></Link>
        <Link className="p-2 text-light btn rounded" style={{position: "relative", left: "0.60rem", backgroundColor:"#2A2A2A"}} to="/withdraw">Withdraw <span className="bi bi-arrow-down-right" style={{position:"relative", left: "0.10rem"}}></span></Link>
      </div>
    </div>
  )
}

export default Dashboard;