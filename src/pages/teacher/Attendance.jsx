import { Box, Stack, Typography, Paper } from '@mui/material';
import { FiUserCheck } from 'react-icons/fi';
import EmptyState from '../../components/common/EmptyState';

const Attendance = () => {
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
          Attendance
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          Track student daily class attendance and participation statistics.
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
          icon={FiUserCheck}
          title="Attendance Tracking Shell"
          message="Live session attendance recording and absence logs will be active in Sprint 15."
        />
      </Paper>
    </Stack>
  );
};

export default Attendance;
