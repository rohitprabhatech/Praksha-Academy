import { Box, Stack, Typography, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiStar,
  FiUser,
  FiArrowRight,
  FiClock,
  FiPlayCircle,
  FiCode,
  FiCpu,
  FiCloud,
  FiShield,
} from 'react-icons/fi';

const CATEGORY_META = {
  'Web Development': { icon: FiCode, gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' },
  'Artificial Intelligence': { icon: FiCpu, gradient: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)' },
  'Cloud Computing': { icon: FiCloud, gradient: 'linear-gradient(135deg, #38BDF8 0%, #0369A1 100%)' },
  'Cyber Security': { icon: FiShield, gradient: 'linear-gradient(135deg, #FBBF24 0%, #B45309 100%)' },
};

const FALLBACK_META = { icon: FiCode, gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' };

const discountPercent = (price, originalPrice) => {
  const num = (str) => Number(str.replace(/[^\d]/g, ''));
  const current = num(price);
  const original = num(originalPrice);
  if (!current || !original || original <= current) return null;
  return Math.round(((original - current) / original) * 100);
};

/**
 * Wishlist course card.
 * @param {string} title
 * @param {string} mentor
 * @param {string} category
 * @param {string} price
 * @param {string} originalPrice - optional; shown struck-through beside price
 * @param {number} rating - 0-5
 * @param {number} reviewCount - optional; shown beside the rating
 * @param {string} duration - e.g. "12h"
 * @param {number} lessons - lesson count
 * @param {Function} onRemove - called when the heart is toggled off
 * @param {number} index - for staggered entrance
 */
const WishlistCourseCard = ({
  title,
  mentor,
  category,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  lessons,
  onRemove,
  index = 0,
}) => {
  const { icon: CategoryIcon, gradient } = CATEGORY_META[category] || FALLBACK_META;
  const discount = originalPrice ? discountPercent(price, originalPrice) : null;

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
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
          height: 132,
          background: gradient,
          overflow: 'hidden',
        }}
      >
        {/* Faint diagonal texture — restrained, one repeated line pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)',
          }}
        />

        <IconButton
          onClick={onRemove}
          aria-label={`Remove ${title} from wishlist`}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.15s ease, transform 0.15s ease',
            '&:hover': {
              bgcolor: '#FFFFFF',
              transform: 'scale(1.06)',
            },
            '&:focus-visible': {
              outline: '2px solid #FFFFFF',
              outlineOffset: '2px',
            },
          }}
        >
          <FiHeart size={15} color="#EF4444" fill="#EF4444" aria-hidden="true" />
        </IconButton>

        {discount && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: '#F59E0B',
              borderRadius: '6px',
              px: 1,
              py: 0.375,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.6875rem',
                color: '#FFFFFF',
              }}
            >
              {discount}% OFF
            </Typography>
          </Box>
        )}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ position: 'absolute', left: 16, bottom: 14, right: 16 }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              bgcolor: 'rgba(255,255,255,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            }}
          >
            <CategoryIcon size={22} color="#1E293B" aria-hidden="true" />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            {category}
          </Typography>
        </Stack>
      </Box>

      <Stack spacing={1.75} sx={{ p: 2.5, flex: 1 }}>
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
            {title}
          </Typography>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <FiUser size={12} color="#64748B" aria-hidden="true" style={{ display: 'block' }} />
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                color: '#64748B',
                lineHeight: 1,
              }}
            >
              {mentor}
            </Typography>
          </Stack>
        </Stack>

        {(duration || lessons) && (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              borderTop: '1px solid #F1F5F9',
              borderBottom: '1px solid #F1F5F9',
              py: 1.25,
            }}
          >
            {duration && (
              <Stack direction="row" spacing={0.625} alignItems="center">
                <FiClock size={13} color="#94A3B8" aria-hidden="true" style={{ display: 'block' }} />
                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748B', fontWeight: 500, lineHeight: 1 }}>
                  {duration}
                </Typography>
              </Stack>
            )}
            {lessons && (
              <Stack direction="row" spacing={0.625} alignItems="center">
                <FiPlayCircle size={13} color="#94A3B8" aria-hidden="true" style={{ display: 'block' }} />
                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748B', fontWeight: 500, lineHeight: 1 }}>
                  {lessons} lessons
                </Typography>
              </Stack>
            )}
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 'auto' }}>
              <FiStar size={13} color="#F59E0B" fill="#F59E0B" aria-hidden="true" style={{ display: 'block' }} />
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', lineHeight: 1 }}>
                {rating?.toFixed(1)}
              </Typography>
              {reviewCount && (
                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: '#94A3B8', lineHeight: 1 }}>
                  ({reviewCount})
                </Typography>
              )}
            </Stack>
          </Stack>
        )}

        <Stack spacing={1.25} sx={{ mt: 'auto' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.125rem',
                color: '#0F172A',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              {price}
            </Typography>
            {originalPrice && (
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem',
                  color: '#94A3B8',
                  textDecoration: 'line-through',
                  lineHeight: 1,
                }}
              >
                {originalPrice}
              </Typography>
            )}
          </Stack>

          <Button
            fullWidth
            endIcon={<FiArrowRight size={15} aria-hidden="true" />}
            aria-label={`Enroll in ${title}`}
            sx={{
              px: 2.5,
              py: 1.25,
              borderRadius: '9px',
              bgcolor: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'none',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.22)',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              '&:hover': { bgcolor: '#1D4ED8', transform: 'translateY(-1px)' },
              '&:focus-visible': {
                outline: '2px solid #2563EB',
                outlineOffset: '2px',
              },
            }}
          >
            Enroll now
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WishlistCourseCard;