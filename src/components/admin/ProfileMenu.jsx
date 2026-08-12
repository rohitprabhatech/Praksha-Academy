import {
 Avatar,
 Divider,
 ListItemIcon,
 Menu,
 MenuItem,
 Stack,
 Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { adminIdentity } from '../../constants/adminDashboard'

function ProfileMenu() {
 const [anchorEl, setAnchorEl] = useState(null)
 const navigate = useNavigate()
 const open = Boolean(anchorEl)

 const goTo = (path) => {
  setAnchorEl(null)
  navigate(path)
 }

 return (
  <>
   <Stack
    component="button"
    type="button"
    direction="row"
    spacing={1}
    onClick={(event) => setAnchorEl(event.currentTarget)}
    aria-label="Open profile menu"
    aria-controls={open ? 'admin-profile-menu' : undefined}
    aria-haspopup="menu"
    aria-expanded={open ? 'true' : undefined}
    sx={{
     border: '1px solid',
     borderColor: 'divider',
     bgcolor: 'background.paper',
     borderRadius: 999,
     p: 0.5,
     pr: { xs: 0.5, sm: 1.25 },
     cursor: 'pointer',
     alignItems: 'center',
    }}
   >
    <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>
     <FiUser size={17} aria-hidden="true" />
    </Avatar>
    <Typography
     sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '0.875rem', fontWeight: 800, color: 'text.primary' }}
    >
     {adminIdentity.name}
    </Typography>
   </Stack>
   <Menu
    id="admin-profile-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={() => setAnchorEl(null)}
    slotProps={{ paper: { sx: { minWidth: 220, mt: 1 } } }}
   >
    <Stack sx={{ px: 2, py: 1.25 }}>
     <Typography sx={{ fontSize: '0.9rem', fontWeight: 800 }}>{adminIdentity.name}</Typography>
     <Typography color="text.secondary" sx={{ fontSize: '0.76rem' }}>
      {adminIdentity.role}
     </Typography>
    </Stack>
    <Divider />
    <MenuItem onClick={() => goTo('/admin/profile')}>
     <ListItemIcon>
      <FiUser size={18} />
     </ListItemIcon>
     Profile
    </MenuItem>
    <MenuItem onClick={() => goTo('/admin/settings')}>
     <ListItemIcon>
      <FiSettings size={18} />
     </ListItemIcon>
     Settings
    </MenuItem>
    <Divider />
    <MenuItem onClick={() => goTo('/admin/login')} sx={{ color: 'error.main' }}>
     <ListItemIcon sx={{ color: 'error.main' }}>
      <FiLogOut size={18} />
     </ListItemIcon>
     Logout
    </MenuItem>
   </Menu>
  </>
 )
}

export default ProfileMenu
