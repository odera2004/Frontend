import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold">
          Auto<span className="text-warning">Fix Hub</span>
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/vehicle" className="nav-link" onClick={() => setMenuOpen(false)}>Vehicle</Link>
            </li>
            <li className="nav-item">
              <Link to="/work" className="nav-link" onClick={() => setMenuOpen(false)}>Work</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="btn btn-warning px-3" onClick={() => setMenuOpen(false)}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
