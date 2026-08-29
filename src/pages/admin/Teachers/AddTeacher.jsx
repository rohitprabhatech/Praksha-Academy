import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TeacherForm from '../../../components/admin/TeacherForm';
import { mockTeachers } from '../../../constants/mockTeachers';

const AddTeacher = () => {
  const navigate = useNavigate();

  const handleSave = (data) => {
    // 1. Create a  unique ID for the new teacher
    const newTeacher = {
      ...data,
      id: Date.now().toString(),
      // Create a temporary URL if they uploaded an image, otherwise leave null
      profileImage: data.profileImageFile ? URL.createObjectURL(data.profileImageFile) : null
    };

    // 2. Push the new teacher into our mock array (Faking a database save)
    mockTeachers.push(newTeacher);

    console.log('Saved new teacher:', newTeacher);
    alert('Teacher added successfully!');
    
    // 3. Redirect back to the list
    navigate('/admin/teachers');
  };

  return (
  <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      {/* Modern Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Teachers <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Add</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B' }}>
          Add New Teacher
        </Typography>
      </Box>

      {/* Form Container */}
      <Box sx={{ bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', p: 4 }}>
        <TeacherForm onSubmit={handleSave} onCancel={() => navigate('/admin/teachers')} />
      </Box>
    </Box>
  );
};

export default AddTeacher;