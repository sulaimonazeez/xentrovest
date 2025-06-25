import React from "react";
import AuthHeader from "./homeAssets/authHeader.jsx";
import "../css/home.css";
import logo from "../assets/logo.svg";
import Dashboard from "./homeAssets/dashboard.jsx";
import LiveTrade from "./homeAssets/liveTrade.jsx";
import CryptoMarket from "./homeAssets/markets.jsx";
import RecentTransaction from "./homeAssets/recentTransaction.jsx";
import Investment from "./homeAssets/investment.jsx";


const Home = () =>{
  return (
    <div>
      <AuthHeader logo={ logo } /><br />
      <div className="mt-5 container-fluid"><br />
        <h3 className="mt-1 text-light">Dashboard</h3>
        <Dashboard />
        <LiveTrade />
        <CryptoMarket />
        <RecentTransaction />
      </div>
    </div>
  )
}

export default Home;