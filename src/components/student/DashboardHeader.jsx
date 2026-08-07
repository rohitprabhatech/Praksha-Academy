import { Box, Stack, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiCompass } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const RADIUS = 26;
const STROKE = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Welcome banner for the student dashboard.
 * @param {string} name - Student's first name (falls back to a neutral greeting if omitted)
 * @param {number} continueProgress - 0-100, progress of the most recent in-progress course
 * @param {string} continueCourseTitle - Title of the most recent in-progress course
 */
const DashboardHeader = ({ name, continueProgress, continueCourseTitle }) => {
  const greeting = getGreeting();
  const hasActiveCourse = Boolean(continueCourseTitle);
  const offset = CIRCUMFERENCE - (continueProgress / 100) * CIRCUMFERENCE;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
        px: { xs: 3, sm: 4.5 },
        py: { xs: 3, sm: 4 },
        boxShadow: '0 20px 40px -16px rgba(37, 99, 235, 0.35)',
      }}
    >
      {/* Decorative accent circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -70,
          right: -50,
          width: 220,
          height: 220,
          borderRadius: '50%',
          bgcolor: 'rgba(245, 158, 11, 0.16)',
          filter: 'blur(65px)',
        }}
      />
      {/* Subtle grid texture — same pattern language as ProfileCard banner / auth panels */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={3}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Stack spacing={0.75} sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            {greeting}
            {name ? `, ${name}` : ''} 👋
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              color: '#FFFFFF',
              letterSpacing: '-0.015em',
              lineHeight: 1.2,
            }}
          >
            {hasActiveCourse
              ? 'Ready to pick up where you left off?'
              : 'Welcome to your learning space'}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            {hasActiveCourse
              ? `${continueCourseTitle}`
              : 'You haven\u2019t enrolled in a course yet — let\u2019s find your first one.'}
          </Typography>
        </Stack>

        {/* Right side: circular progress ring + CTA, in a glass card */}
        <Stack
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          direction="row"
          alignItems="center"
          spacing={2.5}
          sx={{
            flexShrink: 0,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '18px',
            px: { xs: 2, sm: 2.5 },
            py: 2,
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {hasActiveCourse && (
            <Box sx={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle
                  cx="30"
                  cy="30"
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={STROKE}
                />
                <motion.circle
                  cx="30"
                  cy="30"
                  r={RADIUS}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  transform="rotate(-90 30 30)"
                />
              </svg>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    color: '#FFFFFF',
                  }}
                >
                  {continueProgress}%
                </Typography>
              </Box>
            </Box>
          )}

          <Button
            component={RouterLink}
            to={hasActiveCourse ? '/student/courses' : '/courses'}
            endIcon={<FiArrowRight size={16} aria-hidden="true" />}
            startIcon={
              hasActiveCourse ? (
                <FiBookOpen size={16} aria-hidden="true" />
              ) : (
                <FiCompass size={16} aria-hidden="true" />
              )
            }
            sx={{
              flexShrink: 0,
              px: 3,
              py: 1.5,
              borderRadius: '10px',
              bgcolor: '#FFFFFF',
              color: '#1D4ED8',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.18)',
              '&:hover': {
                bgcolor: '#F1F5F9',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.22)',
              },
              '&:focus-visible': {
                outline: '2px solid #F59E0B',
                outlineOffset: '2px',
              },
            }}
          >
            {hasActiveCourse ? 'Continue' : 'Browse courses'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;