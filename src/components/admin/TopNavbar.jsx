import { Box, IconButton, InputBase, Stack, Tooltip, Typography } from '@mui/material'
import { FiMenu, FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { useThemeMode } from '../../context/ThemeModeContext'
import Breadcrumb from './Breadcrumb'
import NotificationDropdown from './NotificationDropdown'
import ProfileMenu from './ProfileMenu'

const getPageTitle = (pathname) => {
 const segment = pathname.split('/').filter(Boolean).at(-1) || 'dashboard'
 return segment
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')
}

function TopNavbar({ onOpenSidebar }) {
 const { mode, toggleMode } = useThemeMode()
 const { pathname } = useLocation()

 return (
  <Box
   component="header"
   sx={{
    position: 'sticky',
    top: 0,
    zIndex: 20,
    bgcolor: 'background.default',
    borderBottom: '1px solid',
    borderColor: 'divider',
    px: { xs: 2, md: 3 },
    py: 1.5,
   }}
  >
   <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
    <IconButton
     onClick={onOpenSidebar}
     aria-label="Open admin menu"
     sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: 'text.secondary' }}
    >
     <FiMenu size={22} />
    </IconButton>
    <Box sx={{ minWidth: 0, flex: 1 }}>
     <Typography sx={{ fontSize: { xs: '1rem', sm: '1.12rem' }, fontWeight: 800, lineHeight: 1.25 }}>
      {getPageTitle(pathname)}
     </Typography>
     <Box sx={{ display: { xs: 'none', sm: 'block' }, mt: 0.3 }}>
      <Breadcrumb />
     </Box>
    </Box>
    <Box
     sx={{
      display: { xs: 'none', md: 'flex' },
      alignItems: 'center',
      gap: 1,
      width: 260,
      px: 1.5,
      py: 0.55,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 999,
      bgcolor: 'background.paper',
      color: 'text.secondary',
     }}
    >
     <FiSearch size={16} />
     <InputBase placeholder="Search admin..." aria-label="Search admin" fullWidth sx={{ fontSize: '0.875rem' }} />
    </Box>
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
     <IconButton onClick={toggleMode} aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {mode === 'dark' ? <FiSun size={19} /> : <FiMoon size={19} />}
     </IconButton>
    </Tooltip>
    <NotificationDropdown />
    <ProfileMenu />
   </Stack>
  </Box>
 )
}

export default TopNavbar
