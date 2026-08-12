import { Box, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FiLogOut, FiX } from 'react-icons/fi'
import { adminNavGroups, adminTokens } from '../../constants/adminDashboard'
import logoMark from '../../assets/praksha-mark.png'

export const ADMIN_SIDEBAR_WIDTH = 280

const isActivePath = (pathname, path) => pathname === path || pathname.startsWith(`${path}/`)

function SidebarContent({ onClose, showCloseButton = false }) {
 const { pathname } = useLocation()

 return (
  <Stack
   sx={{
    width: ADMIN_SIDEBAR_WIDTH,
    height: '100%',
    bgcolor: (theme) =>
     theme.palette.mode === 'dark' ? adminTokens.colors.sidebarDark : adminTokens.colors.sidebarLight,
    borderRight: '1px solid',
    borderColor: (theme) =>
     theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.16)' : 'rgba(37, 99, 235, 0.18)',
    px: 2,
    py: 2.5,
   }}
  >
   <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
    <Stack component={RouterLink} to="/admin/dashboard" direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
     <Box component="img" src={logoMark} alt="Praksha Academy" sx={{ width: 34, height: 34, objectFit: 'contain' }} />
     <Box>
      <Typography
       sx={{
        color: (theme) => (theme.palette.mode === 'dark' ? '#F8FAFC' : '#10233F'),
        fontWeight: 900,
        lineHeight: 1.1,
       }}
      >
       Praksha Academy
      </Typography>
      <Typography
       sx={{
        color: (theme) => (theme.palette.mode === 'dark' ? '#B8C7D9' : '#43627F'),
        fontSize: '0.75rem',
        fontWeight: 700,
       }}
      >
       Admin Console
      </Typography>
     </Box>
    </Stack>
    {showCloseButton && (
     <IconButton onClick={onClose} aria-label="Close admin menu">
      <FiX size={20} />
     </IconButton>
    )}
   </Stack>

   <Stack
    component="nav"
    aria-label="Admin navigation"
    spacing={2}
    sx={{
     flex: 1,
     overflowY: 'auto',
     pr: 0.5,
     mr: -0.5,
     '&::-webkit-scrollbar': { width: 6 },
     '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 999 },
    }}
   >
    {adminNavGroups.map((group) => (
     <Stack key={group.title} spacing={0.5}>
      <Typography
       sx={{
        px: 1.25,
        color: (theme) => (theme.palette.mode === 'dark' ? '#B8C7D9' : '#43627F'),
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
       }}
      >
       {group.title}
      </Typography>
      {group.items.map((item) => {
       const Icon = item.icon
       const active = isActivePath(pathname, item.path)

       return (
        <Tooltip key={item.path} title={item.disabled ? 'Assigned to another module' : ''} placement="right">
         <Box
          component={item.disabled ? 'div' : RouterLink}
          to={item.disabled ? undefined : item.path}
          onClick={item.disabled ? undefined : onClose}
          aria-current={active ? 'page' : undefined}
          aria-disabled={item.disabled ? 'true' : undefined}
          sx={{
           display: 'flex',
           alignItems: 'center',
           gap: 1.25,
           px: 1.25,
           py: 0.9,
           minHeight: 38,
           borderRadius: 1.25,
           borderLeft: '3px solid',
           borderLeftColor: active ? 'primary.main' : 'transparent',
           color: active
            ? 'primary.main'
            : item.disabled
              ? (theme) => (theme.palette.mode === 'dark' ? 'rgba(184, 199, 217, 0.46)' : 'rgba(67, 98, 127, 0.56)')
              : (theme) => (theme.palette.mode === 'dark' ? '#D8E4F2' : '#10233F'),
           bgcolor: active
            ? (theme) => (theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.22)' : 'rgba(37, 99, 235, 0.16)')
            : 'transparent',
           fontWeight: active ? 800 : 600,
           cursor: item.disabled ? 'not-allowed' : 'pointer',
           opacity: item.disabled ? 0.58 : 1,
           '&:hover': {
            bgcolor: item.disabled ? 'transparent' : 'action.hover',
            color: item.disabled
             ? (theme) => (theme.palette.mode === 'dark' ? 'rgba(184, 199, 217, 0.46)' : 'rgba(67, 98, 127, 0.56)')
             : 'primary.main',
           },
          }}
         >
          <Icon size={16} aria-hidden="true" />
          <Typography component="span" sx={{ flex: 1, fontSize: '0.86rem', fontWeight: 'inherit' }}>
           {item.label}
          </Typography>
         </Box>
        </Tooltip>
       )
      })}
     </Stack>
    ))}
   </Stack>

   <Box
    component={RouterLink}
    to="/admin/login"
    sx={{
     display: 'flex',
     alignItems: 'center',
     gap: 1.25,
     px: 1.5,
     py: 1.15,
     borderRadius: 1.5,
     color: 'error.main',
     fontWeight: 800,
     '&:hover': { bgcolor: 'action.hover' },
    }}
   >
    <FiLogOut size={18} />
    <Typography sx={{ fontSize: '0.9rem', fontWeight: 'inherit' }}>Logout</Typography>
   </Box>
  </Stack>
 )
}

function Sidebar({ mobileOpen, onClose }) {
 return (
  <>
   <Box
    component="aside"
    sx={{
     display: { xs: 'none', lg: 'block' },
     width: ADMIN_SIDEBAR_WIDTH,
     flexShrink: 0,
     position: 'sticky',
     top: 0,
     height: '100vh',
    }}
   >
    <SidebarContent />
   </Box>
   <Drawer
    variant="temporary"
    open={mobileOpen}
    onClose={onClose}
    ModalProps={{ keepMounted: true }}
    sx={{ display: { xs: 'block', lg: 'none' }, '& .MuiDrawer-paper': { border: 0 } }}
   >
    <SidebarContent showCloseButton onClose={onClose} />
   </Drawer>
  </>
 )
}

export default Sidebar
