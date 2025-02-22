import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MyApp</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarSupportedContent" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehicle">Vehicle</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workorder">Work Order</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-3" onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
