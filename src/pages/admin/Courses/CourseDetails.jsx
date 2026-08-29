import { Box, Button, Grid, Stack, Typography, CircularProgress, Chip, Avatar, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit2, FiBookOpen, FiUser, FiClock, FiTag, FiDollarSign } from 'react-icons/fi';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import AdminSurface from '../../../components/admin/common/AdminSurface';
import NotFound from '../../NotFound';
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

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
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
        setError('Course not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

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
    return <NotFound />;
  }

  return (
    <Box>
      <PageHeader
        title={course.name}
        subtitle="View course details and manage curriculum."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Courses', path: '/admin/courses' },
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
            <AdminSurface sx={{ p: 4 }}>
              <Stack direction="row" spacing={3} alignItems="flex-start" sx={{ mb: 4 }}>
                <Avatar
                  variant="rounded"
                  src={course.thumbnail}
                  sx={{ width: 80, height: 80, bgcolor: 'rgba(37,99,235,0.08)', borderRadius: 2, fontSize: '2rem', color: '#2563EB', fontWeight: 700 }}
                >
                  {course.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#1E293B' }}>
                      {course.name}
                    </Typography>
                    <Chip
                      label={course.status}
                      size="small"
                      sx={{
                        ...(STATUS_COLORS[course.status] ?? {}),
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Stack>
                  <Typography sx={{ color: '#64748B', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                    {course.description || 'No description provided.'}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 4, borderColor: '#F1F5F9' }} />

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5, color: '#94A3B8' }}>
                        <FiTag size={14} />
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Category</Typography>
                      </Stack>
                      <Typography sx={{ color: '#1E293B', fontWeight: 500 }}>{course.category}</Typography>
                    </Box>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5, color: '#94A3B8' }}>
                        <FiBookOpen size={14} />
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Course Type</Typography>
                      </Stack>
                      <Typography sx={{ color: '#1E293B', fontWeight: 500 }}>{course.courseType || 'Not specified'}</Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5, color: '#94A3B8' }}>
                        <FiClock size={14} />
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Duration</Typography>
                      </Stack>
                      <Typography sx={{ color: '#1E293B', fontWeight: 500 }}>{course.duration || 'Not specified'}</Typography>
                    </Box>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5, color: '#94A3B8' }}>
                        <FiDollarSign size={14} />
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Pricing</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {course.discountPrice && course.discountPrice < course.price ? (
                          <>
                            <Typography sx={{ color: '#1E293B', fontWeight: 600 }}>₹{course.discountPrice}</Typography>
                            <Typography sx={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.875rem' }}>₹{course.price}</Typography>
                          </>
                        ) : (
                          <Typography sx={{ color: '#1E293B', fontWeight: 600 }}>
                            {course.price ? `₹${course.price}` : 'Free'}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
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
