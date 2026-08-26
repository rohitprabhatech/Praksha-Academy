import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// 1. Add "children" to the props here
const RequireRole = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (!roles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // 2. If it has children, render them. Otherwise, act like a layout (Outlet)
  return children ? children : <Outlet />;
};

export default RequireRole;