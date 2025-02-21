import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-dark"> 
        <Link className="navbar-brand text-light d-flex align-items-center" to="/"> 
          <img src={logo} alt="Logo" width="50" height="50" />
          <span className="ms-2">Auto Fix Hub</span> 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/vehicle">Vehicle</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/work">Work</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/billings">Billings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/book">Book</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
