import { Box, Button, Grid, Stack, Typography, CircularProgress, Chip, Avatar, Divider } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiBookOpen, FiUser, FiClock, FiTag, FiDollarSign } from 'react-icons/fi';

import PageHeader from '../../../components/admin/common/PageHeader';
import AdminSurface from '../../../components/admin/common/AdminSurface';
import { getCourseById, getCourseFormOptions } from '../../../services/courseService';

const STATUS_COLORS = {
  Published: { bgcolor: 'rgba(34,197,94,0.1)', color: '#16A34A' },
  Draft: { bgcolor: 'rgba(245,158,11,0.1)', color: '#D97706' },
  Inactive: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
};

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [courseData, options] = await Promise.all([
        getCourseById(id),
        getCourseFormOptions()
      ]);

      setCourse(courseData);

      // Find teacher info
      const assignedTeacher = options.teachers.find(t => t.id === courseData.teacherId);
      setTeacher(assignedTeacher || { name: 'Unassigned', id: null });

    } catch (err) {
      console.error('Failed to load course:', err);
      setCourse(null);
      setTeacher(null);
      setError('Course not found');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  if (isLoading) {
    return (
      <Box>
        <PageHeader title="Course Details" breadcrumbs={[{ label: 'Admin' }, { label: 'Courses' }]} />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={32} />
        </Box>
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Box>
        <PageHeader
          title="Course Details"
          breadcrumbs={[
            { label: 'Admin' },
            {
              label: 'Courses',
              to: '/admin/courses',
            },
            { label: 'Details' },
          ]}
        />

        <AdminSurface
          sx={{
            p: 5,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              mb: 1,
            }}
          >
            Unable to load course
          </Typography>

          <Typography
            sx={{
              color: '#64748B',
              mb: 3,
            }}
          >
            {error ||
              'Something went wrong while loading the course.'}
          </Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              onClick={fetchCourseData}
            >
              Retry
            </Button>

            <Button
              variant="outlined"
              onClick={() =>
                navigate('/admin/courses')
              }
              startIcon={
                <FiArrowLeft size={16} />
              }
            >
              Back to Courses
            </Button>
          </Box>
        </AdminSurface>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title={course.name}
        subtitle="View course details and manage curriculum."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Courses', to: '/admin/courses' },
          { label: 'Details' },
        ]}
        action={
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<FiEdit2 size={16} />}
              onClick={() => navigate(`/admin/courses/${id}/edit`)}
              sx={{ borderColor: '#E2E8F0', color: '#64748B' }}
            >
              Edit Course
            </Button>
            <Button
              variant="contained"
              startIcon={<FiBookOpen size={16} />}
              onClick={() => navigate(`/admin/courses/${id}/curriculum`)}
              sx={{
                bgcolor: '#2563EB',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                },
              }}
            >
              Manage Curriculum
            </Button>
          </Stack>
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Main Info */}
            <AdminSurface
              sx={{
                p: 3,
              }}
            >
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.5 }}>
                      Course Information
                    </Typography>
                    <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
                      {course.description || 'No description available.'}
                    </Typography>
                  </Box>

                  <Chip
                    label={course.status}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      flexShrink: 0,
                      ...(STATUS_COLORS[course.status] ?? {}),
                    }}
                  />
                </Stack>

                <Divider />

                <Grid container spacing={2}>
                  {[
                    { label: 'Category', value: course.category || '-', icon: <FiTag size={16} /> },
                    { label: 'Duration', value: course.duration || '-', icon: <FiClock size={16} /> },
                    { label: 'Type', value: course.courseType || '-', icon: <FiBookOpen size={16} /> },
                    { label: 'Language', value: course.language || '-', icon: <FiUser size={16} /> },
                    {
                      label: 'Price',
                      value: course.discountPrice && course.discountPrice < course.price
                        ? `₹${course.discountPrice} (₹${course.price})`
                        : `₹${course.price}`,
                      icon: <FiDollarSign size={16} />,
                    },
                  ].map((item) => (
                    <Grid item xs={12} sm={6} key={item.label}>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Box sx={{ color: '#2563EB', display: 'flex' }}>{item.icon}</Box>
                        <Box>
                          <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            {item.label}
                          </Typography>
                          <Typography sx={{ color: '#1E293B', fontWeight: 600 }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </AdminSurface>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Teacher Card */}
          <AdminSurface sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ mb: 3, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Assigned Teacher
            </Typography>
            <Avatar
              sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: '#F1F5F9', color: '#475569', fontSize: '1.5rem', fontWeight: 600 }}
            >
              {teacher?.name ? teacher.name.charAt(0) : <FiUser />}
            </Avatar>
            <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1E293B' }}>
              {teacher?.name}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#64748B', mt: 0.5 }}>
              Primary Instructor
            </Typography>
          </AdminSurface>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetails;
