import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import AdminLogin from '../pages/admin/Login/AdminLogin'
import AdminProfile from '../pages/admin/Profile/AdminProfile'
import AdminSettings from '../pages/admin/Settings/AdminSettings'
import NotFound from '../pages/NotFound'

function AdminRoutes() {
 return (
  <Routes>
   <Route path="login" element={<AdminLogin />} />
   <Route element={<AdminLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<AdminProfile />} />
    <Route path="settings" element={<AdminSettings />} />
   </Route>
   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}

export default AdminRoutes
