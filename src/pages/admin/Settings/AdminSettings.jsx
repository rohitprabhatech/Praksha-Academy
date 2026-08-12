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
import { FiSave } from 'react-icons/fi'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { useThemeMode } from '../../../context/ThemeModeContext'

function AdminSettings() {
 const { mode, toggleMode } = useThemeMode()

 return (
  <Stack spacing={3}>
   <Box>
    <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, fontWeight: 900 }}>
     Admin Settings
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
     Configure dashboard preferences, academy defaults, and notification behavior.
    </Typography>
   </Box>

   <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2 }}>
    <AdminSurface sx={{ p: 3 }}>
     <Stack spacing={2.5}>
      <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
       Academy Defaults
      </Typography>
      <TextField label="Academy name" defaultValue="Praksha Academy" fullWidth />
      <TextField label="Primary contact email" defaultValue="support@praksha.academy" fullWidth />
      <TextField select label="Default academic year" defaultValue="2026-2027" fullWidth>
       <MenuItem value="2026-2027">2026-2027</MenuItem>
       <MenuItem value="2027-2028">2027-2028</MenuItem>
      </TextField>
      <TextField select label="Default timezone" defaultValue="Asia/Kolkata" fullWidth>
       <MenuItem value="Asia/Kolkata">Asia/Kolkata</MenuItem>
       <MenuItem value="UTC">UTC</MenuItem>
      </TextField>
     </Stack>
    </AdminSurface>

    <AdminSurface sx={{ p: 3 }}>
     <Stack spacing={2.5}>
      <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
       Interface Preferences
      </Typography>
      <FormControlLabel
       control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
       label="Dark mode"
      />
      <Divider />
      <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
      <FormControlLabel control={<Switch defaultChecked />} label="Dashboard activity alerts" />
      <FormControlLabel control={<Switch />} label="Weekly summary report" />
     </Stack>
    </AdminSurface>
   </Box>

   <AdminSurface sx={{ p: 3 }}>
    <Stack spacing={2.5}>
     <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
      Security
     </Typography>
     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
      <TextField label="Session timeout" defaultValue="30 minutes" fullWidth />
      <TextField label="Allowed admin role" defaultValue="Super Admin, Operations Admin" fullWidth />
     </Box>
     <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
      <Button variant="contained" startIcon={<FiSave />}>
       Save Settings
      </Button>
     </Stack>
    </Stack>
   </AdminSurface>
  </Stack>
 )
}

export default AdminSettings
