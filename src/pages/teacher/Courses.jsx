import { Box, Stack, Typography, Paper } from '@mui/material';
import { FiBookOpen } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';

const Courses = () => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: { xs: '1.5rem', sm: '1.875rem' },
            color: '#0F172A',
          }}
        >
          My Courses
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          Manage and view all courses assigned to you.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
        }}
      >
        <EmptyState
          icon={FiBookOpen}
          title="Assigned Courses Shell"
          message="Course management list and module editing will be fully enabled in Sprint 15."
        />
      </Paper>
    </Stack>
  );
};

export default Courses;
