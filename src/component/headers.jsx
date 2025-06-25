import React from 'react';
import { Link } from "react-router-dom";
const Header = ({logo}) => {
  return (
    <header className="position-fixed top-0 start-0 w-100 z-3 blur-bg shadow-sm">
        <nav className="container d-flex justify-content-between align-items-center py-3">
          <div className="fs-3 fw-bold"><img className="logo" src={logo} alt="logo"/></div>
          <ul className="nav">
            <li className="nav-item">
              <Link to="#home" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="#services" className="nav-link text-white">Services</Link>
            </li>
            <li className="nav-item">
              <Link to="#about" className="nav-link text-white">About</Link>
            </li>
            <li className="nav-item">
              <Link to="#contact" className="nav-link text-white">Contact</Link>
            </li>
          </ul>
          <div className="inline-block">
            <Link to="#" className="nav-link text-white">
              <i className="bi bi-sun-fill"></i>
            </Link>
            <Link to='/login' className="btn btn-warning rounded">Login</Link>
              <Link to="#" className="nav-link text-white">
              <i class="bi bi-list fs-2"></i>
           </Link>
          </div>
          </nav>
      </header>
  )
}

export default Header;