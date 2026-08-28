import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import MaterialForm from './MaterialForm';
import { mockMaterials } from '../../../constants/mockSprint10';

const AddMaterial = () => {
  const navigate = useNavigate();

  const handleSave = (data) => {
    // Faking a database save into  mock array
    const newMaterial = {
      ...data,
      id: Date.now().toString(),
      // Automatically setting today's date for the mock data
      date: new Date().toISOString().split('T')[0]
    };
    
    mockMaterials.push(newMaterial);
    console.log('Saved material:', newMaterial);
    
    alert('Material added successfully!');
    navigate('/admin/materials');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      {/* Modern Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Materials <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Add</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
          Add New Material
        </Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
          Upload a new study material or attach a video link to a course.
        </Typography>
      </Box>

      {/* Form Container */}
      <Box sx={{ bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', p: 4 }}>
        <MaterialForm onSubmit={handleSave} onCancel={() => navigate('/admin/materials')} />
      </Box>
    </Box>
  );
};

export default AddMaterial;