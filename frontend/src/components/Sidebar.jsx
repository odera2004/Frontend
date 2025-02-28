import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
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
    </div>
  );
};

export default Sidebar;
