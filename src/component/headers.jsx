import React from 'react';
import { Link } from "react-router-dom";
const Header = ({logo}) => {
  return (
    <header className="position-fixed top-0 start-0 w-100 z-3 blur-bg shadow-sm">
        <nav className="container d-flex justify-content-between align-items-center py-3">
          <div className="fs-3 fw-bold"><img className="logo" src={logo} /></div>
          <ul className="nav">
            <li className="nav-item">
              <a href="#home" className="nav-link text-white">Home</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link text-white">Services</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link text-white">About</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link text-white">Contact</a>
            </li>
          </ul>
          <div className="inline-block">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-sun-fill"></i>
            </a>
            <Link to='/login' className="btn btn-warning rounded">Login</Link>
              <a href="#" className="nav-link text-white">
              <i class="bi bi-list fs-2"></i>
           </a>
          </div>
          </nav>
      </header>
  )
}

export default Header;