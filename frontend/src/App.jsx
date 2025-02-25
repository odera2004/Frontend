import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
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

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Layout wraps all routes */}
          <Route path="/" element={<Layout />}>
            {/* User Routes */}
            <Route index element={<Home />} />
            <Route path="vehicle" element={<Vehicle />} />
            <Route path="work" element={<Work />} />
            <Route path="billings" element={<Billings />} />
            <Route path="book" element={<Booking />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employee" element={<Employee />} />
            <Route path="billing" element={<Billing />} />
            <Route path="stock" element={<Stock />} />

            {/* Employee Routes */}
            <Route path="task" element={<Task />} />
            <Route path="issue" element={<WorkOrder />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="quotation" element={<Quotation />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;