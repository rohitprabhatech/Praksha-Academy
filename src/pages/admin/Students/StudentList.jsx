import { Box, Typography, Chip, Button } from '@mui/material'
import { FiUsers, FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
            Admin / <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Students</Box>
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>Students</Typography>
          <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>Manage all enrolled students.</Typography>
        </Box>
        <Button
          variant="contained" startIcon={<FiPlus />}
          onClick={() => navigate('/admin/students/add')}
          sx={{ bgcolor: '#2563EB', textTransform: 'none', fontWeight: 600, px: 3, py: 1.2, borderRadius: '8px', boxShadow: 'none', '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' } }}
        >
          Add Student
        </Button>
      </Box>
      <Box sx={{ p: 8, textAlign: 'center', border: '2px dashed #E2E8F0', borderRadius: 3, bgcolor: '#F8FAFC' }}>
        <FiUsers size={48} color="#CBD5E1" />
        <Typography variant="h6" sx={{ mt: 2, color: '#64748B', fontWeight: 600 }}>Student Management</Typography>
        <Chip label="Coming Soon — Sprint 02" size="small" sx={{ mt: 1.5, bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600 }} />
      </Box>
    </Box>
  )
}
export default StudentList
