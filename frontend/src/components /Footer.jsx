import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiYoutube } from "react-icons/si";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
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
              <Link to="youtube"><SiYoutube /></Link>
            </li>
            <li>
              <Link to="linkedin"><RiLinkedinBoxFill /></Link>
            </li>
            
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-section contact-info">
          <div className="email">
            <MdOutlineMail className="icon" />
            <p>habsa.abdirizack@student.moringaschool.com</p>
            <p>melissa.kiptoo@student.moringaschool.com</p>
            <p>eugine.odera@student.moringaschool.com</p>
            
          </div>
          <div className="phone">
            <FaPhoneAlt className="icon" />
            <p>
              <a href="tel:+254790698418">+254 790698418</a>
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
