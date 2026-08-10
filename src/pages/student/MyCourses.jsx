import { useState, useMemo } from 'react';
import { Box, Stack, Typography, Tabs, Tab } from '@mui/material';
import { toast } from 'react-toastify';
import CourseCard from '../../components/student/CourseCard';

// Mock data — no backend integration yet
const ENROLLED_COURSES = [
  { id: 1, title: 'React & Modern JavaScript', mentor: 'Rohan Mehta', category: 'Web Development', progress: 68, completed: false, duration: 24 },
  { id: 2, title: 'Cloud Computing Fundamentals', mentor: 'Sneha Kapoor', category: 'Cloud Computing', progress: 35, completed: false, duration: 18 },
  { id: 3, title: 'UI/UX Design Principles', mentor: 'Aarav Singh', category: 'Design', progress: 82, completed: false, duration: 16 },
  { id: 4, title: 'Python for Data Science', mentor: 'Priya Nair', category: 'AI & Data', progress: 100, completed: true, duration: 30 },
  { id: 5, title: 'Cyber Security Essentials', mentor: 'Vikram Rao', category: 'Cyber Security', progress: 100, completed: true, duration: 20 },
  { id: 6, title: 'Node.js Backend Development', mentor: 'Rohan Mehta', category: 'Web Development', progress: 12, completed: false, duration: 22 },
];

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

const MyCourses = () => {
  const [filter, setFilter] = useState('all');

  const filteredCourses = useMemo(() => {
    if (filter === 'in-progress') return ENROLLED_COURSES.filter((c) => !c.completed);
    if (filter === 'completed') return ENROLLED_COURSES.filter((c) => c.completed);
    return ENROLLED_COURSES;
  }, [filter]);

  const handleContinue = (title) => {
    // No backend integration yet
    toast.success(`Resuming "${title}"`);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.375rem',
            color: '#1E293B',
          }}
        >
          My Courses
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
          }}
        >
          {ENROLLED_COURSES.length} courses enrolled
        </Typography>
      </Stack>

      <Tabs
        value={filter}
        onChange={(_, value) => setFilter(value)}
        aria-label="Filter courses"
        sx={{
          minHeight: 'auto',
          '& .MuiTabs-indicator': { bgcolor: '#2563EB', height: 2 },
        }}
      >
        {FILTERS.map((f) => (
          <Tab
            key={f.value}
            value={f.value}
            label={f.label}
            disableRipple
            sx={{
              textTransform: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#64748B',
              minHeight: 'auto',
              px: 2,
              py: 1,
              '&.Mui-selected': { color: '#2563EB' },
              '&:focus-visible': {
                outline: '2px solid #2563EB',
                outlineOffset: '2px',
                borderRadius: '4px',
              },
            }}
          />
        ))}
      </Tabs>

      {filteredCourses.length > 0 ? (
        <div className="row g-3">
          {filteredCourses.map((course, index) => (
            <div key={course.id} className="col-12 col-sm-6 col-lg-4">
              <CourseCard
                {...course}
                variant="enrolled"
                index={index}
                onPrimaryAction={() => handleContinue(course.title)}
              />
            </div>
          ))}
        </div>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            border: '1px dashed #E2E8F0',
            borderRadius: '16px',
          }}
        >
          <Typography sx={{ fontFamily: 'Inter, sans-serif', color: '#64748B', fontSize: '0.9375rem' }}>
            No courses in this category yet.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default MyCourses;