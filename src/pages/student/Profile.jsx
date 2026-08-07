import { useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { FiUser, FiMail, FiPhone, FiSave, FiEdit3 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ProfileCard from '../../components/student/ProfileCard';

// Mock data — no backend integration yet
const STUDENT = {
  name: 'Aditi Sharma',
  email: 'aditi.sharma@example.com',
  phone: '+91 98765 43210',
  role: 'Student',
  joinedDate: 'Jan 2025',
  stats: [
    { label: 'Courses', value: 6 },
    { label: 'Certificates', value: 2 },
  ],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    bgcolor: '#FFFFFF',
    '& fieldset': { borderColor: '#E2E8F0' },
    '&:hover fieldset': { borderColor: '#CBD5E1' },
    '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '2px' },
    // Explicit error border — guarantees the red state renders even if a
    // later sx override elsewhere in the app tightens fieldset specificity.
    '&.Mui-error fieldset': { borderColor: '#EF4444' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#2563EB' },
  '& .MuiInputLabel-root.Mui-error': { color: '#EF4444' },
};

const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
    borderRadius: '6px',
  },
};

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: STUDENT.name,
      email: STUDENT.email,
      phone: STUDENT.phone,
    },
  });

  const onSubmit = async (formData) => {
    // No backend integration yet — simulate request latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log(formData);
    toast.success('Profile updated successfully');
  };

  return (
    <Stack spacing={3}>
      <Typography
        component="h1"
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '1.375rem',
          color: '#1E293B',
        }}
      >
        My Profile
      </Typography>

      <div className="row g-3">
        {/* Profile summary */}
        <div className="col-12 col-md-4">
          <ProfileCard {...STUDENT} />
        </div>

        {/* Editable details */}
        <div className="col-12 col-md-8">
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03), 0 12px 28px rgba(15, 23, 42, 0.06)',
              p: { xs: 2.5, sm: 3.5 },
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(37, 99, 235, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiEdit3 size={17} color="#2563EB" aria-hidden="true" />
              </Box>
              <Stack spacing={0.5}>
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.0625rem',
                    color: '#1E293B',
                  }}
                >
                  Personal details
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: '#64748B',
                  }}
                >
                  Update your name, email and phone number.
                </Typography>
              </Stack>
            </Stack>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              aria-label="Update profile form"
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  slotProps={{
                    htmlInput: { 'aria-required': true },
                    input: {
                      startAdornment: <FiUser size={18} color="#64748B" aria-hidden="true" style={{ marginRight: 8 }} />,
                    },
                  }}
                  sx={inputSx}
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    maxLength: { value: 60, message: 'Name is too long' },
                  })}
                />

                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  slotProps={{
                    htmlInput: { 'aria-required': true },
                    input: {
                      startAdornment: <FiMail size={18} color="#64748B" aria-hidden="true" style={{ marginRight: 8 }} />,
                    },
                  }}
                  sx={inputSx}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address' },
                  })}
                />

                <TextField
                  fullWidth
                  label="Phone number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  slotProps={{
                    input: {
                      startAdornment: <FiPhone size={18} color="#64748B" aria-hidden="true" style={{ marginRight: 8 }} />,
                    },
                  }}
                  sx={inputSx}
                  {...register('phone', {
                    pattern: {
                      value: /^[+]?[\d\s-]{10,15}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                />

                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  {isDirty && !isSubmitting && (
                    <Button
                      type="button"
                      onClick={() => reset()}
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderRadius: '8px',
                        color: '#64748B',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#F1F5F9' },
                        ...focusRingSx,
                      }}
                    >
                      Reset
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    startIcon={!isSubmitting && <FiSave size={16} aria-hidden="true" />}
                    aria-busy={isSubmitting}
                    sx={{
                      px: 3.5,
                      py: 1.5,
                      borderRadius: '8px',
                      bgcolor: '#2563EB',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      textTransform: 'none',
                      transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
                      boxShadow: '0 1px 2px rgba(37, 99, 235, 0.1)',
                      '&:hover': {
                        bgcolor: '#1D4ED8',
                        boxShadow: '0 12px 20px -6px rgba(37, 99, 235, 0.45)',
                        transform: 'translateY(-1px)',
                      },
                      '&.Mui-disabled': {
                        bgcolor: '#94A3B8',
                        color: '#FFFFFF',
                        boxShadow: 'none',
                      },
                      ...focusRingSx,
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} sx={{ color: '#FFFFFF' }} aria-label="Saving changes" />
                    ) : (
                      'Save changes'
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </div>
      </div>
    </Stack>
  );
};

export default Profile;