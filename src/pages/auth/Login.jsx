import {
  Box,
  Stack,
  Typography,
  Link as MuiLink,
  Button,
} from '@mui/material';

import { motion } from 'framer-motion';

import {
  Link as RouterLink,
  Navigate,
} from 'react-router-dom';

import {
  FiBookOpen,
  FiCheck,
  FiLock,
} from 'react-icons/fi';

import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../context/AuthContext';

const FEATURE_CARDS = [
  {
    title: 'Live Classes',
    description: 'Interactive mentor-led sessions',
  },
  {
    title: 'Placement Support',
    description: 'Career guidance and interview preparation',
  },
  {
    title: 'Industry Mentors',
    description: 'Learn from experienced professionals',
  },
  {
    title: 'Certificates',
    description: 'Industry-recognized completion certificates',
  },
];

const cardEntrance = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.15 + index * 0.08,
      ease: 'easeOut',
    },
  }),
};

const currentYear = new Date().getFullYear();

const Login = () => {
  const { isAuthenticated, role } = useAuth();

  /*
   * If the user is already authenticated, don't show the
   * login form again.
   *
   * This is especially important for Remember Me:
   * localStorage restores the user when the browser is reopened.
   */
  if (isAuthenticated) {
    if (role === 'admin') {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            px: { xs: 2, sm: 3 },
            py: 4,

            background:
              'radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.12), transparent 35%),' +
              'radial-gradient(circle at 85% 80%, rgba(14, 165, 233, 0.10), transparent 35%),' +
              '#F8FAFC',
          }}
        >
          {/* Decorative glow */}
          <Box
            sx={{
              position: 'absolute',
              width: 420,
              height: 420,
              borderRadius: '50%',
              background:
                'rgba(37, 99, 235, 0.06)',
              filter: 'blur(80px)',
              top: -180,
              right: -140,
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              width: 360,
              height: 360,
              borderRadius: '50%',
              background:
                'rgba(14, 165, 233, 0.05)',
              filter: 'blur(80px)',
              bottom: -180,
              left: -120,
              pointerEvents: 'none',
            }}
          />

          {/* Main card */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: 486,

              bgcolor: '#FFFFFF',

              borderRadius: '20px',

              border: '1px solid #E2E8F0',

              borderTop:
                '3px solid #2563EB',

              boxShadow:
                '0 24px 60px rgba(15, 23, 42, 0.12)',

              px: {
                xs: 3,
                sm: 4.5,
              },

              py: {
                xs: 4,
                sm: 4.5,
              },

              textAlign: 'center',
            }}
          >
            {/* Dark security icon */}
            <Box
              sx={{
                width: 58,
                height: 58,
                mx: 'auto',
                mb: 2.25,

                display: 'grid',
                placeItems: 'center',

                borderRadius: '16px',

                bgcolor: '#172033',

                color: '#FFFFFF',

                boxShadow:
                  '0 10px 24px rgba(15, 23, 42, 0.18)',
              }}
            >
              <FiLock
                size={25}
                strokeWidth={1.8}
              />
            </Box>

            {/* Label */}
            <Typography
              sx={{
                color: '#2563EB',

                fontSize: '0.7rem',

                fontWeight: 800,

                letterSpacing: '0.15em',

                textTransform: 'uppercase',

                mb: 1,
              }}
            >
              Already signed in
            </Typography>

            {/* Heading */}
            <Typography
              component="h1"
              sx={{
                color: '#0F172A',

                fontSize: {
                  xs: '1.6rem',
                  sm: '1.8rem',
                },

                fontWeight: 800,

                letterSpacing: '-0.03em',

                lineHeight: 1.2,
              }}
            >
              You’re already signed in
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                mt: 1.35,

                color: '#64748B',

                fontSize: '0.9rem',

                lineHeight: 1.65,

                maxWidth: 390,

                mx: 'auto',
              }}
            >
              You are currently signed in as an administrator.
              Use the Admin Access option in the footer to
              access the administrator area.
            </Typography>

            {/* Divider */}
            <Box
              sx={{
                height: '1px',

                bgcolor: '#E2E8F0',

                my: 3,
              }}
            />

            {/* Home button */}
            <Button
              component={RouterLink}
              to="/"
              fullWidth
              sx={{
                minHeight: 50,

                borderRadius: '10px',

                bgcolor: '#2563EB',

                color: '#FFFFFF',

                fontSize: '0.92rem',

                fontWeight: 700,

                textTransform: 'none',

                boxShadow:
                  '0 8px 18px rgba(37, 99, 235, 0.18)',

                transition:
                  'all 0.2s ease',

                '&:hover': {
                  bgcolor: '#1D4ED8',

                  boxShadow:
                    '0 12px 24px rgba(37, 99, 235, 0.24)',

                  transform:
                    'translateY(-1px)',
                },
              }}
            >
              Go to home
            </Button>
          </Box>

          {/* Brand */}
          <Typography
            sx={{
              position: 'absolute',

              bottom: 22,

              color: '#94A3B8',

              fontSize: '0.74rem',

              fontWeight: 600,

              letterSpacing: '0.01em',
            }}
          >
            Praksha Academy
          </Typography>
        </Box>
      );
    }

    return (
      <Navigate
        to="/student/dashboard"
        replace
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      {/* ================= MAIN ROW ================= */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        {/* ================= LEFT PANEL ================= */}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            width: {
              md: '45%',
            },
            minHeight: '100vh',
            background:
              'linear-gradient(160deg, #1E40AF 0%, #2563EB 100%)',
            overflow: 'hidden',
            px: {
              md: 6,
              lg: 8,
            },
            py: 1,
          }}
        >
          {/* Decorative grid */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              backgroundImage:
                'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Top accent */}
          <Box
            sx={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 260,
              height: 260,
              borderRadius: '50%',
              bgcolor: 'rgba(245, 158, 11, 0.18)',
              filter: 'blur(70px)',
            }}
          />

          {/* Bottom accent */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -100,
              left: -60,
              width: 300,
              height: 300,
              borderRadius: '50%',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              filter: 'blur(80px)',
            }}
          />

          <Stack
            component={motion.div}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: 'easeOut',
            }}
            spacing={4}
            sx={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 410,
            }}
          >
            {/* Brand */}
            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  bgcolor:
                    'rgba(255,255,255,0.14)',
                  border:
                    '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiBookOpen
                  size={16}
                  color="#FFFFFF"
                  aria-hidden="true"
                />
              </Box>

              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                }}
              >
                Praksha Academy
              </Typography>
            </Stack>

            {/* Main message */}
            <Stack spacing={2.5}>
              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                  color: '#F59E0B',
                  textTransform: 'uppercase',
                }}
              >
                Learn &bull; Build &bull; Succeed
              </Typography>

              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '2rem',
                  lineHeight: 1.25,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Empowering Future Developers
              </Typography>

              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color:
                    'rgba(255,255,255,0.85)',
                  letterSpacing: '0.005em',
                }}
              >
                Learn Web Development, AI,
                Cloud Computing and Cyber
                Security through expert mentors,
                live classes and real-world
                projects.
              </Typography>
            </Stack>

            {/* Feature cards */}
            <Stack spacing={2}>
              {FEATURE_CARDS.map(
                (
                  {
                    title,
                    description,
                  },
                  index
                ) => (
                  <motion.div
                    key={title}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardEntrance}
                    whileHover={{
                      y: -3,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.75}
                      alignItems="center"
                      sx={{
                        borderRadius: '16px',
                        bgcolor:
                          'rgba(255,255,255,0.08)',
                        backdropFilter:
                          'blur(10px)',
                        border:
                          '1px solid rgba(255,255,255,0.14)',
                        boxShadow:
                          '0 8px 20px rgba(15, 23, 42, 0.12)',
                        px: 2,
                        py: 1.5,
                        transition:
                          'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',

                        '&:hover': {
                          bgcolor:
                            'rgba(255,255,255,0.13)',
                          borderColor:
                            'rgba(245, 158, 11, 0.35)',
                          boxShadow:
                            '0 10px 24px rgba(15, 23, 42, 0.16)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: '9px',
                          bgcolor:
                            'rgba(245, 158, 11, 0.16)',
                          border:
                            '1px solid rgba(245, 158, 11, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <FiCheck
                          size={17}
                          color="#F59E0B"
                          aria-hidden="true"
                        />
                      </Box>

                      <Stack spacing={0}>
                        <Typography
                          sx={{
                            fontFamily:
                              'Inter, sans-serif',
                            fontWeight: 700,
                            fontSize:
                              '0.875rem',
                            color: '#FFFFFF',
                          }}
                        >
                          {title}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily:
                              'Inter, sans-serif',
                            fontSize:
                              '0.75rem',
                            color:
                              'rgba(255,255,255,0.7)',
                          }}
                        >
                          {description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </motion.div>
                )
              )}
            </Stack>
          </Stack>
        </Box>

        {/* ================= RIGHT PANEL ================= */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '55%',
            },
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#F8FAFC',
            px: {
              xs: 3,
              sm: 4,
            },
            py: 6,
          }}
        >
          <Box
            component={motion.div}
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              y: -3,
            }}
            transition={{
              duration: 0.45,
              ease: 'easeOut',
            }}
            sx={{
              width: '100%',
              maxWidth: 520,
              ml: {
                md: -2,
              },
              bgcolor: '#FFFFFF',
              borderRadius: '24px',
              border:
                '1px solid rgba(15, 23, 42, 0.06)',
              boxShadow:
                '0 1px 2px rgba(15, 23, 42, 0.03), 0 2px 8px rgba(15, 23, 42, 0.04), 0 40px 80px -24px rgba(15, 23, 42, 0.14)',
              transition:
                'box-shadow 0.3s ease',

              '&:hover': {
                boxShadow:
                  '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.05), 0 48px 96px -24px rgba(15, 23, 42, 0.18)',
              },

              px: {
                xs: 3.5,
                sm: 5,
              },

              py: {
                xs: 2.5,
                sm: 3.5,
              },
            }}
          >
            <Stack
              spacing={0.5}
              sx={{
                width: '100%',
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  bgcolor: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 0,
                  mx: 'auto',
                  mb: 1.5,
                }}
              >
                <FiBookOpen
                  size={20}
                  color="#FFFFFF"
                  aria-hidden="true"
                />
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.625rem',
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  textAlign: 'center',
                  mb: 0.5,
                }}
              >
                Welcome Back
              </Typography>

              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  color: '#64748B',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Sign in to continue your
                learning journey.
              </Typography>
            </Stack>

            <LoginForm />
          </Box>
        </Box>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: '#F8FAFC',
          borderTop:
            '1px solid #E2E8F0',
          px: {
            xs: 3,
            sm: 4,
          },
          py: 3,
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={{
            xs: 1,
            sm: 3,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            sx={{
              fontFamily:
                'Inter, sans-serif',
              fontSize: '0.75rem',
              color: '#64748B',
              textAlign: 'center',
            }}
          >
            © {currentYear} Praksha Academy.
            All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            component="nav"
            aria-label="Legal"
          >
            <MuiLink
              component={RouterLink}
              to="/terms"
              underline="hover"
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#64748B',

                '&:hover': {
                  color: '#2563EB',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #2563EB',
                  outlineOffset: '2px',
                  borderRadius: '4px',
                },
              }}
            >
              Terms
            </MuiLink>

            <MuiLink
              component={RouterLink}
              to="/privacy"
              underline="hover"
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#64748B',

                '&:hover': {
                  color: '#2563EB',
                },

                '&:focus-visible': {
                  outline:
                    '2px solid #2563EB',
                  outlineOffset: '2px',
                  borderRadius: '4px',
                },
              }}
            >
              Privacy Policy
            </MuiLink>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;