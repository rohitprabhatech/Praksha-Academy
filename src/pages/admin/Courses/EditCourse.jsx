import { Box, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import CourseForm from './CourseForm';
import { getCourseById, updateCourse, getCourseFormOptions } from '../../../services/courseService';

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [course, setCourse] = useState(null);
  const [options, setOptions] = useState({ teachers: [], classes: [], subjects: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [courseData, optionsData] = await Promise.all([
          getCourseById(id),
          getCourseFormOptions()
        ]);
        setCourse(courseData);
        setOptions(optionsData);
      } catch (err) {
        console.error('Failed to load course details:', err);
        setError('Course not found or failed to load.');
        toast.error('Failed to load course details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setIsSaving(true);
      await updateCourse(id, data);
      toast.success('Course updated successfully!');
      navigate(`/admin/courses/${id}`);
    } catch (err) {
      console.error('Failed to update course:', err);
      toast.error(err.message || 'Failed to update course.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Edit Course" breadcrumbs={[{ label: 'Admin' }, { label: 'Courses', path: '/admin/courses' }, { label: 'Edit' }]} />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={32} />
        </Box>
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Box>
        <PageHeader title="Edit Course" breadcrumbs={[{ label: 'Admin' }, { label: 'Courses', path: '/admin/courses' }, { label: 'Edit' }]} />
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title={`Edit ${course.name}`}
        subtitle="Update course details and pricing."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Courses', path: '/admin/courses' },
          { label: 'Edit' },
        ]}
      />

      <CourseForm
        defaultValues={course}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        options={options}
      />
    </Box>
  );
};

export default EditCourse;
