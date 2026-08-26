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
    <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Teacher Profile</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate('/admin/teachers')}>Back</Button>
          <Button variant="contained" onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}>Edit</Button>
        </Stack>
      </Stack>

      {/* Identity Card */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar src={teacher.profileImage} sx={{ width: 120, height: 120 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" mb={1}>{teacher.name}</Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>{teacher.email} • {teacher.phone}</Typography>
            <Chip label={teacher.status} color={teacher.status === 'Active' ? 'success' : 'default'} />
          </Box>
        </Stack>
      </Paper>

      {/* Professional Details */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>Professional Info</Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>Specialization</Typography>
            <Typography variant="body1" mb={2}>{teacher.specialization || 'N/A'}</Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>Qualification</Typography>
            <Typography variant="body1" mb={2}>{teacher.qualification || 'N/A'}</Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>Experience</Typography>
            <Typography variant="body1">{teacher.experience || 'N/A'}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, height: '100%', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>Biography</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: '#475569' }}>
              {teacher.bio || 'No biography provided.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Sprint 08 Placeholder */}
      <Paper elevation={0} sx={{ p: 4, mt: 4, border: '1px dashed #CBD5E1', borderRadius: '16px', bgcolor: '#F8FAFC', textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary" fontWeight="bold">Assigned Courses</Typography>
        <Typography variant="body2" color="textSecondary">Soon</Typography>
      </Paper>
    </Box>
  );
};

export default TeacherDetails;