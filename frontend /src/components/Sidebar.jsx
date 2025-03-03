import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Sidebar = ({ role }) => {
  const { logout } = useContext(UserContext); 

  const menuItems = {
    Admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Employee", path: "/employee" },
      { name: "Billing", path: "/billing" },
      { name: "Stock", path: "/stock" },
    ],
    Employee: [
      { name: "Work Order", path: "/issue" },
      { name: "Task", path: "/task" },
      { name: "Quotation", path: "/quotation" },
      { name: "Checkout", path: "/checkout" },
    ],
  };

  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "250px", height: "100vh" }}>
      <h4 className="text-left mb-4">AutoFix Hub</h4>
      <nav className="nav flex-column">
        {menuItems[role]?.map((item) => (
          <Link key={item.name} to={item.path} className="nav-link text-white">
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto"> {/* Pushes the button to the bottom */}
        <button
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)", // White translucent background
            color: "#333", // Dark grey text
            border: "none", // Remove border
            padding: "8px 16px", // Add padding
            borderRadius: "4px", // Slightly rounded corners
            width: "100%", // Full width
            textAlign: "left", // Left-align text
            cursor: "pointer", // Pointer cursor on hover
            transition: "all 0.3s ease", // Smooth hover transition
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")} // Hover effect
          onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")} // Reset on mouse out
          onClick={logout} // Call the logout function on button click
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;