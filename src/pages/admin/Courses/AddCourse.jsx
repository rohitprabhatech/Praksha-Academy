import { Box, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import CourseForm from './CourseForm';
import { createCourse, getCourseFormOptions } from '../../../services/courseService';

const AddCourse = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({ teachers: [], classes: [], subjects: [] });
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getCourseFormOptions();
        setOptions(data);
      } catch (error) {
        console.error('Failed to load form options:', error);
        toast.error('Failed to load teachers and classes.');
      } finally {
        setIsLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (data) => {
    try {
      setIsSaving(true);
      const newCourse = await createCourse(data);
      toast.success('Course created successfully!');
      navigate(`/admin/courses/${newCourse.id}`);
    } catch (error) {
      console.error('Failed to create course:', error);
      toast.error(error.message || 'Failed to create course.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Create Course"
        subtitle="Add a new course and assign a teacher."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Courses', path: '/admin/courses' },
          { label: 'Create' },
        ]}
      />

      {isLoadingOptions ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={32} />
        </Box>
      ) : (
        <CourseForm
          onSubmit={handleSubmit}
          isLoading={isSaving}
          options={options}
        />
      )}
    </Box>
  );
};

export default AddCourse;
