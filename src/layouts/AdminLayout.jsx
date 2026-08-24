import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import AdminSidebar, { ADMIN_SIDEBAR_WIDTH } from '../components/admin/AdminSidebar';
import TopNavbar from '../components/admin/TopNavbar';

/**
 * Single chrome for every /admin/* page (Sprint 01).
 *
 * Previously this hand-rolled its own small "mobile top bar" (a hamburger
 * + hardcoded title) instead of using the existing TopNavbar component,
 * which was built (Breadcrumb, search, theme toggle, notifications,
 * profile menu) but never actually mounted anywhere. This now renders
 * TopNavbar for every admin page, at every width — TopNavbar handles its
 * own internal responsiveness (hiding search on small screens, etc.).
 */
const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopNavbar onOpenSidebar={() => setMobileOpen(true)} />

        {/* Page content */}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: `calc(1280px + ${ADMIN_SIDEBAR_WIDTH}px)`,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
