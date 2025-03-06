import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { logout } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid"> 
        <NavLink className="navbar-brand text-light d-flex align-items-center" to="/"> 
          <img src={logo} alt="Logo" width="50" height="50" />
          <span className="ms-2">Auto Fix Hub</span> 
        </NavLink>
        <button
          className="navbar-toggler border-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/" activeClassName="active">Home</NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/work" activeClassName="active">Work</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/billings" activeClassName="active">Billings</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/book" activeClassName="active">Book</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/profile" activeClassName="active">Profile</NavLink>
            </li>
           
            <li className="nav-item">
              <button onClick={logout} className="nav-link text-light" style={{ cursor: "pointer", background: "none", border: "none" }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;