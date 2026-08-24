import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
  Divider,
  CircularProgress,
} from '@mui/material';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Visible keyboard focus ring — only on :focus-visible, doesn't affect mouse interaction */
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
    '& fieldset': {
      borderColor: '#CBD5E1',
    },
    '&:hover fieldset': {
      borderColor: '#94A3B8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#2563EB',
  },
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (formData) => {
    // No backend integration yet — simulate request latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log(formData);
    toast.success('Logged in successfully');
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} aria-label="Sign in form">
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{
            htmlInput: {
              'aria-required': true,
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FiMail size={18} color="#64748B" aria-hidden="true" />
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

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            htmlInput: {
              'aria-required': true,
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FiLock size={18} color="#64748B" aria-hidden="true" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    sx={focusRingSx}
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} color="#64748B" aria-hidden="true" />
                    ) : (
                      <FiEye size={18} color="#64748B" aria-hidden="true" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={inputSx}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -0.5,
            width: '100%',
          }}
        >
          <FormControlLabel
            sx={{ m: 0, alignItems: 'center' }}
            control={
              <Checkbox
                size="small"
                {...register('rememberMe')}
                sx={{
                  color: '#CBD5E1',
                  p: 0.5,
                  '&.Mui-checked': { color: '#2563EB' },
                  ...focusRingSx,
                }}
              />
            }
            label={
              <Typography
                component="span"
                sx={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1, ml: 1 }}
              >
                Remember me
              </Typography>
            }
          />
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="none"
            aria-label="Forgot password? Reset it here"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#2563EB',
              lineHeight: 1,
              flexShrink: 0,
              '&:hover': { color: '#1D4ED8' },
              ...focusRingSx,
            }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          endIcon={!isSubmitting && <FiArrowRight size={16} aria-hidden="true" />}
          aria-busy={isSubmitting}
          sx={{
            py: 2,
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
            '&:active': {
              transform: 'translateY(0)',
            },
            '&.Mui-disabled': {
              bgcolor: '#93C5FD',
              color: '#FFFFFF',
              boxShadow: 'none',
            },
            ...focusRingSx,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} sx={{ color: '#FFFFFF' }} aria-label="Signing in" />
          ) : (
            'Sign in'
          )}
        </Button>

        <Divider sx={{ borderColor: '#E2E8F0' }} />

        <Typography sx={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748B' }}>
          New to Praksha Academy?{' '}
          <Link
            component={RouterLink}
            to="/register"
            underline="none"
            aria-label="Create a new account"
            sx={{
              fontWeight: 600,
              color: '#2563EB',
              '&:hover': { color: '#1D4ED8' },
              ...focusRingSx,
            }}
          >
            Create an account
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;