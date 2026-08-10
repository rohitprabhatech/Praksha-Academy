import { Box, Stack, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiAward, FiDownload, FiEye, FiCheckCircle } from 'react-icons/fi';

/**
 * Earned certificate card.
 * @param {string} courseTitle
 * @param {string} mentor
 * @param {string} issuedDate - e.g. "12 Jun 2025"
 * @param {string} certificateId - e.g. "PA-WD-2025-0412"
 * @param {Function} onView
 * @param {Function} onDownload
 * @param {number} index - for staggered entrance
 */
const CertificateCard = ({
  courseTitle,
  mentor,
  issuedDate,
  certificateId,
  onView,
  onDownload,
  index = 0,
}) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '18px',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      '&:hover': {
        boxShadow: '0 12px 28px rgba(15, 23, 42, 0.1)',
        transform: 'translateY(-3px)',
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        height: 128,
        background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          bgcolor: 'rgba(255,255,255,0.92)',
          borderRadius: 999,
          px: 1.1,
          py: 0.4,
        }}
      >
        <FiCheckCircle size={12} color="#22C55E" aria-hidden="true" style={{ display: 'block' }} />
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '0.6875rem',
            color: '#1E293B',
            lineHeight: 1,
          }}
        >
          Verified
        </Typography>
      </Box>

      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px rgba(0,0,0,0.14)',
        }}
      >
        <FiAward size={30} color="#D97706" aria-hidden="true" />
      </Box>
    </Box>

    <Stack spacing={1.5} sx={{ p: 2.5, flex: 1 }}>
      <Stack spacing={0.5}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.0625rem',
            color: '#0F172A',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
          }}
        >
          {courseTitle}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: '#64748B',
          }}
        >
          Completed with {mentor}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          width: '100%',
          borderTop: '1px solid #F1F5F9',
          borderBottom: '1px solid #F1F5F9',
          py: 1.25,
        }}
      >
        <Stack spacing={0.125} sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: '#94A3B8' }}>
            Issued
          </Typography>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B' }}>
            {issuedDate}
          </Typography>
        </Stack>
        <Stack spacing={0.125} sx={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: '#94A3B8' }}>
            Certificate ID
          </Typography>
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#1E293B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {certificateId}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1.25} sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          onClick={onView}
          startIcon={<FiEye size={15} aria-hidden="true" />}
          aria-label={`View certificate for ${courseTitle}`}
          sx={{
            py: 1.25,
            borderRadius: '9px',
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            color: '#475569',
            fontWeight: 600,
            fontSize: '0.8125rem',
            textTransform: 'none',
            transition: 'background-color 0.15s ease, border-color 0.15s ease',
            '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' },
            '&:focus-visible': {
              outline: '2px solid #2563EB',
              outlineOffset: '2px',
            },
          }}
        >
          View
        </Button>
        <Button
          fullWidth
          onClick={onDownload}
          startIcon={<FiDownload size={15} aria-hidden="true" />}
          aria-label={`Download certificate for ${courseTitle}`}
          sx={{
            py: 1.25,
            borderRadius: '9px',
            bgcolor: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.8125rem',
            textTransform: 'none',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
            '&:hover': { bgcolor: '#1D4ED8', transform: 'translateY(-1px)' },
            '&:focus-visible': {
              outline: '2px solid #2563EB',
              outlineOffset: '2px',
            },
          }}
        >
          Download
        </Button>
      </Stack>
    </Stack>
  </Box>
);

export default CertificateCard;