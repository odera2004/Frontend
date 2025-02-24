import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/User/Home";
import Vehicle from "./pages/User/Vehicle";
import Work from "./pages/User/WorkOrder";
import Billings from "./pages/User/Billings";
import Booking from "./pages/User/Booking";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Footer from "./components/Footer";

import './App.css';

function App() {
  return (
    // ROUTING
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/work" element={<Work />} />
        <Route path="/billings" element={<Billings />} />
        <Route path="/book" element={<Booking />} /> 

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
