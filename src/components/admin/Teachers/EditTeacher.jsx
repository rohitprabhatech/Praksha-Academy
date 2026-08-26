import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TeacherForm from '../../../components/admin/TeacherForm';
import { mockTeachers } from '../../../data/mockTeachers';

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
    <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>Edit Teacher</Typography>
      <TeacherForm initialData={teacher} onSubmit={handleSave} onCancel={() => navigate('/admin/teachers')} />
    </Box>
  );
};

export default EditTeacher;