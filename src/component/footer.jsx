import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./footer.css";
const Footer = ({ logo }) => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row gy-4">

          {/* Logo + About */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <img src={logo} alt="Logo" style={{ width: "45px" }} />
              <h3 className="ms-2 mb-0">Xentrovest</h3>
            </div>
            <p className="text-secondary">
              Tradenex is a platform that allows novice traders to copy/mirror
              professional traders' positions. We provide all the resources you
              need to grow and elevate your trading journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-6 col-lg-2">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled text-secondary">
              <li>Home</li>
              <li>About</li>
              <li>Plans</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-6 col-lg-2">
            <h5 className="mb-3">Legal</h5>
            <ul className="list-unstyled text-secondary">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-6 col-md-6 col-lg-2">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled text-secondary">
              <li>Copy Trading</li>
              <li>Referral Program</li>
              <li>Blog</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <small className="text-secondary">
            © 2025 Xentrovest. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;