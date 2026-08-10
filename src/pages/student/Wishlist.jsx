import { useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { FiHeart, FiCompass } from 'react-icons/fi';
import { toast } from 'react-toastify';
import WishlistCourseCard from '../../components/student/WishlistCourseCard';

// Mock data — no backend integration yet
const INITIAL_WISHLIST = [
  {
    id: 1,
    title: 'Advanced React Patterns',
    mentor: 'Rohan Mehta',
    category: 'Web Development',
    price: '\u20B94,999',
    originalPrice: '\u20B96,999',
    rating: 4.8,
    reviewCount: 238,
    duration: '18h',
    lessons: 64,
  },
  {
    id: 2,
    title: 'AI & Machine Learning Foundations',
    mentor: 'Priya Nair',
    category: 'Artificial Intelligence',
    price: '\u20B96,499',
    originalPrice: '\u20B98,999',
    rating: 4.9,
    reviewCount: 412,
    duration: '26h',
    lessons: 91,
  },
  {
    id: 3,
    title: 'Cloud Computing Fundamentals',
    mentor: 'Sneha Kapoor',
    category: 'Cloud Computing',
    price: '\u20B95,499',
    rating: 4.6,
    reviewCount: 156,
    duration: '14h',
    lessons: 48,
  },
  {
    id: 4,
    title: 'Cyber Security Essentials',
    mentor: 'Aarav Singh',
    category: 'Cyber Security',
    price: '\u20B95,999',
    originalPrice: '\u20B97,499',
    rating: 4.7,
    reviewCount: 189,
    duration: '20h',
    lessons: 57,
  },
];

const EmptyState = () => (
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
    <Stack spacing={2.5} alignItems="center">
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: 'rgba(37, 99, 235, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FiHeart size={28} color="#2563EB" aria-hidden="true" />
      </Box>
      <Stack spacing={0.75}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: '#1E293B',
          }}
        >
          Your wishlist is empty
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            color: '#64748B',
            maxWidth: 360,
          }}
        >
          Save courses you're interested in and they'll show up here.
        </Typography>
      </Stack>
      <Button
        component={RouterLink}
        to="/courses"
        startIcon={<FiCompass size={16} aria-hidden="true" />}
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: '8px',
          bgcolor: '#2563EB',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          transition: 'background-color 0.2s ease',
          '&:hover': { bgcolor: '#1D4ED8' },
          '&:focus-visible': {
            outline: '2px solid #2563EB',
            outlineOffset: '2px',
          },
        }}
      >
        Browse courses
      </Button>
    </Stack>
  </Box>
);

const Wishlist = () => {
  const [items, setItems] = useState(INITIAL_WISHLIST);

  const handleRemove = (id, title) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Removed "${title}" from wishlist`);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.375rem',
            color: '#1E293B',
          }}
        >
          My Wishlist
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            color: '#64748B',
          }}
        >
          {items.length > 0
            ? `${items.length} course${items.length > 1 ? 's' : ''} saved for later`
            : 'Courses you save will appear here'}
        </Typography>
      </Stack>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="row g-3">
          <AnimatePresence>
            {items.map((course, index) => (
              <div key={course.id} className="col-12 col-sm-6 col-lg-4">
                <WishlistCourseCard
                  {...course}
                  index={index}
                  onRemove={() => handleRemove(course.id, course.title)}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Stack>
  );
};

export default Wishlist;