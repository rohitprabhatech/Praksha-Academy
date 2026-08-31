import { Box, Stack, Typography } from '@mui/material'
import { FiInbox } from 'react-icons/fi'

const EmptyState = ({
  title = 'No data found',
  description = 'There is nothing to display here yet.',
  action = null,
}) => {
  return (
    <Box
      sx={{
        minHeight: 320,
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
        sx={{ maxWidth: 480 }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '18px',
            bgcolor: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
          }}
        >
          <FiInbox size={28} />
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
          }}
        >
          {description}
        </Typography>

        {action}
      </Stack>
    </Box>
  )
}

export default EmptyState