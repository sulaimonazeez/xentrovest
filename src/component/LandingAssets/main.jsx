import React from "react";
import Rate from "./rate.jsx";
import Market from "./markets.jsx";
import Icons from "./icons.jsx";
import { Link } from "react-router-dom";

const Main = ({img}) => {
  return (
    <div className="mainss">
     <div className="container-fluid">
      <div>
        <h1 className="main-header">Boost Your Earnings with Our <span className="text-warning">High-Yield</span> Crypto Platform</h1>
        <p className="main-text">Sign up today and take the first step towards financial growth with the power of cryptocurrency.</p>
      </div>
      <div className="w-100 d-flex">
        <Link to="/create" className="btn rounded btn-warning w-50">Invest Now</Link>
        <Link to="/learn" className="btn rounded btn-learn">Learn More</Link>
        
      </div>
     </div>
      <hr className="mt-5"/>
    <div className="container-fluid">
      <div className="mt-5 row">
        <div className="col-xs-6 col-sm-6 col-lg-4 col-6 col-xlg-4"><Rate des={"Average Win Rate"} value={"95%"} /></div>
        <div className="col-xs-6 col-6  col-sm-6 col-lg-4 col-xlg-4"><Rate des={"Profit Factor"} value={"1.85"} /></div>
        <div className="col-xs-6 col-6 col-sm-6 col-lg-4 col-xlg-4"><Rate des={"Average Trade Duration"} value={"12 hours"} /></div>
      </div>
    </div>
      <div className="mt-4 bg-black portfolio p-1">
        <p className="mt-5 text-center"><span className="text-primary">Markets</span> By TradingView</p>
        <img className="mt-5 w-100" src={img} alt="BTC"/>
        <div className="mb-5">
          <Market header={"We Have 10+ Years of experiance in standard professional services"} text={"A platform that allows novice traders to copy/mirror professional traders' positions. We create all of the materials to assist you in growing and progressing to the next level. We're delighted you came across Our Company. Don't pass up this chance to hear about what we do and the incredible team that makes it all possible! "}/>
        </div>
      </div>
      <div className="mt-4 container-fluid">
        <h2 className="mb-3 text-center text-light">Features & Benefits</h2>
        <p className="text-center sm text-secondary">Everything you need to succeed in automated trading</p>
      </div>
      <div className="container-fluid mb-5">
        <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Financial Advisory"} text={"We offer financial advice leading to smart trading by automating processes and improving decision-making."}/>
        <Icons icon={"mt-4 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-bitcoin"} header={"Copy Trading"} text={"Copy trading allows you to directly copy the positions taken by another trader. You simply copy everything."}/>
        <Icons icon={"mt-4 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-bar-chart-line"} header={"Forex Trading"} text={"Foreign Exchange Market, a global decentralized market for the trading of currencies"}/>
        <Icons icon={"mt-4 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-credit-card"} header={"CFDs"} text={"Trade directly on CFDs without stress. You don't need a digital wallet or an account with an exchange."}/>
      </div>
    </div>
  )
}

export default Main;