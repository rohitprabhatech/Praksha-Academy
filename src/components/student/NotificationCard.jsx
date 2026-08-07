import { Box, Stack, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward, FiClock, FiMessageCircle, FiBell, FiX } from 'react-icons/fi';

const TYPE_META = {
  course: { icon: FiBookOpen, color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)' },
  achievement: { icon: FiAward, color: '#D97706', bg: 'rgba(245, 158, 11, 0.12)' },
  reminder: { icon: FiClock, color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.1)' },
  message: { icon: FiMessageCircle, color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  system: { icon: FiBell, color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)' },
};

/**
 * Single notification row.
 * @param {string} type - course | achievement | reminder | message | system
 * @param {string} title
 * @param {string} message
 * @param {string} time - e.g. "2h ago"
 * @param {boolean} isRead
 * @param {Function} onMarkRead - called when an unread item is clicked
 * @param {Function} onDismiss
 * @param {number} index - for staggered entrance
 */
const NotificationCard = ({
  type = 'system',
  title,
  message,
  time,
  isRead,
  onMarkRead,
  onDismiss,
  index = 0,
}) => {
  const { icon: Icon, color, bg } = TYPE_META[type] || TYPE_META.system;

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      onClick={!isRead ? onMarkRead : undefined}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.75,
        p: 2,
        borderRadius: '14px',
        bgcolor: isRead ? '#FFFFFF' : 'rgba(37, 99, 235, 0.035)',
        border: '1px solid',
        borderColor: isRead ? '#E2E8F0' : 'rgba(37, 99, 235, 0.18)',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
        cursor: isRead ? 'default' : 'pointer',
        transition: 'background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
        '&:hover': {
          bgcolor: isRead ? '#F8FAFC' : 'rgba(37, 99, 235, 0.06)',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '10px',
          bgcolor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={color} aria-hidden="true" />
      </Box>

      <Stack spacing={0.375} sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: isRead ? 500 : 700,
              fontSize: '0.9375rem',
              color: '#1E293B',
            }}
          >
            {title}
          </Typography>
          {!isRead && (
            <Box
              aria-label="Unread"
              sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#2563EB', flexShrink: 0 }}
            />
          )}
        </Stack>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8438rem',
            color: '#64748B',
            lineHeight: 1.5,
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: '#94A3B8',
            mt: 0.25,
          }}
        >
          {time}
        </Typography>
      </Stack>

      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          onDismiss?.();
        }}
        aria-label={`Dismiss notification: ${title}`}
        size="small"
        sx={{
          color: '#94A3B8',
          flexShrink: 0,
          transition: 'background-color 0.15s ease, color 0.15s ease',
          '&:hover': { bgcolor: '#F1F5F9', color: '#64748B' },
          '&:focus-visible': {
            outline: '2px solid #2563EB',
            outlineOffset: '2px',
          },
        }}
      >
        <FiX size={16} aria-hidden="true" />
      </IconButton>
    </Box>
  );
};

export default NotificationCard;