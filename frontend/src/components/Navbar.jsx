import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import "./Navbar.css"; 

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          Auto<span>Fix Hub</span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navbar Links */}
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/vehicle" onClick={() => setMenuOpen(false)}>Vehicle</Link>
          </li>
          <li>
            <Link to="/work" onClick={() => setMenuOpen(false)}>Work</Link>
          </li>
          
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </li>
          <li>
            <Link to="/register" className="register-btn" onClick={() => setMenuOpen(false)}>Register</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
