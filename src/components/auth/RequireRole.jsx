import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RequireRole = ({ allowedRoles }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles]

  // Not logged in
  if (!user) {
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

  // Logged in but wrong role
  if (!roles.includes(user.role)) {
    return (
      <Navigate
        to="/access-denied"
        replace
      />
    )
  }

  return <Outlet />
}

export default RequireRole