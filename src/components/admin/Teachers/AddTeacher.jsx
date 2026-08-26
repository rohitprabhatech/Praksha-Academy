import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TeacherForm from '../../../components/admin/TeacherForm';
import { mockTeachers } from '../../../data/mockTeachers';

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
    <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>Add New Teacher</Typography>
      <TeacherForm onSubmit={handleSave} onCancel={() => navigate('/admin/teachers')} />
    </Box>
  );
};

export default AddTeacher;