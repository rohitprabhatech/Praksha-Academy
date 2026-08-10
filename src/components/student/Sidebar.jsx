import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Drawer, IconButton } from '@mui/material';
import {
  FiGrid,
  FiBookOpen,
  FiHeart,
  FiAward,
  FiBell,
  FiUser,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import praksaMark from '../../assets/praksha-mark.png';

export const SIDEBAR_WIDTH = 260;

const STUDENT_NAV_ITEMS = [
  { label: 'Dashboard', path: '/student/dashboard', icon: FiGrid },
  { label: 'My Courses', path: '/student/courses', icon: FiBookOpen },
  { label: 'Wishlist', path: '/student/wishlist', icon: FiHeart },
  { label: 'Certificates', path: '/student/certificates', icon: FiAward },
  { label: 'Notifications', path: '/student/notifications', icon: FiBell },
  { label: 'Profile', path: '/student/profile', icon: FiUser },
];

/* Visible keyboard focus ring — only on :focus-visible */
const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
  },
};

/* Boundary-safe active check — startsWith alone would false-match a future
   route like /student/courses-archive against /student/courses */
const isPathActive = (pathname, itemPath) =>
  pathname === itemPath || pathname.startsWith(`${itemPath}/`);

const NavItem = ({ label, path, icon: Icon, isActive, onNavigate }) => (
  <Box
    component={RouterLink}
    to={path}
    onClick={onNavigate}
    aria-current={isActive ? 'page' : undefined}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: 2,
      py: 1.25,
      borderRadius: '10px',
      textDecoration: 'none',
      color: isActive ? '#2563EB' : '#475569',
      bgcolor: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
      fontFamily: 'Inter, sans-serif',
      fontWeight: isActive ? 600 : 500,
      fontSize: '0.9375rem',
      transition: 'background-color 0.15s ease, color 0.15s ease',
      '&:hover': {
        bgcolor: isActive ? 'rgba(37, 99, 235, 0.1)' : '#F8FAFC',
        color: '#2563EB',
      },
      ...focusRingSx,
    }}
  >
    <Icon size={19} aria-hidden="true" />
    <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
      {label}
    </Typography>
  </Box>
);

const SidebarContent = ({ pathname, onNavigate, showCloseButton, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // No backend integration yet — simulate logout
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Stack
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        py: 3,
        px: 2,
      }}
    >
      {/* Brand lockup — same logo asset used on the auth pages */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, mb: 4 }}
      >
        <Stack
          component={RouterLink}
          to="/"
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ textDecoration: 'none' }}
        >
          <Box
            component="img"
            src={praksaMark}
            alt="Praksha Academy"
            sx={{ width: 32, height: 'auto', flexShrink: 0 }}
          />
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1E293B',
            }}
          >
            Praksha Academy
          </Typography>
        </Stack>

        {showCloseButton && (
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close menu"
            sx={{ color: '#64748B', ...focusRingSx }}
          >
            <FiX size={20} />
          </IconButton>
        )}
      </Stack>

      {/* Navigation */}
      <Stack component="nav" aria-label="Student navigation" spacing={0.5} sx={{ flex: 1 }}>
        {STUDENT_NAV_ITEMS.map((item) => (
          <NavItem
            key={item.path}
            {...item}
            isActive={isPathActive(pathname, item.path)}
            onNavigate={onNavigate}
          />
        ))}
      </Stack>

      {/* Logout — label already says what it does, no tooltip needed */}
      <Box sx={{ borderTop: '1px solid #E2E8F0', pt: 2, mt: 2 }}>
        <Box
          component="button"
          type="button"
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            width: '100%',
            px: 2,
            py: 1.25,
            border: 'none',
            borderRadius: '10px',
            bgcolor: 'transparent',
            color: '#EF4444',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.9375rem',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: 'rgba(239, 68, 68, 0.08)',
            },
            ...focusRingSx,
          }}
        >
          <FiLogOut size={19} aria-hidden="true" />
          <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
            Logout
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

/**
 * Student sidebar navigation.
 * Desktop: permanent, always visible.
 * Mobile: controlled Drawer — pass `mobileOpen` + `onClose` from the parent layout.
 */
const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop permanent sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <SidebarContent pathname={pathname} showCloseButton={false} />
      </Box>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent
          pathname={pathname}
          onNavigate={onClose}
          showCloseButton
          onClose={onClose}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;