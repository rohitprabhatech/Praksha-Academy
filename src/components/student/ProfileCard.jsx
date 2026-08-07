import { Box, Stack, Typography, Avatar, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { FiMail, FiCalendar, FiCamera, FiBookOpen, FiAward, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

const STAT_ICONS = {
  Courses: FiBookOpen,
  Certificates: FiAward,
};

/**
 * Reusable student profile summary card.
 * @param {string} name
 * @param {string} email
 * @param {string} avatarUrl - optional; falls back to initials
 * @param {string} role - e.g. "Student"
 * @param {string} joinedDate - e.g. "Jan 2025"
 * @param {Array<{label:string, value:string|number}>} stats - small stat chips (optional)
 * @param {boolean} verified - shows a verified badge on the avatar
 */
const ProfileCard = ({ name, email, avatarUrl, role = 'Student', joinedDate, stats = [], verified = true }) => {
  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  const handlePhotoChange = () => {
    // No backend/file-upload integration yet
    toast.info('Photo upload is coming soon');
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03), 0 12px 28px rgba(15, 23, 42, 0.06)',
      }}
    >
      {/* Gradient banner */}
      <Box
        sx={{
          position: 'relative',
          height: 76,
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: 'rgba(245, 158, 11, 0.18)',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </Box>

      <Stack spacing={2.25} alignItems="center" sx={{ px: 3, pb: 3, mt: -4.5 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <Avatar
            src={avatarUrl || undefined}
            alt={name ? `${name}'s profile photo` : 'Profile photo'}
            sx={{
              width: 88,
              height: 88,
              bgcolor: '#2563EB',
              fontSize: '1.75rem',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              border: '4px solid #FFFFFF',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.16)',
            }}
          >
            {!avatarUrl && initials}
          </Avatar>

          {verified && (
            <Box
              aria-label="Verified account"
              sx={{
                position: 'absolute',
                bottom: 2,
                left: -2,
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: '#22C55E',
                border: '2.5px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiCheck size={11} color="#FFFFFF" strokeWidth={3} aria-hidden="true" />
            </Box>
          )}

          <IconButton
            onClick={handlePhotoChange}
            aria-label="Change profile photo"
            size="small"
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 30,
              height: 30,
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)',
              color: '#475569',
              transition: 'background-color 0.15s ease, color 0.15s ease, transform 0.15s ease',
              '&:hover': {
                bgcolor: '#F8FAFC',
                color: '#2563EB',
                transform: 'scale(1.06)',
              },
              '&:focus-visible': {
                outline: '2px solid #2563EB',
                outlineOffset: '2px',
              },
            }}
          >
            <FiCamera size={14} aria-hidden="true" />
          </IconButton>
        </Box>

        <Stack spacing={0.625} alignItems="center">
          <Typography
            component="h2"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1.1875rem',
              color: '#1E293B',
              lineHeight: 1.2,
            }}
          >
            {name || 'Unnamed Student'}
          </Typography>
          <Chip
            icon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: '#2563EB',
                  ml: '10px !important',
                }}
              />
            }
            label={role}
            size="small"
            sx={{
              height: 22,
              width: 'fit-content',
              alignSelf: 'center',
              bgcolor: 'rgba(37, 99, 235, 0.08)',
              color: '#2563EB',
              fontWeight: 700,
              fontSize: '0.6875rem',
              fontFamily: 'Inter, sans-serif',
              '& .MuiChip-label': { px: 1 },
            }}
          />
        </Stack>

        <Stack spacing={0.75} sx={{ width: '100%' }}>
          {email && (
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <FiMail size={14} color="#64748B" aria-hidden="true" />
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#64748B',
                  wordBreak: 'break-word',
                }}
              >
                {email}
              </Typography>
            </Stack>
          )}
          {joinedDate && (
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <FiCalendar size={14} color="#64748B" aria-hidden="true" />
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#64748B',
                }}
              >
                Joined {joinedDate}
              </Typography>
            </Stack>
          )}
        </Stack>

        {stats.length > 0 && (
          <>
            <Box sx={{ width: '100%', height: '1px', bgcolor: '#E2E8F0' }} />

            <Box sx={{ display: 'flex', width: '100%', gap: 1.25 }}>
              {stats.map((stat) => {
                const StatIcon = STAT_ICONS[stat.label] || FiBookOpen;
                return (
                  <Box
                    key={stat.label}
                    component={motion.div}
                    whileHover={{ y: -2 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      flex: 1,
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '14px',
                      py: 1.75,
                      px: 1,
                      transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'default',
                      '&:hover': {
                        bgcolor: '#FFFFFF',
                        borderColor: 'rgba(37, 99, 235, 0.3)',
                        boxShadow: '0 6px 16px rgba(15, 23, 42, 0.06)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '9px',
                        bgcolor: 'rgba(37, 99, 235, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mb: 0.75,
                      }}
                    >
                      <StatIcon size={15} color="#2563EB" aria-hidden="true" />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.0625rem',
                        color: '#1E293B',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.6875rem',
                        color: '#64748B',
                        mt: 0.25,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ProfileCard;