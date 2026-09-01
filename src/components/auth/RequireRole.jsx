import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RequireRole = ({ allowedRoles }) => {
  const { getRoleUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles]

  // Find if any allowed role has an active session
  const activeUser = roles
    .map((role) => getRoleUser(role))
    .find((u) => Boolean(u))

  if (!activeUser) {
    // If user is authenticated with another role, redirect to access-denied
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
      return (
        <Navigate
          to="/access-denied"
          replace
          state={{
            from: location.pathname,
          }}
        />
      );
    }

    const isAdminRoute =
      location.pathname.startsWith('/admin') || roles.includes('admin');

    return (
      <Navigate
        to={isAdminRoute ? '/admin/login' : '/login'}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />
}

export default RequireRole