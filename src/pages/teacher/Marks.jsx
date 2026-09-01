import { Box, Stack, Typography, Paper } from '@mui/material';
import { FiAward } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';

const Marks = () => {
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
          Marks & Grades
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          View student gradebook matrices and export academic score reports.
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
          icon={FiAward}
          title="Gradebook Shell"
          message="Gradebook tables and score report export functionality will be active in Sprint 16."
        />
      </Paper>
    </Stack>
  );
};

export default Marks;
