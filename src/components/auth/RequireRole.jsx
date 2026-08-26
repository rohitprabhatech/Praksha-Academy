import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// 1. Add "children" to the props here
const RequireRole = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles]

  // Not logged in
  if (!isAuthenticated) {
    const isAdminRoute =
      location.pathname.startsWith('/admin')

    return (
      <Navigate
        to={isAdminRoute ? '/admin/login' : '/login'}
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  // Role not allowed
  if (!roles.includes(role)) {
    return <Navigate to="/access-denied" replace />
  }

  // 2. If it has children, render them. Otherwise, act like a layout (Outlet)
  return children ? children : <Outlet />;
};

export default RequireRole