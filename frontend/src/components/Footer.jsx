import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiYoutube } from "react-icons/si";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Quick Links Section */}
          <div className="col-md-6">
            <h5>QUICK LINKS</h5>
            <ul className="list-unstyled d-flex gap-3">
              <li>
                <Link to="/x" className="text-white fs-4">
                  <BsTwitterX />
                </Link>
              </li>
              <li>
                <Link to="/instagram" className="text-white fs-4">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to="/youtube" className="text-white fs-4">
                  <SiYoutube />
                </Link>
              </li>
              <li>
                <Link to="/linkedin" className="text-white fs-4">
                  <RiLinkedinBoxFill />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="col-md-6">
            <h5>CONTACT US</h5>
            <div>
              <MdOutlineMail className="me-2 fs-4" />
              <a
                href="mailto:habsa.abdirizack@student.moringaschool.com"
                className="text-white d-block"
              >
                habsa.abdirizack@student.moringaschool.com
              </a>
              <a
                href="mailto:melissa.kiptoo@student.moringaschool.com"
                className="text-white d-block"
              >
                melissa.kiptoo@student.moringaschool.com
              </a>
              <a
                href="mailto:eugine.odera@student.moringaschool.com"
                className="text-white d-block"
              >
                eugine.odera@student.moringaschool.com
              </a>
            </div>

            <div className="mt-2">
              <FaPhoneAlt className="me-2 fs-5" />
              <a href="tel:+254790698418" className="text-white">
                +254 790 698 418
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-3">
        <p className="mb-0">&copy; 2025 www.garageautomation.com</p>
      </div>
    </footer>
  );
}

export default Footer;
