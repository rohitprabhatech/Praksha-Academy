import { Box, Stack, Typography, Paper } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';

const Assignments = () => {
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
          Assignments
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          Create, publish, and grade student assignments and project code tasks.
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
          icon={FiFileText}
          title="Assignments & Grading Shell"
          message="Assignment evaluation and feedback submission tools will be active in Sprint 16."
        />
      </Paper>
    </Stack>
  );
};

export default Assignments;
