import React from "react";
import AuthHeader from "./homeAssets/authHeader.jsx";
import "../css/home.css";
import logo from "../assets/logo.svg";
import Dashboard from "./homeAssets/dashboard.jsx";
import LiveTrade from "./homeAssets/liveTrade.jsx";
import CryptoMarket from "./homeAssets/markets.jsx";
import RecentTransaction from "./homeAssets/recentTransaction.jsx";
//import Investment from "./homeAssets/investment.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Home = () =>{
  return (
    <div className="min-vh-100 bg-dark">
      <AuthHeader logo={ logo } /><br />
      <div className="p-3 mt-5 container-fluid"><br />
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