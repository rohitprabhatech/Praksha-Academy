import {
 Avatar,
 Box,
 Button,
 Chip,
 Divider,
 Stack,
 TextField,
 Typography,
} from '@mui/material'
import {
 FiEdit3,
 FiMail,
 FiMapPin,
 FiPhone,
 FiSave,
 FiShield,
 FiUser,
} from 'react-icons/fi'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { adminIdentity } from '../../../constants/adminDashboard'

function AdminProfile() {
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
     Admin Profile
    </Typography>

    <Typography
     color="text.secondary"
     sx={{
      mt: 0.75,
      fontSize: '0.925rem',
      lineHeight: 1.6,
     }}
    >
     Manage your admin identity and contact details.
    </Typography>
   </Box>

   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: {
      xs: '1fr',
      lg: '340px minmax(0, 1fr)',
     },
     gap: 2,
     alignItems: 'stretch',
    }}
   >
    {/* Profile summary */}
    <AdminSurface
     sx={{
      p: { xs: 2.5, sm: 3 },
      height: '100%',
     }}
    >
     <Stack spacing={2.5}>
      <Stack
       spacing={1.5}
       sx={{
        alignItems: 'center',
        textAlign: 'center',
       }}
      >
       <Box sx={{ position: 'relative' }}>
        <Avatar
         sx={{
          width: 92,
          height: 92,
          bgcolor: 'primary.main',
          color: '#FFFFFF',
          fontSize: '2rem',
          fontWeight: 900,
          boxShadow: (theme) =>
           theme.palette.mode === 'dark'
            ? '0 10px 30px rgba(0, 0, 0, 0.28)'
            : '0 10px 30px rgba(15, 23, 42, 0.14)',
         }}
        >
         <FiUser size={36} aria-hidden="true" />
        </Avatar>
       </Box>

       <Box>
        <Typography
         sx={{
          color: 'text.primary',
          fontSize: '1.25rem',
          fontWeight: 900,
         }}
        >
         {adminIdentity.name}
        </Typography>

        <Typography
         color="text.secondary"
         sx={{
          mt: 0.35,
          fontSize: '0.875rem',
          fontWeight: 600,
         }}
        >
         {adminIdentity.role}
        </Typography>
       </Box>

       <Chip
        icon={<FiShield size={15} />}
        label="Super Admin"
        color="primary"
        sx={{
         height: 30,
         fontWeight: 800,
         '& .MuiChip-icon': {
          color: 'inherit',
         },
        }}
       />
      </Stack>

      <Divider />

      {/* Contact information */}
      <Stack spacing={1.75}>
       <Typography
        sx={{
         color: 'text.primary',
         fontSize: '0.8rem',
         fontWeight: 900,
         letterSpacing: '0.06em',
         textTransform: 'uppercase',
        }}
       >
        Contact Information
       </Typography>

       <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
        <Box
         sx={{
          width: 34,
          height: 34,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          borderRadius: 1.25,
          bgcolor: 'action.hover',
          color: 'primary.main',
         }}
        >
         <FiMail size={16} aria-hidden="true" />
        </Box>

        <Box sx={{ minWidth: 0 }}>
         <Typography
          sx={{
           color: 'text.primary',
           fontSize: '0.8rem',
           fontWeight: 800,
          }}
         >
          Email
         </Typography>

         <Typography
          color="text.secondary"
          sx={{
           mt: 0.15,
           fontSize: '0.825rem',
           overflow: 'hidden',
           textOverflow: 'ellipsis',
           whiteSpace: 'nowrap',
          }}
         >
          {adminIdentity.email}
         </Typography>
        </Box>
       </Stack>

       <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
        <Box
         sx={{
          width: 34,
          height: 34,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          borderRadius: 1.25,
          bgcolor: 'action.hover',
          color: 'primary.main',
         }}
        >
         <FiPhone size={16} aria-hidden="true" />
        </Box>

        <Box>
         <Typography
          sx={{
           color: 'text.primary',
           fontSize: '0.8rem',
           fontWeight: 800,
          }}
         >
          Phone
         </Typography>

         <Typography
          color="text.secondary"
          sx={{
           mt: 0.15,
           fontSize: '0.825rem',
          }}
         >
          {adminIdentity.phone}
         </Typography>
        </Box>
       </Stack>

       <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
        <Box
         sx={{
          width: 34,
          height: 34,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          borderRadius: 1.25,
          bgcolor: 'action.hover',
          color: 'primary.main',
         }}
        >
         <FiMapPin size={16} aria-hidden="true" />
        </Box>

        <Box>
         <Typography
          sx={{
           color: 'text.primary',
           fontSize: '0.8rem',
           fontWeight: 800,
          }}
         >
          Location
         </Typography>

         <Typography
          color="text.secondary"
          sx={{
           mt: 0.15,
           fontSize: '0.825rem',
          }}
         >
          {adminIdentity.location}
         </Typography>
        </Box>
       </Stack>
      </Stack>
     </Stack>
    </AdminSurface>

    {/* Profile details */}
    <AdminSurface
     sx={{
      p: { xs: 2.5, sm: 3 },
      height: '100%',
     }}
    >
     <Stack spacing={2.5}>
      <Stack
       direction="row"
       spacing={2}
       sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
       }}
      >
       <Box>
        <Typography
         variant="h3"
         sx={{
          color: 'text.primary',
          fontSize: '1.2rem',
          fontWeight: 900,
         }}
        >
         Profile Details
        </Typography>

        <Typography
         color="text.secondary"
         sx={{
          mt: 0.35,
          fontSize: '0.8rem',
         }}
        >
         Update your account information.
        </Typography>
       </Box>

       <Button
        variant="outlined"
        startIcon={<FiEdit3 size={16} />}
        sx={{
         minHeight: 38,
         borderRadius: 1.25,
         fontWeight: 800,
         textTransform: 'none',
        }}
       >
        Edit Profile
       </Button>
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
        label="Name"
        defaultValue={adminIdentity.name}
        fullWidth
       />

       <TextField
        label="Role"
        defaultValue={adminIdentity.role}
        fullWidth
       />

       <TextField
        label="Email"
        defaultValue={adminIdentity.email}
        fullWidth
        type="email"
       />

       <TextField
        label="Phone"
        defaultValue={adminIdentity.phone}
        fullWidth
       />

       <TextField
        label="Department"
        defaultValue={adminIdentity.department}
        fullWidth
       />

       <TextField
        label="Location"
        defaultValue={adminIdentity.location}
        fullWidth
       />
      </Box>

      <TextField
       label="Bio"
       defaultValue="Responsible for managing academy operations, dashboard preferences, profile information, and administrative settings."
       fullWidth
       multiline
       minRows={4}
      />

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
        Save Changes
       </Button>
      </Stack>
     </Stack>
    </AdminSurface>
   </Box>
  </Stack>
 )
}

export default AdminProfile