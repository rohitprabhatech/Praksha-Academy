import { Box, Button, Checkbox, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { adminIdentity } from '../../../constants/adminDashboard'
import logoMark from '../../../assets/praksha-mark.png'

function AdminLogin() {
 const navigate = useNavigate()

 const handleSubmit = (event) => {
  event.preventDefault()
  navigate('/admin/dashboard')
 }

 return (
  <Box
   sx={{
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    px: 2,
    py: 4,
    bgcolor: 'background.default',
   }}
  >
   <AdminSurface sx={{ width: '100%', maxWidth: 440, p: { xs: 2.5, sm: 4 } }}>
    <Stack spacing={3}>
     <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Box component="img" src={logoMark} alt="Praksha Academy" sx={{ width: 54, height: 54, objectFit: 'contain' }} />
      <Typography variant="h1" sx={{ fontSize: '1.85rem', fontWeight: 900 }}>
       Admin Login
      </Typography>
      <Typography color="text.secondary">
       Sign in to manage Praksha Academy operations.
      </Typography>
     </Stack>

     <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField
       label="Administrator Email"
       type="email"
       placeholder={adminIdentity.email}
       fullWidth
       required
       slotProps={{
        input: {
         startAdornment: (
          <InputAdornment position="start">
           <FiMail size={18} />
          </InputAdornment>
         ),
        },
       }}
      />
      <TextField
       label="Password"
       type="password"
       placeholder="Enter password"
       fullWidth
       required
       slotProps={{
        input: {
         startAdornment: (
          <InputAdornment position="start">
           <FiLock size={18} />
          </InputAdornment>
         ),
        },
       }}
      />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
       <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
       <Typography component={RouterLink} to="/forgot-password" color="primary" sx={{ fontSize: '0.875rem', fontWeight: 800 }}>
        Forgot?
       </Typography>
      </Stack>
      <Button type="submit" variant="contained" size="large" endIcon={<FiArrowRight />}>
       Login to Dashboard
      </Button>
     </Stack>
    </Stack>
   </AdminSurface>
  </Box>
 )
}

export default AdminLogin
