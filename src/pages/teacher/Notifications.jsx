import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { FiBell, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import NotificationCard from '../../components/student/NotificationCard';
import EmptyState from '../../components/common/EmptyState';

const MOCK_TEACHER_NOTIFICATIONS = [
  {
    id: 'n-1',
    type: 'course',
    title: 'New Student Submissions Received',
    message: '8 students submitted Assignment 3 for Full Stack Web Development.',
    time: '10 mins ago',
    isRead: false,
  },
  {
    id: 'n-2',
    type: 'reminder',
    title: 'Upcoming Class Reminder',
    message: 'Advanced React Architecture class starts today at 02:30 PM.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: 'n-3',
    type: 'message',
    title: 'New Student Question',
    message: 'Aarav Kumar posted a question in Node.js Microservices discussion board.',
    time: '3 hours ago',
    isRead: false,
  },
  {
    id: 'n-4',
    type: 'system',
    title: 'Batch Schedule Updated',
    message: 'Admin updated the schedule for Batch 2026-A exams.',
    time: '1 day ago',
    isRead: true,
  },
  {
    id: 'n-5',
    type: 'achievement',
    title: 'Course Completion Milestone',
    message: '95% of students completed Module 4 quiz successfully.',
    time: '2 days ago',
    isRead: true,
  },
];

const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
    borderRadius: '6px',
  },
};

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState(MOCK_TEACHER_NOTIFICATIONS);
  const [tabValue, setTabValue] = useState('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((item) => {
    if (tabValue === 'unread') return !item.isRead;
    return true;
  });

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.info('Notification dismissed');
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 900 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: { xs: '1.5rem', sm: '1.875rem' },
                color: '#0F172A',
              }}
            >
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} Unread`}
                size="small"
                sx={{
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />
            )}
          </Stack>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: '#64748B',
              mt: 0.5,
            }}
          >
            Stay updated with student submissions, class alerts, and academic notices.
          </Typography>
        </Box>

        {unreadCount > 0 && (
          <Button
            size="small"
            onClick={handleMarkAllAsRead}
            startIcon={<FiCheckCircle size={15} />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#2563EB',
              flexShrink: 0,
              ...focusRingSx,
            }}
          >
            Mark all read
          </Button>
        )}
      </Stack>

      {/* Tabs & Notifications Container */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E2E8F0', mb: 2.5 }}>
          <Tabs
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                minWidth: 'auto',
                px: 2,
              },
            }}
          >
            <Tab label={`All (${notifications.length})`} value="all" />
            <Tab label={`Unread (${unreadCount})`} value="unread" />
          </Tabs>
        </Box>

        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon={FiBell}
            title={tabValue === 'unread' ? 'No Unread Notifications' : 'No Notifications Yet'}
            message={
              tabValue === 'unread'
                ? "You've read all your teacher notifications."
                : 'New alerts regarding classes, submissions, and students will appear here.'
            }
          />
        ) : (
          <Stack spacing={1.5}>
            {filteredNotifications.map((item, idx) => (
              <NotificationCard
                key={item.id}
                type={item.type}
                title={item.title}
                message={item.message}
                time={item.time}
                isRead={item.isRead}
                onMarkRead={() => handleMarkAsRead(item.id)}
                onDismiss={() => handleDismiss(item.id)}
                index={idx}
              />
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

export default TeacherNotifications;
