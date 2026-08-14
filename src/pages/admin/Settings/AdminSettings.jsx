import {
 Box,
 Button,
 Divider,
 FormControlLabel,
 MenuItem,
 Stack,
 Switch,
 TextField,
 Typography,
} from '@mui/material'
import { FiMoon, FiSave, FiShield } from 'react-icons/fi'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { useThemeMode } from '../../../context/ThemeModeContext'

function AdminSettings() {
 const { mode, toggleMode } = useThemeMode()

 return (
  <Stack spacing={3}>
   {/* Page header */}
   <Box>
    <Typography
     variant="h1"
     sx={{
      color: 'text.primary',
      fontSize: { xs: '1.8rem', md: '2.25rem' },
      fontWeight: 900,
      lineHeight: 1.2,
     }}
    >
     Admin Settings
    </Typography>

    <Typography
     color="text.secondary"
     sx={{
      mt: 0.75,
      fontSize: '0.925rem',
      lineHeight: 1.6,
     }}
    >
     Configure dashboard preferences, academy defaults, and notification behavior.
    </Typography>
   </Box>

   {/* Academy + Interface */}
   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: {
      xs: '1fr',
      lg: '1fr 1fr',
     },
     gap: 2,
    }}
   >
    {/* Academy Defaults */}
    <AdminSurface sx={{ p: { xs: 2.5, sm: 3 } }}>
     <Stack spacing={2.5}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
       <Box
        sx={{
         width: 38,
         height: 38,
         display: 'grid',
         placeItems: 'center',
         borderRadius: 1.25,
         bgcolor: 'action.hover',
         color: 'primary.main',
        }}
       >
        <FiShield size={18} />
       </Box>

       <Box>
        <Typography
         variant="h3"
         sx={{
          color: 'text.primary',
          fontSize: '1.15rem',
          fontWeight: 900,
         }}
        >
         Academy Defaults
        </Typography>

        <Typography
         color="text.secondary"
         sx={{
          mt: 0.2,
          fontSize: '0.78rem',
         }}
        >
         Configure your academy's basic defaults.
        </Typography>
       </Box>
      </Stack>

      <Divider />

      <TextField
       label="Academy name"
       defaultValue="Praksha Academy"
       fullWidth
      />

      <TextField
       label="Primary contact email"
       defaultValue="support@praksha.academy"
       type="email"
       fullWidth
      />

      <TextField
       select
       label="Default academic year"
       defaultValue="2026-2027"
       fullWidth
      >
       <MenuItem value="2026-2027">2026-2027</MenuItem>
       <MenuItem value="2027-2028">2027-2028</MenuItem>
      </TextField>

      <TextField
       select
       label="Default timezone"
       defaultValue="Asia/Kolkata"
       fullWidth
      >
       <MenuItem value="Asia/Kolkata">Asia/Kolkata</MenuItem>
       <MenuItem value="UTC">UTC</MenuItem>
      </TextField>
     </Stack>
    </AdminSurface>

    {/* Interface Preferences */}
    <AdminSurface sx={{ p: { xs: 2.5, sm: 3 } }}>
     <Stack spacing={2.5}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
       <Box
        sx={{
         width: 38,
         height: 38,
         display: 'grid',
         placeItems: 'center',
         borderRadius: 1.25,
         bgcolor: 'action.hover',
         color: 'primary.main',
        }}
       >
        <FiMoon size={18} />
       </Box>

       <Box>
        <Typography
         variant="h3"
         sx={{
          color: 'text.primary',
          fontSize: '1.15rem',
          fontWeight: 900,
         }}
        >
         Interface Preferences
        </Typography>

        <Typography
         color="text.secondary"
         sx={{
          mt: 0.2,
          fontSize: '0.78rem',
         }}
        >
         Personalize your admin dashboard experience.
        </Typography>
       </Box>
      </Stack>

      <Divider />

      <Box
       sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        py: 0.5,
       }}
      >
       <Box>
        <Typography
         sx={{
          color: 'text.primary',
          fontSize: '0.9rem',
          fontWeight: 800,
         }}
        >
         Dark mode
        </Typography>

        <Typography
         color="text.secondary"
         sx={{
          mt: 0.25,
          fontSize: '0.78rem',
         }}
        >
         Use the dark theme across the admin console.
        </Typography>
       </Box>

       <Switch
        checked={mode === 'dark'}
        onChange={toggleMode}
        inputProps={{ 'aria-label': 'Toggle dark mode' }}
       />
      </Box>

      <Divider />

      <Stack spacing={0.5}>
       <FormControlLabel
        control={<Switch defaultChecked />}
        label={
         <Box>
          <Typography
           sx={{
            color: 'text.primary',
            fontSize: '0.9rem',
            fontWeight: 800,
           }}
          >
           Email notifications
          </Typography>

          <Typography
           color="text.secondary"
           sx={{
            fontSize: '0.78rem',
           }}
          >
           Receive important administrative emails.
          </Typography>
         </Box>
        }
       />

       <FormControlLabel
        control={<Switch defaultChecked />}
        label={
         <Box>
          <Typography
           sx={{
            color: 'text.primary',
            fontSize: '0.9rem',
            fontWeight: 800,
           }}
          >
           Dashboard activity alerts
          </Typography>

          <Typography
           color="text.secondary"
           sx={{
            fontSize: '0.78rem',
           }}
          >
           Get alerts about important dashboard activity.
          </Typography>
         </Box>
        }
       />

       <FormControlLabel
        control={<Switch />}
        label={
         <Box>
          <Typography
           sx={{
            color: 'text.primary',
            fontSize: '0.9rem',
            fontWeight: 800,
           }}
          >
           Weekly summary report
          </Typography>

          <Typography
           color="text.secondary"
           sx={{
            fontSize: '0.78rem',
           }}
          >
           Receive a weekly overview of academy activity.
          </Typography>
         </Box>
        }
       />
      </Stack>
     </Stack>
    </AdminSurface>
   </Box>

   {/* Security */}
   <AdminSurface sx={{ p: { xs: 2.5, sm: 3 } }}>
    <Stack spacing={2.5}>
     <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
      <Box
       sx={{
        width: 38,
        height: 38,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 1.25,
        bgcolor: 'action.hover',
        color: 'primary.main',
       }}
      >
       <FiShield size={18} />
      </Box>

      <Box>
       <Typography
        variant="h3"
        sx={{
         color: 'text.primary',
         fontSize: '1.15rem',
         fontWeight: 900,
        }}
       >
        Security
       </Typography>

       <Typography
        color="text.secondary"
        sx={{
         mt: 0.2,
         fontSize: '0.78rem',
        }}
       >
        Configure administrator access preferences.
       </Typography>
      </Box>
     </Stack>

     <Divider />

     <Box
      sx={{
       display: 'grid',
       gridTemplateColumns: {
        xs: '1fr',
        md: '1fr 1fr',
       },
       gap: 2,
      }}
     >
      <TextField
       label="Session timeout"
       defaultValue="30 minutes"
       fullWidth
      />

      <TextField
       label="Allowed admin role"
       defaultValue="Super Admin, Operations Admin"
       fullWidth
      />
     </Box>

     <Stack
      direction="row"
      sx={{
       justifyContent: 'flex-end',
       pt: 0.5,
      }}
     >
      <Button
       variant="contained"
       startIcon={<FiSave size={16} />}
       sx={{
        minHeight: 42,
        px: 2.5,
        borderRadius: 1.25,
        fontWeight: 800,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
         boxShadow: 'none',
        },
       }}
      >
       Save Settings
      </Button>
     </Stack>
    </Stack>
   </AdminSurface>
  </Stack>
 )
}

export default AdminSettings
