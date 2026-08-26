import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Stack, Avatar, Grid, Chip } from '@mui/material';
import { mockTeachers } from '../../../data/mockTeachers';

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const teacher = mockTeachers.find(t => t.id === id);

  if (!teacher) return <Typography sx={{ p: 4 }}>Teacher not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      
      {/* Modern Header & Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
            Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Teachers <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Details</Box>
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B' }}>
            Teacher Profile
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/teachers')}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 3,
              py: 1,
              borderColor: '#E2E8F0',
              color: '#64748B',
              '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' }
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}
            sx={{
              bgcolor: '#2563EB',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 3,
              py: 1,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' }
            }}
          >
            Edit
          </Button>
        </Stack>
      </Box>

      {/* Identity Card */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar src={teacher.profileImage} sx={{ width: 120, height: 120, bgcolor: '#EFF6FF', color: '#2563EB' }}>
            {!teacher.profileImage && teacher.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={1}>{teacher.name}</Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 2 }}>{teacher.email} • {teacher.phone}</Typography>
            <Chip 
              label={teacher.status || 'Active'} 
              size="small"
              sx={{ 
                bgcolor: teacher.status === 'Active' ? '#e6f4ea' : '#fff3e0', 
                color: teacher.status === 'Active' ? '#1e8e3e' : '#e65100',
                fontWeight: 700,
                borderRadius: '6px'
              }} 
            />
          </Box>
        </Stack>
      </Paper>

      {/* Professional Details */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>Professional Info</Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Specialization</Typography>
            <Typography variant="body1" mb={2}>{teacher.specialization || 'N/A'}</Typography>
            
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Qualification</Typography>
            <Typography variant="body1" mb={2}>{teacher.qualification || 'N/A'}</Typography>
            
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>Experience</Typography>
            <Typography variant="body1">{teacher.experience || 'N/A'}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>Biography</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: '#475569', lineHeight: 1.6 }}>
              {teacher.bio || 'No biography provided.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Sprint 08 Placeholder */}
      <Paper elevation={0} sx={{ p: 4, mt: 4, border: '1px dashed #CBD5E1', borderRadius: '16px', bgcolor: '#F8FAFC', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#64748B', fontWeight: 600 }}>Assigned Courses</Typography>
        <Chip label="Coming in Sprint 08" size="small" sx={{ mt: 1, bgcolor: '#E2E8F0', color: '#475569', fontWeight: 600 }} />
      </Paper>
    </Box>
  );
};

export default TeacherDetails;