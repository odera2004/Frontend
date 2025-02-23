import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "User");
  }, []);

  if (role === "User") {
    return (
      <div className="page-container d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar on the Left */}
      {(role === "Admin" || role === "Employee") && <Sidebar role={role} />}

      {/* Main Content on the Right */}
      <div className="flex-grow-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
