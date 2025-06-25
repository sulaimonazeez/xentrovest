import React from "react";
import Header from "./headers.jsx";
import Footer from './footer.jsx';
import logo from "../assets/logo.svg";
import SignupForm from "./signupComponent.jsx";

const SignUp = () =>{
  return (
    <div>
      <Header logo={ logo }/>
        <SignupForm />
      <Footer logo={ logo }/>
    </div>
  )
}

export default SignUp;