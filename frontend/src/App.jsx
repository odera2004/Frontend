import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Vehicle from "./pages/Vehicle";
import Work from "./pages/WorkOrder";

import Billings from "./pages/Billings";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/work" element={<Work />} />
        <Route path="/billings" element={<Billings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
