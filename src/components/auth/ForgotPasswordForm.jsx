import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Link,
  CircularProgress,
} from '@mui/material';
import { FiMail, FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_COOLDOWN_SECONDS = 30;

/* Visible keyboard focus ring — meets WCAG 2.4.7, only shows for :focus-visible */
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
      borderColor: '#E2E8F0',
    },
    '&:hover fieldset': {
      borderColor: '#CBD5E1',
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

const buttonSx = {
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
};

const backLinkSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.75,
  fontWeight: 600,
  fontSize: '0.875rem',
  color: '#2563EB',
  '&:hover': { color: '#1D4ED8' },
  ...focusRingSx,
};

const ForgotPasswordForm = () => {
  const [submittedEmail, setSubmittedEmail] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  // Countdown ticker for the resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return undefined;
    timerRef.current = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [cooldown]);

  const onSubmit = async (formData) => {
    // No backend integration yet — simulate request latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log(formData);
    toast.success('Reset link sent');
    setSubmittedEmail(formData.email);
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    const email = getValues('email');
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log({ email, action: 'resend' });
    toast.success('Reset link resent');
    setIsResending(false);
    setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  // ================= CONFIRMATION STATE =================
  if (submittedEmail) {
    const resendDisabled = cooldown > 0 || isResending;

    return (
      <Stack spacing={3} sx={{ width: '100%' }} aria-live="polite">
        <Stack spacing={0.75} sx={{ width: '100%', textAlign: 'center' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'rgba(34, 197, 94, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 0,
              mx: 'auto',
              mb: 1,
            }}
          >
            <FiCheckCircle size={26} color="#22C55E" aria-hidden="true" />
          </Box>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1.625rem',
              color: '#0F172A',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            Check your email
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              color: '#64748B',
              textAlign: 'center',
            }}
          >
            We sent a password reset link to
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: '#1E293B',
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {submittedEmail}
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#64748B',
            }}
          >
            Didn&apos;t receive the email? Check your spam folder or{' '}
            {resendDisabled ? (
              <Typography
                component="span"
                aria-live="polite"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#94A3B8',
                }}
              >
                {isResending
                  ? 'resending…'
                  : `resend available in ${cooldown}s`}
              </Typography>
            ) : (
              <Link
                component="button"
                type="button"
                onClick={handleResend}
                underline="none"
                aria-label="Resend password reset email"
                sx={{
                  fontWeight: 600,
                  color: '#2563EB',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#1D4ED8' },
                  ...focusRingSx,
                }}
              >
                click to resend
              </Link>
            )}
            .
          </Typography>

          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            aria-label="Back to sign in"
            sx={backLinkSx}
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Back to sign in
          </Link>
        </Stack>
      </Stack>
    );
  }

  // ================= REQUEST STATE =================
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Stack spacing={0.75} sx={{ width: '100%', textAlign: 'center' }}>
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
          <FiMail size={20} color="#FFFFFF" aria-hidden="true" />
        </Box>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.625rem',
            color: '#0F172A',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Forgot password?
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            color: '#64748B',
            textAlign: 'center',
          }}
        >
          No worries, we&apos;ll send you reset instructions.
        </Typography>
      </Stack>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Forgot password form"
      >
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

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            endIcon={!isSubmitting && <FiArrowRight size={16} aria-hidden="true" />}
            sx={buttonSx}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={20} sx={{ color: '#FFFFFF' }} aria-label="Sending reset link" />
            ) : (
              'Send reset link'
            )}
          </Button>

          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            aria-label="Back to sign in"
            sx={backLinkSx}
          >
            <FiArrowLeft size={16} aria-hidden="true" />
            Back to sign in
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ForgotPasswordForm;