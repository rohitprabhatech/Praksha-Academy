import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiSun,
  FiMoon,
  FiMonitor,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

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

const TeacherSettings = () => {
  const [themeMode, setThemeMode] = useState('light');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword') || '';
  const confirmPassword = watch('confirmPassword') || '';

  const passwordStrength = useMemo(() => {
    const hasLength = newPassword.length >= 6;
    const hasLetters = /[A-Za-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    let score = 0;
    if (hasLength) score += 1;
    if (hasLetters) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecial) score += 1;

    let label = 'Enter a password';
    let color = '#94A3B8';

    if (newPassword.length > 0) {
      if (score <= 1) {
        label = 'Weak';
        color = '#EF4444';
      } else if (score === 2) {
        label = 'Fair';
        color = '#F59E0B';
      } else if (score === 3) {
        label = 'Good';
        color = '#2563EB';
      } else {
        label = 'Strong';
        color = '#16A34A';
      }
    }

    return { score, label, color };
  }, [newPassword]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setThemeMode(newTheme);
    toast.success(`Theme preference updated to ${newTheme.toUpperCase()}`);
  };

  const onPasswordSubmit = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    toast.success('Password changed successfully');
    reset();
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 800 }}>
      {/* Header */}
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
          Teacher Settings
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#64748B',
            mt: 0.5,
          }}
        >
          Manage theme preferences and account security credentials.
        </Typography>
      </Box>

      {/* Theme Preference Section */}
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
            mb: 0.5,
          }}
        >
          Appearance & Theme
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: '#64748B',
            mb: 3,
          }}
        >
          Choose your preferred theme display for the teacher portal.
        </Typography>

        <RadioGroup row value={themeMode} onChange={handleThemeChange}>
          <div className="row g-3 w-100">
            {[
              { id: 'light', label: 'Light Theme', icon: FiSun },
              { id: 'dark', label: 'Dark Theme', icon: FiMoon },
              { id: 'system', label: 'System Default', icon: FiMonitor },
            ].map((option) => {
              const Icon = option.icon;
              const selected = themeMode === option.id;
              return (
                <div key={option.id} className="col-12 col-sm-4">
                  <Box
                    component="label"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 2,
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: selected ? '#2563EB' : '#E2E8F0',
                      bgcolor: selected ? 'rgba(37, 99, 235, 0.04)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: selected ? '#2563EB' : '#CBD5E1',
                      },
                    }}
                  >
                    <Radio value={option.id} size="small" sx={{ p: 0 }} />
                    <Icon size={18} color={selected ? '#2563EB' : '#64748B'} />
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: selected ? 600 : 500,
                        fontSize: '0.875rem',
                        color: selected ? '#2563EB' : '#1E293B',
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </Paper>

      {/* Change Password Section */}
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
            mb: 0.5,
          }}
        >
          Change Password
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: '#64748B',
            mb: 3,
          }}
        >
          Update your password to keep your teacher account secure.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(onPasswordSubmit)}>
          <Stack spacing={2.5}>
            {/* Current Password */}
            <TextField
              fullWidth
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock size={18} color="#64748B" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        sx={focusRingSx}
                      >
                        {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
            />

            {/* New Password */}
            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock size={18} color="#64748B" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        sx={focusRingSx}
                      >
                        {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: (value) =>
                  value !== watch('currentPassword') ||
                  'New password must be different from current password',
              })}
            />

            {/* Password Strength Meter */}
            {newPassword.length > 0 && (
              <Box sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                    Strength
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </Typography>
                </Stack>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.5 }}>
                  {[0, 1, 2, 3].map((bar) => (
                    <Box
                      key={bar}
                      sx={{
                        height: 4,
                        borderRadius: 999,
                        bgcolor: bar < passwordStrength.score ? passwordStrength.color : '#E2E8F0',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Confirm New Password */}
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock size={18} color="#64748B" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        sx={focusRingSx}
                      >
                        {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputSx}
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) => value === newPassword || 'Passwords do not match',
              })}
            />

            {/* Password Match Status */}
            {confirmPassword.length > 0 && (
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: confirmPassword === newPassword ? '#DCFCE7' : '#FEE2E2',
                    color: confirmPassword === newPassword ? '#16A34A' : '#DC2626',
                  }}
                >
                  <FiCheck size={12} strokeWidth={3} />
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: confirmPassword === newPassword ? '#16A34A' : '#DC2626',
                  }}
                >
                  {confirmPassword === newPassword ? 'Passwords match' : 'Passwords do not match'}
                </Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="flex-end" sx={{ pt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  px: 3,
                  py: 1.25,
                  bgcolor: '#2563EB',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '8px',
                  '&:hover': { bgcolor: '#1D4ED8' },
                  ...focusRingSx,
                }}
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default TeacherSettings;
