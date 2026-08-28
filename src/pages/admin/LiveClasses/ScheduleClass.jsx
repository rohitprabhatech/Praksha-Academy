import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LiveClassForm from './LiveClassForm';
import { mockLiveClasses } from '../../../constants/mockSprint10';

const ScheduleClass = () => {
  const navigate = useNavigate();

  const handleSave = (data) => {
    //  database save
    const newClass = {
      ...data,
      id: Date.now().toString(),
    };
    
    mockLiveClasses.push(newClass);
    console.log('Scheduled live class:', newClass);
    
    alert('Class scheduled successfully!');
    navigate('/admin/live-classes');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Live Classes <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Schedule</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
          Schedule Class
        </Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
          Schedule a new live class session and attach a meeting link.
        </Typography>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', p: 4 }}>
        <LiveClassForm onSubmit={handleSave} onCancel={() => navigate('/admin/live-classes')} />
      </Box>
    </Box>
  );
};

export default ScheduleClass;