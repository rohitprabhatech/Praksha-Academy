import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TeacherForm from '../../../components/admin/TeacherForm';
import { mockTeachers } from '../../../constants/mockTeachers';

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const teacher = mockTeachers.find(t => t.id === id);

  const handleSave = (data) => {
    console.log('Updated teacher:', data);
    alert('Teacher updated successfully!');
    navigate('/admin/teachers');
  };

  if (!teacher) return <Typography sx={{ p: 4 }}>Teacher not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: 'auto' }}>
      {/* Modern Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> Teachers <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Edit</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B' }}>
          Edit Teacher
        </Typography>
      </Box>

      {/* Form Container */}
      <Box sx={{ bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', p: 4 }}>
        <TeacherForm initialData={teacher} onSubmit={handleSave} onCancel={() => navigate('/admin/teachers')} />
      </Box>
    </Box>
  );
};

export default EditTeacher;