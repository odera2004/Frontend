import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

export const UserLayout = () => {
  return (
    <div className="page-container d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
        <ToastContainer/>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;