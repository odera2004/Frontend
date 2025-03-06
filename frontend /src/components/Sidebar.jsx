import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Sidebar = ({ role }) => {
  const { logout } = useContext(UserContext); 
  const menuItems = {
    Admin: [
      { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
      { name: "Employee", path: "/employee", icon: "bi-people" },
      { name: "Billing", path: "/billing", icon: "bi-receipt" },
      { name: "Stock", path: "/stock", icon: "bi-box" },
    ],
    Employee: [
      { name: "Work Order", path: "/issue", icon: "bi-clipboard-check" },
      { name: "Task", path: "/task", icon: "bi-list-task" },
      { name: "Quotation", path: "/quotation", icon: "bi-file-earmark-text" },
      { name: "Checkout", path: "/checkout", icon: "bi-cart-check" },
    ],
  };
  
  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "250px", height: "100vh" }}>
      <h4 className="text-left mb-4">
        <i className="bi bi-tools me-2"></i>
        AutoFix Hub
      </h4>
      
      <nav className="nav flex-column">
        {menuItems[role]?.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className="nav-link text-white d-flex align-items-center mb-2 ps-2"
            style={{
              borderRadius: "4px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.name}
          </Link>
        ))}
      </nav>
      
      {/* Logout Button - Yellow */}
      <div className="mt-auto">
        <button
          style={{
            backgroundColor: "#ffc107", 
            color: "#212529", 
            border: "none",
            padding: "10px 16px",
            borderRadius: "4px",
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontWeight: "500",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ffca2c")} 
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;