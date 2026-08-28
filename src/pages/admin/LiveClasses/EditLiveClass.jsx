import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LiveClassForm from './LiveClassForm';
import { mockLiveClasses } from '../../../constants/mockSprint10';

const EditLiveClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the existing class to edit
  const existingClass = mockLiveClasses.find((c) => c.id === id);

  const handleSave = (data) => {
    // database update
    const index = mockLiveClasses.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockLiveClasses[index] = { ...existingClass, ...data };
    }
    console.log('Updated class:', data);
    alert('Live class updated successfully!');
    navigate('/admin/live-classes');
  };

  if (!existingClass) {
    return <Typography sx={{ p: 4 }}>Live Class not found.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Live Classes <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Edit</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
          Edit Live Class
        </Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
          Update the schedule or meeting link for this class.
        </Typography>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', p: 4 }}>
        <LiveClassForm initialData={existingClass} onSubmit={handleSave} onCancel={() => navigate('/admin/live-classes')} />
      </Box>
    </Box>
  );
};

export default EditLiveClass;