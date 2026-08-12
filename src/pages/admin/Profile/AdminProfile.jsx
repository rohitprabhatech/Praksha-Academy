import { Avatar, Box, Button, Chip, Stack, TextField, Typography } from '@mui/material'
import { FiEdit3, FiMail, FiPhone, FiShield, FiUser } from 'react-icons/fi'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { adminIdentity } from '../../../constants/adminDashboard'

function AdminProfile() {
 return (
  <Stack spacing={3}>
   <Box>
    <Typography variant="h1" sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' }, fontWeight: 900 }}>
     Admin Profile
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
     Manage your admin identity and contact details.
    </Typography>
   </Box>

   <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '340px minmax(0, 1fr)' }, gap: 2 }}>
    <AdminSurface sx={{ p: 3 }}>
     <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Avatar sx={{ width: 86, height: 86, bgcolor: 'primary.main' }}>
       <FiUser size={34} aria-hidden="true" />
      </Avatar>
      <Box>
       <Typography sx={{ fontSize: '1.25rem', fontWeight: 900 }}>{adminIdentity.name}</Typography>
       <Typography color="text.secondary">{adminIdentity.role}</Typography>
      </Box>
      <Chip icon={<FiShield size={16} />} label="Super Admin" color="primary" />
      <Stack spacing={1.2} sx={{ width: '100%', textAlign: 'left' }}>
       <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
        <FiMail />
        <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>{adminIdentity.email}</Typography>
       </Stack>
       <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
        <FiPhone />
        <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>{adminIdentity.phone}</Typography>
       </Stack>
      </Stack>
     </Stack>
    </AdminSurface>

    <AdminSurface sx={{ p: 3 }}>
     <Stack spacing={2.5}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
       <Typography variant="h3" sx={{ fontSize: '1.2rem' }}>
        Profile Details
       </Typography>
       <Button variant="outlined" startIcon={<FiEdit3 />}>
        Edit
       </Button>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
       <TextField label="Name" defaultValue={adminIdentity.name} fullWidth />
       <TextField label="Role" defaultValue={adminIdentity.role} fullWidth />
       <TextField label="Email" defaultValue={adminIdentity.email} fullWidth />
       <TextField label="Phone" defaultValue={adminIdentity.phone} fullWidth />
       <TextField label="Department" defaultValue={adminIdentity.department} fullWidth />
       <TextField label="Location" defaultValue={adminIdentity.location} fullWidth />
      </Box>
      <TextField
       label="Bio"
       defaultValue="Responsible for managing academy operations, dashboard preferences, profile information, and administrative settings."
       fullWidth
       multiline
       minRows={4}
      />
      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
       <Button variant="contained">Save Changes</Button>
      </Stack>
     </Stack>
    </AdminSurface>
   </Box>
  </Stack>
 )
}

export default AdminProfile
