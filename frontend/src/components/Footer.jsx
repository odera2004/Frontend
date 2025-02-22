import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto w-100 position-fixed bottom-0">
      <div className="container-fluid">
        <div className="row align-items-center text-center text-md-start">
          {/* Branding */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold">MyWebsite</h5>
            <p className="small mb-0">Your trusted website for amazing content.</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white text-decoration-none me-4 small ${
                  isActive ? "fw-bold border-bottom border-light" : "hover-underline"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white text-decoration-none me-4 small ${
                  isActive ? "fw-bold border-bottom border-light" : "hover-underline"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white text-decoration-none small ${
                  isActive ? "fw-bold border-bottom border-light" : "hover-underline"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-4 text-center text-md-end">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none me-3 fs-5"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none me-3 fs-5"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none fs-5"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="text-center mt-3 small border-top pt-3">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
