import {
 Badge,
 Box,
 Divider,
 IconButton,
 Menu,
 MenuItem,
 Stack,
 Tooltip,
 Typography,
} from '@mui/material'
import { useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { notifications } from '../../constants/adminDashboard'

function NotificationDropdown() {
 const [anchorEl, setAnchorEl] = useState(null)
 const open = Boolean(anchorEl)

 return (
  <>
   <Tooltip title="Notifications">
    <IconButton
     onClick={(event) => setAnchorEl(event.currentTarget)}
     aria-label="Open notifications"
     aria-controls={open ? 'admin-notifications-menu' : undefined}
     aria-haspopup="menu"
     aria-expanded={open ? 'true' : undefined}
     sx={{ color: 'text.secondary' }}
    >
     <Badge badgeContent={notifications.length} color="secondary">
      <FiBell size={19} />
     </Badge>
    </IconButton>
   </Tooltip>
   <Menu
    id="admin-notifications-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={() => setAnchorEl(null)}
    slotProps={{ paper: { sx: { width: 320, maxWidth: 'calc(100vw - 32px)', mt: 1 } } }}
   >
    <Box sx={{ px: 2, py: 1.25 }}>
     <Typography sx={{ fontWeight: 800 }}>Notifications</Typography>
    </Box>
    <Divider />
    {notifications.map((item) => (
     <MenuItem key={item.title} onClick={() => setAnchorEl(null)} sx={{ py: 1.25 }}>
      <Stack spacing={0.4}>
       <Typography sx={{ fontSize: '0.875rem', fontWeight: 700 }}>{item.title}</Typography>
       <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>
        {item.time}
       </Typography>
      </Stack>
     </MenuItem>
    ))}
   </Menu>
  </>
 )
}

export default NotificationDropdown
