import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";

export const EmployeeLayout = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar role="Employee" />
      <div className="flex-grow-1 p-4 overflow-auto" style={{ width: "100%" }}>
        <Outlet />
        <ToastContainer/>
      </div>
    </div>
  );
};

export default EmployeeLayout;