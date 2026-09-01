import { Box, Stack, Typography, Paper } from '@mui/material';
import { FiCheckSquare } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';

const Exams = () => {
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
          Exams
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          Manage course mid-term and final certification examination papers.
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
          icon={FiCheckSquare}
          title="Exams & Assessments Shell"
          message="Final exam proctoring and result publishing will be active in Sprint 16."
        />
      </Paper>
    </Stack>
  );
};

export default Exams;
