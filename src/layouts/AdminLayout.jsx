import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import TopNavbar from '../components/admin/TopNavbar'

function AdminLayout() {
 const [mobileOpen, setMobileOpen] = useState(false)

 return (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
   <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
   <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
    <TopNavbar onOpenSidebar={() => setMobileOpen(true)} />
    <Box
     component="main"
     sx={{
      flex: 1,
      width: '100%',
      px: { xs: 2, md: 3 },
      py: { xs: 2, md: 3 },
     }}
    >
     <Outlet />
    </Box>
   </Box>
  </Box>
 )
}

export default AdminLayout
