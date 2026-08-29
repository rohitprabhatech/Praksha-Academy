import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Drawer, IconButton, Divider } from '@mui/material';
import {
  FiGrid,
  FiFileText,
  FiImage,
  FiHelpCircle,
  FiStar,
  FiBell,
  FiMessageSquare,
  FiBarChart2,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiTrendingUp,
  FiLogOut,
  FiX,
} from 'react-icons/fi';

import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

import praksaMark from '../../assets/praksha-mark.png';

export const ADMIN_SIDEBAR_WIDTH = 268;

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Blog', path: '/admin/blog', icon: FiFileText },
      { label: 'Gallery', path: '/admin/gallery', icon: FiImage },
      { label: 'FAQ', path: '/admin/faq', icon: FiHelpCircle },
      { label: 'Testimonials', path: '/admin/testimonials', icon: FiStar },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Student Management', path: '/admin/students', icon: FiUsers },
    ],
  },
  {
    label: 'Communication',
    items: [
      { label: 'Notifications', path: '/admin/notifications', icon: FiBell },
      { label: 'Contact Messages', path: '/admin/contact-messages', icon: FiMessageSquare },
    ],
  },
  {
    label: 'Reports',
    items: [
      { label: 'Student Reports', path: '/admin/reports/students', icon: FiUsers },
      { label: 'Course Reports', path: '/admin/reports/courses', icon: FiBookOpen },
      { label: 'Revenue Reports', path: '/admin/reports/revenue', icon: FiDollarSign },
      { label: 'Performance', path: '/admin/reports/performance', icon: FiTrendingUp },
    ],
  },
];

const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
    borderRadius: '6px',
  },
};

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
      px: 1.75,
      py: 1.1,
      borderRadius: '10px',
      textDecoration: 'none',
      color: isActive ? '#2563EB' : '#475569',
      bgcolor: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
      fontFamily: 'Inter, sans-serif',
      fontWeight: isActive ? 600 : 500,
      fontSize: '0.9rem',
      transition: 'background-color 0.15s ease, color 0.15s ease',
      '&:hover': {
        bgcolor: isActive ? 'rgba(37, 99, 235, 0.1)' : '#F8FAFC',
        color: '#2563EB',
      },
      ...focusRingSx,
    }}
  >
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '8px',
        bgcolor: isActive ? 'rgba(37, 99, 235, 0.12)' : 'rgba(100, 116, 139, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background-color 0.15s ease',
      }}
    >
      <Icon size={16} aria-hidden="true" color={isActive ? '#2563EB' : '#64748B'} />
    </Box>
    <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
      {label}
    </Typography>
  </Box>
);

const SidebarContent = ({ pathname, onNavigate, showCloseButton, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    if (onClose) {
      onClose();
    }

    toast.success('Logged out successfully');

    navigate('/admin/login', { replace: true });
  };

  return (
    <Stack
      sx={{
        width: ADMIN_SIDEBAR_WIDTH,
        height: '100%',
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        py: 3,
        px: 2,
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#E2E8F0', borderRadius: 999 },
      }}
    >
      {/* Brand */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, mb: 3.5 }}
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
            sx={{ width: 30, height: 'auto', flexShrink: 0 }}
          />
          <Stack spacing={0}>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#1E293B',
                lineHeight: 1.2,
              }}
            >
              Praksha Academy
            </Typography>
            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>
              Admin Panel
            </Typography>
          </Stack>
        </Stack>

        {showCloseButton && (
          <IconButton onClick={onClose} size="small" aria-label="Close menu" sx={{ color: '#64748B', ...focusRingSx }}>
            <FiX size={20} />
          </IconButton>
        )}
      </Stack>

      {/* Navigation Groups */}
      <Stack component="nav" aria-label="Admin navigation" spacing={0} sx={{ flex: 1 }}>
        {NAV_GROUPS.map((group, groupIndex) => (
          <Box key={group.label} sx={{ mb: 0.5 }}>
            {groupIndex > 0 && <Divider sx={{ my: 1.5, borderColor: '#F1F5F9' }} />}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                px: 1.75,
                pb: 0.75,
                pt: groupIndex === 0 ? 0 : 0.5,
              }}
            >
              {group.label}
            </Typography>
            <Stack spacing={0.25}>
              {group.items.map((item) => (
                <NavItem
                  key={item.path}
                  {...item}
                  isActive={isPathActive(pathname, item.path)}
                  onNavigate={onNavigate}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Logout */}
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
            px: 1.75,
            py: 1.1,
            border: 'none',
            borderRadius: '10px',
            bgcolor: 'transparent',
            color: '#EF4444',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' },
            ...focusRingSx,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: 'rgba(239, 68, 68, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FiLogOut size={16} aria-hidden="true" color="#EF4444" />
          </Box>
          <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
            Logout
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

/**
 * Admin sidebar navigation.
 * Desktop: permanent sidebar. Mobile: temporary Drawer.
 */
const AdminSidebar = ({ mobileOpen = false, onClose = () => { } }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop permanent sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: ADMIN_SIDEBAR_WIDTH,
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
            width: ADMIN_SIDEBAR_WIDTH,
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

export default AdminSidebar;
