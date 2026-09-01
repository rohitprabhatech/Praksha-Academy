import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Divider,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiSave,
  FiBookOpen,
  FiUsers,
  FiAward,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10}$/;

const focusRingSx = {
  '&:focus-visible': {
    outline: '2px solid #2563EB',
    outlineOffset: '2px',
    borderRadius: '6px',
  },
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    bgcolor: '#FFFFFF',
    '& fieldset': { borderColor: '#E2E8F0' },
    '&:hover fieldset': { borderColor: '#CBD5E1' },
    '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '1.5px' },
    '&.Mui-error fieldset': { borderColor: '#EF4444' },
  },
};

const TeacherProfile = () => {
  const { teacherUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: teacherUser?.name || 'Teacher User',
    email: teacherUser?.email || 'teacher@praksha.com',
    phone: '9876543210',
    designation: 'Senior Technical Lead & Educator',
    bio: 'Educator specializing in Full Stack Web Architecture, Cloud Native applications, and AI integrations.',
    coursesCount: 4,
    studentsCount: 128,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      bio: profileData.bio,
    },
  });

  const onSubmit = async (formData) => {
    // Simulate API save
    await new Promise((resolve) => setTimeout(resolve, 600));

    setProfileData((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
    }));

    toast.success('Profile updated successfully!');
  };

  return (
    <Stack spacing={4}>
      {/* Header Title */}
      <Box>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: { xs: '1.5rem', sm: '1.875rem' },
            color: '#0F172A',
          }}
        >
          Teacher Profile
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          Manage your personal information, contact details, and teaching profile.
        </Typography>
      </Box>

      <div className="row g-4">
        {/* Profile Card Summary */}
        <div className="col-12 col-lg-4">
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mx: 'auto',
                mb: 2,
                bgcolor: '#2563EB',
                fontSize: '2rem',
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {profileData.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </Avatar>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: '#1E293B',
              }}
            >
              {profileData.name}
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                color: '#2563EB',
                fontWeight: 600,
                mb: 2,
              }}
            >
              {profileData.designation}
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                color: '#64748B',
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              {profileData.bio}
            </Typography>

            <Divider sx={{ my: 2, borderColor: '#F1F5F9' }} />

            <Stack direction="row" justifyContent="space-around">
              <Box>
                <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
                  <FiBookOpen size={16} color="#2563EB" />
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1E293B' }}>
                    {profileData.coursesCount}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>Courses</Typography>
              </Box>

              <Box>
                <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
                  <FiUsers size={16} color="#16A34A" />
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1E293B' }}>
                    {profileData.studentsCount}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.75rem', color: '#64748B' }}>Students</Typography>
              </Box>
            </Stack>
          </Paper>
        </div>

        {/* Profile Edit Form */}
        <div className="col-12 col-lg-8">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#1E293B',
                mb: 3,
              }}
            >
              Edit Profile Details
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2.5}>
                {/* Full Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiUser size={18} color="#64748B" />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={inputSx}
                    {...register('name', {
                      required: 'Full Name is required',
                      minLength: {
                        value: 2,
                        message: 'Full Name must be at least 2 characters',
                      },
                    })}
                  />
                </Grid>

                {/* Email Address */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiMail size={18} color="#64748B" />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={inputSx}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: EMAIL_PATTERN,
                        message: 'Enter a valid email address',
                      },
                    })}
                  />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    placeholder="10 digit phone number"
                    error={!!errors.phone}
                    helperText={errors.phone?.message || 'Optional. 10 digits if provided.'}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiPhone size={18} color="#64748B" />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={inputSx}
                    {...register('phone', {
                      validate: (value) => {
                        if (!value || value.trim() === '') return true;
                        return PHONE_PATTERN.test(value.trim()) || 'Phone must be exactly 10 digits';
                      },
                    })}
                  />
                </Grid>

                {/* Bio */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Bio / Headline"
                    placeholder="Short introduction about your expertise and teaching domain"
                    sx={inputSx}
                    {...register('bio')}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3.5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || !isDirty}
                  startIcon={<FiSave size={16} />}
                  sx={{
                    px: 3,
                    py: 1.25,
                    bgcolor: '#2563EB',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#1D4ED8' },
                    '&.Mui-disabled': { bgcolor: '#93C5FD', color: '#FFFFFF' },
                    ...focusRingSx,
                  }}
                >
                  {isSubmitting ? 'Saving...' : 'Save Profile'}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </div>
      </div>
    </Stack>
  );
};

export default TeacherProfile;
