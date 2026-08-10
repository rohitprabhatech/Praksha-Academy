import { Box, Stack, Typography, LinearProgress, IconButton, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import {
  FiClock,
  FiHeart,
  FiPlay,
  FiShoppingCart,
  FiCode,
  FiCloud,
  FiPenTool,
  FiDatabase,
  FiShield,
  FiBookOpen,
} from 'react-icons/fi';

// Category → icon + accent color. Falls back to a neutral blue for unknown categories.
const CATEGORY_META = {
  'Web Development': { icon: FiCode, color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)' },
  'Cloud Computing': { icon: FiCloud, color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.1)' },
  'Design': { icon: FiPenTool, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  'AI & Data': { icon: FiDatabase, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  'Cyber Security': { icon: FiShield, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
};
const DEFAULT_META = { icon: FiBookOpen, color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)' };

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/**
 * Reusable course card.
 * @param {string} title
 * @param {string} mentor
 * @param {string} thumbnail - image URL (optional; falls back to a category icon)
 * @param {string} category
 * @param {'enrolled'|'wishlist'} variant
 * @param {number} progress - 0-100, only used when variant="enrolled"
 * @param {boolean} completed - only used when variant="enrolled"
 * @param {string} price - only used when variant="wishlist"
 * @param {number} duration - hours, optional
 * @param {function} onPrimaryAction - "Continue" or "Enroll now" click
 * @param {function} onRemove - only used when variant="wishlist"; shows a remove/heart button
 * @param {number} index - for stagger animation
 */
const CourseCard = ({
  title,
  mentor,
  thumbnail,
  category,
  variant = 'enrolled',
  progress = 0,
  completed = false,
  price,
  duration,
  onPrimaryAction = () => { },
  onRemove,
  index = 0,
}) => {
  const meta = CATEGORY_META[category] || DEFAULT_META;
  const CategoryIcon = meta.icon;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '18px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.25s ease',
        '&:hover': {
          boxShadow: '0 18px 36px rgba(15, 23, 42, 0.1)',
        },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          position: 'relative',
          height: 150,
          bgcolor: thumbnail ? 'transparent' : meta.bg,
          backgroundImage: thumbnail ? `url(${thumbnail})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!thumbnail && (
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CategoryIcon size={26} color={meta.color} aria-hidden="true" />
          </Box>
        )}

        {/* Category badge — shown once, top-left */}
        {category && (
          <Chip
            icon={<CategoryIcon size={12} color={meta.color} aria-hidden="true" style={{ marginLeft: 6 }} />}
            label={category}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: '#FFFFFF',
              color: meta.color,
              fontWeight: 700,
              fontSize: '0.6875rem',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)',
              '& .MuiChip-icon': { color: meta.color },
            }}
          />
        )}

        {completed && (
          <Chip
            label="Completed"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: '#22C55E',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.6875rem',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        )}

        {variant === 'wishlist' && onRemove && (
          <IconButton
            onClick={onRemove}
            aria-label={`Remove ${title} from wishlist`}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: '#FFFFFF' },
              '&:focus-visible': {
                outline: '2px solid #2563EB',
                outlineOffset: '2px',
              },
            }}
          >
            <FiHeart size={16} color="#EF4444" fill="#EF4444" aria-hidden="true" />
          </IconButton>
        )}
      </Box>

      {/* Content */}
      <Stack spacing={1.5} sx={{ p: 2, flex: 1 }}>
        <Typography
          component="h3"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#1E293B',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5em',
          }}
        >
          {title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              bgcolor: meta.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.5625rem',
                color: meta.color,
              }}
            >
              {getInitials(mentor)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8125rem',
              color: '#64748B',
            }}
          >
            {mentor}
          </Typography>
        </Stack>

        {duration && (
          <Stack direction="row" spacing={0.75} alignItems="center">
            <FiClock size={13} color="#94A3B8" aria-hidden="true" />
            <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#94A3B8' }}>
              {duration} hours
            </Typography>
          </Stack>
        )}

        <Box sx={{ flex: 1 }} />

        {variant === 'enrolled' ? (
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                Progress
              </Typography>
              <Chip
                label={`${progress}%`}
                size="small"
                sx={{
                  ml: 'auto',
                  height: 20,
                  bgcolor: completed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                  color: completed ? '#22C55E' : '#2563EB',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  fontFamily: 'Inter, sans-serif',
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 999,
                bgcolor: '#E2E8F0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 999,
                  bgcolor: completed ? '#22C55E' : '#2563EB',
                },
              }}
            />
            <Button
              fullWidth
              onClick={onPrimaryAction}
              startIcon={<FiPlay size={14} aria-hidden="true" />}
              sx={{
                mt: 0.5,
                py: 1,
                borderRadius: '8px',
                bgcolor: completed ? 'rgba(34, 197, 94, 0.1)' : '#2563EB',
                color: completed ? '#22C55E' : '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.8125rem',
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  bgcolor: completed ? 'rgba(34, 197, 94, 0.16)' : '#1D4ED8',
                  boxShadow: completed ? 'none' : '0 8px 16px -6px rgba(37, 99, 235, 0.4)',
                },
                '&:focus-visible': {
                  outline: '2px solid #2563EB',
                  outlineOffset: '2px',
                },
              }}
            >
              {completed ? 'Review course' : 'Continue'}
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            {price && (
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#1E293B',
                }}
              >
                {price}
              </Typography>
            )}
            <Button
              onClick={onPrimaryAction}
              startIcon={<FiShoppingCart size={14} aria-hidden="true" />}
              sx={{
                py: 1,
                px: 2,
                borderRadius: '8px',
                bgcolor: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.8125rem',
                textTransform: 'none',
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                  boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)',
                },
                '&:focus-visible': {
                  outline: '2px solid #2563EB',
                  outlineOffset: '2px',
                },
              }}
            >
              Enroll now
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default CourseCard;