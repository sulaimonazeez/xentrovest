import React from "react";
import Header from "./headers.jsx";
import Footer from './footer.jsx';
import logo from "../assets/logo.svg";
import SignupForm from "./signupComponent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SignUp = () =>{
  return (
    <div className="bg-black min-vh-100">
      <Header logo={ logo }/>
        <SignupForm />
      <Footer logo={ logo }/>
    </div>
  )
}

export default SignUp;