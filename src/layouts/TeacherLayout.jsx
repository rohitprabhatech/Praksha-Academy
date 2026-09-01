import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoader from '../components/common/PageLoader';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import TeacherSidebar, { SIDEBAR_WIDTH } from '../components/teacher/Sidebar';

/* Visible keyboard focus ring — only on :focus-visible */
const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
    borderRadius: '6px',
  },
};

const TeacherLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <TeacherSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile / Tablet top bar */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #E2E8F0',
            px: 2,
            py: 1.5,
          }}
        >
          <IconButton
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            sx={{ color: '#1E293B', ...focusRingSx }}
          >
            <FiMenu size={22} />
          </IconButton>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1E293B',
            }}
          >
            Praksha Academy — Teacher Portal
          </Typography>
        </Stack>

        {/* Main page content */}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: `calc(1200px + ${SIDEBAR_WIDTH}px)`,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Suspense fallback={<PageLoader minHeight={300} label="Loading page..." />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherLayout;
