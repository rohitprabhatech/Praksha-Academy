import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Profile', icon: <PersonIcon />, path: '/admin/profile' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isMobile }) => {
  const theme = useTheme();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SchoolIcon color="primary" fontSize="large" />
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Praksha Academy
        </Typography>
      </Box>
      <Divider />
      
      <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: '8px',
                '&.active': {
                  bgcolor: theme.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
                  color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/admin/login"
            sx={{
              borderRadius: '8px',
              color: 'error.main',
              '& .MuiListItemIcon-root': {
                color: 'error.main',
              },
              '&:hover': {
                bgcolor: 'error.light',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ fontWeight: 500 }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: theme.shadows[4]
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
