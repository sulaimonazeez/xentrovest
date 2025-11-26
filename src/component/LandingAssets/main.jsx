import React from "react";
import Rate from "./rate.jsx";
import Market from "./markets.jsx";
import Icons from "./icons.jsx";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = ({img}) => {
  return (
    <div className="mainss">
     <div className="mx-md-auto bg-dark container-fluid text-md-center main-containers" style={{width: "fit-content"}}>
      <div className="mt-3"><br />
        <h1 className="main-header">Boost Your Earnings with Our <span className="text-warning">High-Yield</span> Crypto Platform</h1>
        <p className="main-text">Sign up today and take the first step towards financial growth with the power of cryptocurrency.</p>
      </div><div className="w-100 d-flex justify-content-center gap-3">
  <Link 
    to="/create" 
    className="font btn btn-warning rounded d-block w-md-25">
    Invest Now
    <i class="ms-2 bi bi-arrow-right"></i>
  </Link>

  <Link 
    to="/learn" 
    className="font btn btn-learn rounded d-block w-md-25">
    Learn More
  </Link>
</div>


     </div>
      <hr className="mt-5"/>
  <div className="container-fluid">
  <div className="rates mt-5 row justify-content-lg-center text-md-center">
    <div className="col-6 col-sm-4 col-lg-3"><Rate des={"Average Win Rate"} value={"95%"} /></div>
    <div className="col-6 col-sm-4 col-lg-3"><Rate des={"Profit Factor"} value={"1.85"} /></div>
    <div className="col-6 col-sm-4 col-lg-3"><Rate des={"Average Trade Duration"} value={"12 hours"} /></div>
  </div>
</div>

      <div className="mt-4 bg-black portfolio p-1">
        <p className="mt-5 text-center"><span className="text-primary">Markets</span> By TradingView</p>
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-6 col-xlg-6">
            <img className="mt-4 h-100 w-100" src={img} alt="BTC"/>
          </div>
          <div className="col-12 col-sm-6 col-lg-6 col-xlg-6 mt-5">
            <Market header={"We Have 10+ Years of experiance in standard professional services"} text={"A platform that allows novice traders to copy/mirror professional traders' positions. We create all of the materials to assist you in growing and progressing to the next level. We're delighted you came across Our Company. Don't pass up this chance to hear about what we do and the incredible team that makes it all possible! "}/>
        </div>
      </div>
      </div>
      <div className="mt-4 container-fluid">
        <h2 className="mb-3 text-center text-light">Features & Benefits</h2>
        <p className="text-center sm text-secondary">Everything you need to succeed in automated trading</p>
      </div>
      <div className="row container-fluid mt-5">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
          <Icons icon={"fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Financial Advisory"} text={"We offer financial advice leading to smart trading by automating processes and improving decision-making."}/>
          </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
          <Icons icon={"fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-bitcoin"} header={"Copy Trading"} text={"Copy trading allows you to directly copy the positions taken by another trader. You simply copy everything."}/>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
          <Icons icon={"fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-bar-chart-line"} header={"Forex Trading"} text={"Foreign Exchange Market, a global decentralized market for the trading of currencies"}/>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
            <Icons icon={"fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-credit-card"} header={"CFDs"} text={"Trade directly on CFDs without stress. You don't need a digital wallet or an account with an exchange."}/>
          </div>
      </div>
    </div>
  )
}

export default Main;