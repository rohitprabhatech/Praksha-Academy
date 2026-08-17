import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import TopNavbar from '../components/admin/TopNavbar'

function AdminLayout() {
 const [mobileOpen, setMobileOpen] = useState(false)

 return (
  <Box
   sx={{
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#162231' : '#F4F7FB'),
   }}
  >
   <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
   <Box
    sx={{
     flex: 1,
     minWidth: 0,
     display: 'flex',
     flexDirection: 'column',
     height: '100vh',
    }}
   >
    <TopNavbar onOpenSidebar={() => setMobileOpen(true)} />
    <Box
     component="main"
     sx={{
      flex: 1,
      width: '100%',
      overflowY: 'auto',
      px: { xs: 2, sm: 2.5, lg: 3.25 },
      py: { xs: 2, md: 3 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#162231' : '#F4F7FB'),
     }}
    >
     <Box sx={{ width: '100%', maxWidth: 1480, mx: 'auto' }}>
      <Outlet />
     </Box>
    </Box>
   </Box>
  </Box>
 )
}

export default AdminLayout
