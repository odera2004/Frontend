import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Check if user has permission to access this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect based on role
    switch(userRole) {
      case "admin":
        return <Navigate to="/dashboard" replace />;
      case "technician":
      case "guard":
        return <Navigate to="/task" replace />;
      case "user":
      default:
        return <Navigate to="/home" replace />;
    }
  }
  
  return <Outlet />;
};

export default ProtectedRoute;