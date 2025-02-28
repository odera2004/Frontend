// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import EmployeeLayout from "./components/EmployeeLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/User/Home";
import Vehicle from "./pages/User/Vehicle";
import Work from "./pages/User/WorkOrder";
import Billings from "./pages/User/Billings";
import Booking from "./pages/User/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Dashboard";
import Employee from "./pages/Admin/Employee";
import Billing from "./pages/Admin/Billing";
import Stock from "./pages/Admin/Stock";
import Task from "./pages/Employee/Task";
import WorkOrder from "./pages/Employee/Workorder";
import Checkout from "./pages/Employee/Checkout";
import Quotation from "./pages/Employee/Quotation";

import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";
import { PartsProvider } from "./context/PartsContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { PaymentProvider } from "./context/PaymentContext";
import { WorkOrderProvider } from "./context/WorkOrderContext";

function HomeRedirect() {
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    const isAuthenticated = !!sessionStorage.getItem("token");

    if (!isAuthenticated) {
      setRedirectPath("/login");
      return;
    }

    switch (userRole) {
      case "admin":
        setRedirectPath("/dashboard");
        break;
      case "technician":
      case "guard":
        setRedirectPath("/task");
        break;
      case "user":
        setRedirectPath("/home");
        break;
      default:
        setRedirectPath("/login");
    }
  }, []);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AdminProvider>
          <WorkOrderProvider>
          <EmployeeProvider>
            <PaymentProvider>
              <Routes>
                {/* Public routes accessible to everyone */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Default route redirects based on role */}
                <Route path="/" element={<HomeRedirect />} />

                {/* User routes with User layout */}
                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                  <Route element={<UserLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/veh" element={<Vehicle />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/billings" element={<Billings />} />
                    <Route path="/book" element={<Booking />} />
                  </Route>
                </Route>

                {/* Admin routes with Admin layout */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/stock" element={<Stock />} />
                  </Route>
                </Route>

                {/* Employee routes with Employee layout - Now accessible to both technician and guard */}
                <Route element={<ProtectedRoute allowedRoles={["technician", "guard"]} />}>
                  <Route element={<EmployeeLayout />}>
                    <Route path="/task" element={<Task />} />
                    <Route path="/issue" element={<WorkOrder />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/quotation" element={<Quotation />} />
                  </Route>
                </Route>

                {/* Catch-all route for any undefined paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              </PaymentProvider>
             <PartsProvider>
            </PartsProvider>
          </EmployeeProvider>
          </WorkOrderProvider>
        </AdminProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;