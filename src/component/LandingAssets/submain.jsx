import React from 'react';
import Box from "./box.jsx";
import Icons from "./icons.jsx";
import GetInTouchForm from "./contactForm.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import TestimonialCarousel from "./testimonial.jsx";
import FAQAccordion from "./question.jsx";
const SubMain = ({ logo }) => {
  return (
    <div className="main mt-5">
      <div className="bg-black p-4">
         <h2 className="text-center text-light">Our Plans</h2>
         <p className="sm mt-3 text-center text-secondary">Choose the plan that best suits your needs.</p>
         
         <div className="row p-2">
           <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
            <Box plan={"Basic Plan"} amount={"$699 - $999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"} colors={""}/>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
            <Box colors={"border border-warning"} plan={"Basic Plan"} amount={"$699 - $999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
            <Box colors={""} plan={"Basic Plan"} amount={"$699 - $999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xlg-4">
           <Box colors={"border border-warning"} plan={"Basic Plan"} amount={"$699 - $999"} level1={"8% ROI each day"} level2={"Running 12 days"} level3={"24/7 Support"}/>
         </div>
        </div>
      </div>
      <div className="p-3 container-fluid">
        <h2 className="mt-2 text-center text-light">Why Choose Us</h2>
        <p className="sm text-center mt-2 text-secondary">Here are a few reasons why you should choose Tradenex.</p>
        
        <div className="p-2 row">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
            <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Real-time data"} text={"Transact Crypto, Forex, ETFs and other investments anywhere at any time."}/>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
            <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"24/7 Online Support"} text={"Our team of professionals and investment experts are always here to support you."}/>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
            <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Higher Security"} text={"Protection against third-party attacks and full data encryption."}/>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
          <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Multiple Deposit Options"} text={"You can deposit from any crypto wallet and your crypto assets will be stored securely."}/>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
          <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Instant Withdrawal"} text={"Withdrawals are processed instantly after confirmation."}/>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xlg-6">
          <Icons icon={"mt-5 fs-4 p-2 bg-warning-transparent text-warning rounded bi bi-currency-exchange"} header={"Transparency"} text={"Performance statistics, including Requote, Slippage, and Order Execution."}/>
        </div>
        </div>
      </div>
      <div className="bg-dark mb-5 "><br />
          <h3 className="mt-3 mb-2 text-light text-center">Testimonials</h3>
          <p className="text-center sm text-secondary">Here are a few reviews from our clients.</p>
          <TestimonialCarousel />
        </div>
        <div className="container-fluid">
          <h3 className="text-light text-center mt-3 mb-3">Frequently Asked Questions</h3>
          <p className="text-center sm text-secondary">Everything you need to know about Tradenex</p>
          <FAQAccordion />
        </div>
        <div className="bg-dark rounded container-fluid mb-5"><br/>
          <h3 className="text-light text-center mt-3 mb-3"> Get in touch with us</h3>
          <p className="text-center sm text-secondary">We're here to help you. If you have any questions, please don't hesitate to contact us.</p>
          <GetInTouchForm />
        </div>
    </div>
  )
}

export default SubMain;