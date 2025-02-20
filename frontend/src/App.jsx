import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard"
import Employee from "./pages/Admin/Employee"
import Billing from "./pages/Admin/Billing"
import Stock from "./pages/Admin/Stock"
import Task from "./pages/Employee/Task"
import WorkOrder from "./pages/Employee/Workorder";
import Checkout from "./pages/Employee/Checkout";
import Quotation from "./pages/Employee/Quotation";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/task" element={<Task />} />
        <Route path="/issue" element={<WorkOrder />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/quotation" element={<Quotation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
