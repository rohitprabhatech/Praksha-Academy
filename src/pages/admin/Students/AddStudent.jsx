import { Box, Typography, Chip } from '@mui/material'
import { FiUserPlus } from 'react-icons/fi'

const AddStudent.jsx.Replace('.jsx','') = () => (
  <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
        Admin / <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Add Student</Box>
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>Add Student</Typography>
      <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>Add a new student to the academy.</Typography>
    </Box>
    <Box sx={{ p: 8, textAlign: 'center', border: '2px dashed #E2E8F0', borderRadius: 3, bgcolor: '#F8FAFC' }}>
      <FiUserPlus size={48} color="#CBD5E1" />
      <Typography variant="h6" sx={{ mt: 2, color: '#64748B', fontWeight: 600 }}>Add Student</Typography>
      <Chip label="Coming Soon — Sprint 02" size="small" sx={{ mt: 1.5, bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600 }} />
    </Box>
  </Box>
)

export default AddStudent.jsx.Replace('.jsx','')
