import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiYoutube } from "react-icons/si";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import "./Footer.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Quick Links Section */}
        <div className="footer-section quick-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li>
              <Link to="/x"><BsTwitterX /></Link>
            </li>
            <li>
              <Link to="/instagram"><FaInstagram /></Link>
            </li>
            <li>
              <Link to="/youtube"><SiYoutube /></Link>
            </li>
            <li>
              <Link to="/linkedin"><RiLinkedinBoxFill /></Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>CONTACT US</h3>
          <div className="email">
            <MdOutlineMail className="icon" />
            <p>
              <a href="mailto:habsa.abdirizack@student.moringaschool.com">
                habsa.abdirizack@student.moringaschool.com
              </a>
            </p>
            <p>
              <a href="mailto:melissa.kiptoo@student.moringaschool.com">
                melissa.kiptoo@student.moringaschool.com
              </a>
            </p>
            <p>
              <a href="mailto:eugine.odera@student.moringaschool.com">
                eugine.odera@student.moringaschool.com
              </a>
            </p>
          </div>

          <div className="phone">
            <FaPhoneAlt className="icon" />
            <p>
              <a href="tel:+254790698418">+254 790 698 418</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 www.garageautomation.com</p>
      </div>
    </footer>
  );
}

export default Footer;
