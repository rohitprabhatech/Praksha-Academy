import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import MaterialForm from './MaterialForm';
import { mockMaterials } from '../../../constants/mockSprint10';

const EditMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the existing material to edit
  const existingMaterial = mockMaterials.find((m) => m.id === id);

  const handleSave = (data) => {
    // database update
    const index = mockMaterials.findIndex((m) => m.id === id);
    if (index !== -1) {
      mockMaterials[index] = { ...existingMaterial, ...data };
    }
    console.log('Updated material:', data);
    alert('Material updated successfully!');
    navigate('/admin/materials');
  };

  if (!existingMaterial) {
    return <Typography sx={{ p: 4 }}>Material not found.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Materials <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Edit</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
          Edit Material
        </Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
          Update the details of this study material.
        </Typography>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', p: 4 }}>
        <MaterialForm initialData={existingMaterial} onSubmit={handleSave} onCancel={() => navigate('/admin/materials')} />
      </Box>
    </Box>
  );
};

export default EditMaterial;