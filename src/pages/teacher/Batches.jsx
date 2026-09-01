import { Box, Stack, Typography, Paper } from '@mui/material';
import { FiLayers } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';

const Batches = () => {
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
          Batches
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          View and manage student cohort batches under your mentorship.
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
          icon={FiLayers}
          title="Batches Management Shell"
          message="Batch schedules and student cohort management will be active in Sprint 15."
        />
      </Paper>
    </Stack>
  );
};

export default Batches;
