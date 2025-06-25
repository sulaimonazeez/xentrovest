import React from "react";

const Footer = ({ logo }) =>{
  return (
    <div>
      <div className="container-fluid">
          <div className="d-flex"><img className="img logo" src={logo} alt="Logo"/><h3 style={{ position: "relative", "left":"0.60rem"}} className="mt-1 text-light">Xentrovest</h3></div>
          <p className="mt-3 sm text-secondary">Tradenex is a platform that allows novice traders to copy/mirror professional traders' positions. We create all of the materials to assist you in growing and progressing to the next level. We're delighted you came across Our Company.</p>
          <div className="row mt-5">
            <div className="col-xs-12 col-sm-12 col-lg-4 col-12">
              <h3 className="text-light">Quick Links</h3>
              <ul>
                <li className="sm text-secondary">Home</li>
                <li className="sm text-secondary">About</li>
                <li className="sm text-secondary">Plans</li>
                <li className="sm text-secondary">Contact</li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-4 col-12">
              <h3 className="text-light">Legal</h3>
              <ul>
                <li className="sm text-secondary">Terms of Service</li>
                <li className="sm text-secondary">Privacy Policy</li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-12 col-lg-4 col-12">
              <h3 className="text-light">Company</h3>
              <ul>
                <li className="sm text-secondary">Copy Trading</li>
                <li className="sm text-secondary">Referral Program</li>
                <li className="sm text-secondary">Blog</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{height:"8rem"}} className="bg-black text-center">
          <p className="p-5 mt-5 text-secondary text-center">© 2025 Xentrovest. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer;