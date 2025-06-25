import React from "react";
import "../css/landingpage.css";
import logo from "../assets/logo.svg";
import {Link} from "react-router-dom";
import Main from "./LandingAssets/main.jsx";
import Footer from './footer.jsx';
import Header from "./headers.jsx";
import portfolio from "../assets/portfolio.svg";
import SubMain from "./LandingAssets/submain.jsx";


const Landing = () => {
  return (
    <div className="text-white min-vh-100">
      <Header logo={ logo }/>
      <div className="main">
        <Main img={ portfolio } />
        <SubMain logo={logo}/>
        <Footer logo={logo} />
      </div>
    </div>
  );
};

export default Landing;