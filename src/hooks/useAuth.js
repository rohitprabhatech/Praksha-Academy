/**
 * useAuth — hook wrapper around AuthContext.
 * Import from here instead of importing AuthContext directly.
 *
 * Usage:
 *   const { user, isAuthenticated, role, login, logout } = useAuth()
 */
export { useAuth } from '../context/AuthContext'
