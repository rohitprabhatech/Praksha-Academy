import { useMemo, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBell, FiCheck } from 'react-icons/fi';
import NotificationCard from '../../components/student/NotificationCard';



// Mock data — no backend integration yet
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'achievement',
    title: 'Certificate earned',
    message: 'You completed "Full Stack Web Development" and earned a certificate.',
    time: '2h ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Live class starting soon',
    message: '"Data Structures" with Rohan Mehta starts in 30 minutes.',
    time: '4h ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'course',
    title: 'New lesson available',
    message: '"Cloud Computing Fundamentals" just added a new module: Serverless Basics.',
    time: '1d ago',
    isRead: false,
  },
  {
    id: 4,
    type: 'message',
    title: 'Mentor replied',
    message: 'Sneha Kapoor replied to your question in "Cloud Computing Fundamentals".',
    time: '2d ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'system',
    title: 'Profile updated',
    message: 'Your profile details were updated successfully.',
    time: '3d ago',
    isRead: true,
  },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
];

const EmptyState = ({ filtered }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '20px',
      py: 8,
      px: 3,
      textAlign: 'center',
    }}
  >
    <Stack spacing={2} alignItems="center">
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'rgba(37, 99, 235, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FiBell size={24} color="#2563EB" aria-hidden="true" />
      </Box>
      <Stack spacing={0.5}>
        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#1E293B' }}>
          {filtered ? "You're all caught up" : 'No notifications yet'}
        </Typography>
        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#64748B' }}>
          {filtered
            ? 'No unread notifications right now.'
            : "We'll let you know when something needs your attention."}
        </Typography>
      </Stack>
    </Stack>
  </Box>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('all');

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  const visibleNotifications = useMemo(
    () =>
      activeFilter === 'unread'
        ? notifications.filter((item) => !item.isRead)
        : notifications,
    [notifications, activeFilter]
  );

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={1.5}
        sx={{ width: '100%' }}
      >
        <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
          <Typography component="h1" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.375rem', color: '#1E293B' }}>
            Notifications
          </Typography>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#64748B' }}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'You\u2019re all caught up'}
          </Typography>
        </Stack>

        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllRead}
            startIcon={<FiCheck size={15} aria-hidden="true" />}
            sx={{
              flexShrink: 0,
              ml: { xs: 0, sm: 'auto' },
              px: 2,
              py: 1,
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              color: '#2563EB',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.8125rem',
              textTransform: 'none',
              boxShadow: 'none',
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
              '&:hover': {
                bgcolor: 'rgba(37, 99, 235, 0.06)',
                borderColor: '#2563EB',
                boxShadow: 'none',
              },
              '&:focus-visible': {
                outline: '2px solid #2563EB',
                outlineOffset: '2px',
              },
            }}
          >
            Mark all as read
          </Button>
        )}
      </Stack>

      <Stack direction="row" spacing={1}>
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <Box
              key={filter.key}
              component="button"
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: 999,
                border: '1px solid',
                borderColor: isActive ? '#2563EB' : '#E2E8F0',
                bgcolor: isActive ? '#2563EB' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#64748B',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                '&:hover': {
                  bgcolor: isActive ? '#1D4ED8' : '#F8FAFC',
                  borderColor: isActive ? '#1D4ED8' : '#CBD5E1',
                },
                '&:focus-visible': {
                  outline: '2px solid #2563EB',
                  outlineOffset: '2px',
                },
              }}
            >
              {filter.label}
              {filter.key === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
            </Box>
          );
        })}
      </Stack>

      {visibleNotifications.length === 0 ? (
        <EmptyState filtered={activeFilter === 'unread'} />
      ) : (
        <Stack spacing={1.25}>
          <AnimatePresence initial={false}>
            {visibleNotifications.map((item, index) => (
              <NotificationCard
                key={item.id}
                {...item}
                index={index}
                onMarkRead={() => handleMarkRead(item.id)}
                onDismiss={() => handleDismiss(item.id)}
              />
            ))}
          </AnimatePresence>
        </Stack>
      )}
    </Stack>
  );
};

export default Notifications;