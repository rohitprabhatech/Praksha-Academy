import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const ErrorState = ({
  title = 'Something went wrong',
  message = 'We could not load the requested data.',
  onRetry,
  action = null,
}) => {
  return (
    <Box
      sx={{
        minHeight: 360,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Stack
        alignItems="center"
        textAlign="center"
        spacing={1.5}
        sx={{ width: '100%', maxWidth: 560 }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '18px',
            bgcolor: '#FEF2F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#DC2626',
          }}
        >
          <FiAlertCircle size={28} />
        </Box>

        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#1E293B',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: '#64748B',
            maxWidth: 460,
          }}
        >
          {message}
        </Typography>

        {action ? (
          action
        ) : onRetry ? (
          <Button
            variant="contained"
            startIcon={<FiRefreshCw size={15} />}
            onClick={onRetry}
            sx={{
              mt: 1,
              textTransform: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Try Again
          </Button>
        ) : null}
      </Stack>
    </Box>
  )
}

export default ErrorState