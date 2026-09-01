import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FiBookOpen,
  FiUsers,
  FiVideo,
  FiClock,
  FiPlay,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchTeacherDashboardData } from '../../services/teacherService';
import PageLoader from '../../components/common/PageLoader';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';

/* Focus Ring */
const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
    borderRadius: '6px',
  },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 14 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.06, ease: 'easeOut' },
  }),
};

const StatCard = ({ label, value, icon: Icon, color, bg, trend, index }) => (
  <Box
    component={motion.div}
    custom={index}
    initial="hidden"
    animate="visible"
    variants={cardEntrance}
    whileHover={{ y: -4 }}
    sx={{
      position: 'relative',
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '18px',
      p: 2.5,
      height: '100%',
      overflow: 'hidden',
      transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      '&:hover': {
        boxShadow: '0 16px 32px rgba(15, 23, 42, 0.09)',
        borderColor: 'transparent',
      },
    }}
  >
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: color }} />

    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack spacing={0.5}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.875rem',
            color: '#1E293B',
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
        {trend && (
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#64748B',
              mt: 0.5,
            }}
          >
            {trend}
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '13px',
          bgcolor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={22} color={color} aria-hidden="true" />
      </Box>
    </Stack>
  </Box>
);

const TeacherDashboard = () => {
  const { teacherUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTeacherDashboardData(teacherUser);
      if (res.success) {
        setDashboardData(res.data);
      } else {
        setError('Failed to load teacher dashboard data.');
      }
    } catch {
      setError('An error occurred while fetching dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [teacherUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <PageLoader minHeight={400} label="Loading Teacher Dashboard..." />;
  }

  if (error) {
    return <ErrorState title="Dashboard Error" message={error} onRetry={loadData} />;
  }

  const { stats = [], upcomingClasses = [], pendingActivities = [] } = dashboardData || {};

  const statIcons = [FiBookOpen, FiUsers, FiVideo, FiClock];

  return (
    <Stack spacing={4}>
      {/* Header Greeting */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
          color: '#FFFFFF',
          boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)',
        }}
      >
        <Stack spacing={1}>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.5rem', sm: '1.875rem' },
              lineHeight: 1.2,
            }}
          >
            Welcome back, {teacherUser?.name || 'Teacher'}! 👋
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: 600,
            }}
          >
            Here is your daily teaching schedule, course overview, and pending activity reviews.
          </Typography>
        </Stack>
      </Box>

      {/* Stat Cards Grid — Responsive via Bootstrap row/col grid */}
      <div className="row g-3">
        {stats.map((stat, index) => (
          <div key={stat.id || stat.label} className="col-12 col-sm-6 col-lg-3">
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={statIcons[index % statIcons.length]}
              color={stat.color}
              bg={stat.bg}
              trend={stat.trend}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Main Grid: Upcoming Classes & Pending Activities */}
      <div className="row g-4">
        {/* Upcoming Classes */}
        <div className="col-12 col-xl-8">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: 'rgba(37, 99, 235, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FiVideo size={18} color="#2563EB" />
                </Box>
                <div>
                  <Typography
                    component="h2"
                    sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#1E293B' }}
                  >
                    Upcoming Classes
                  </Typography>
                  <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#64748B' }}>
                    Scheduled live lectures for your active batches
                  </Typography>
                </div>
              </Stack>
              <Button
                component={RouterLink}
                to="/teacher/classes"
                size="small"
                endIcon={<FiArrowRight size={14} />}
                sx={{ textTransform: 'none', fontWeight: 600, color: '#2563EB', ...focusRingSx }}
              >
                View all
              </Button>
            </Stack>

            {upcomingClasses.length === 0 ? (
              <EmptyState
                icon={FiCalendar}
                title="No Upcoming Classes"
                message="You have no live classes scheduled for today."
              />
            ) : (
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow sx={{ '& th': { borderColor: '#F1F5F9', color: '#64748B', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' } }}>
                      <TableCell>Class Title / Course</TableCell>
                      <TableCell>Batch</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell align="center">Students</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingClasses.map((cls) => (
                      <TableRow key={cls.id} hover sx={{ '& td': { borderColor: '#F8FAFC' } }}>
                        <TableCell>
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1E293B' }}>
                            {cls.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748B' }}>
                            {cls.course}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={cls.batch}
                            size="small"
                            sx={{
                              bgcolor: '#F1F5F9',
                              color: '#475569',
                              fontWeight: 600,
                              fontSize: '0.72rem',
                              borderRadius: '6px',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <FiClock size={13} color="#64748B" />
                            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#334155' }}>
                              {cls.dateTime}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1E293B' }}>
                            {cls.studentsCount}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<FiPlay size={13} />}
                            sx={{
                              bgcolor: '#2563EB',
                              color: '#FFFFFF',
                              textTransform: 'none',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              borderRadius: '8px',
                              px: 1.75,
                              '&:hover': { bgcolor: '#1D4ED8' },
                              ...focusRingSx,
                            }}
                          >
                            Start Class
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </div>

        {/* Pending Activities */}
        <div className="col-12 col-xl-4">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: 'rgba(217, 119, 6, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FiAlertCircle size={18} color="#D97706" />
                </Box>
                <div>
                  <Typography
                    component="h2"
                    sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#1E293B' }}
                  >
                    Pending Activities
                  </Typography>
                  <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#64748B' }}>
                    Tasks requiring teacher review
                  </Typography>
                </div>
              </Stack>
            </Stack>

            {pendingActivities.length === 0 ? (
              <EmptyState
                icon={FiCheckCircle}
                title="All Caught Up!"
                message="No pending assignments or quiz evaluations."
              />
            ) : (
              <Stack spacing={2} sx={{ flex: 1 }}>
                {pendingActivities.map((act) => (
                  <Box
                    key={act.id}
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: '1px solid #F1F5F9',
                      bgcolor: '#F8FAFC',
                      transition: 'border-color 0.15s ease',
                      '&:hover': {
                        borderColor: '#CBD5E1',
                      },
                    }}
                  >
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                        <Typography
                          sx={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            color: '#1E293B',
                          }}
                        >
                          {act.title}
                        </Typography>
                        <Chip
                          label={act.dueDate}
                          size="small"
                          sx={{
                            bgcolor: act.urgency === 'high' ? '#FEE2E2' : '#FEF3C7',
                            color: act.urgency === 'high' ? '#DC2626' : '#D97706',
                            fontWeight: 700,
                            fontSize: '0.68rem',
                            borderRadius: '4px',
                            height: 20,
                          }}
                        />
                      </Stack>

                      <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748B' }}>
                        {act.course} • {act.batch}
                      </Typography>

                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 0.5 }}>
                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#2563EB' }}>
                          {act.pendingCount} pending submissions
                        </Typography>
                        <Button
                          component={RouterLink}
                          to={act.type === 'Quiz' ? '/teacher/quizzes' : '/teacher/assignments'}
                          size="small"
                          sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.78rem', p: 0, color: '#1E293B' }}
                        >
                          Review →
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </div>
      </div>
    </Stack>
  );
};

export default TeacherDashboard;
