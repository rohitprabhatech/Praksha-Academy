import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'

import {
  Link as RouterLink,
  useNavigate,
} from 'react-router-dom'

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiAlertCircle,
  FiX,
} from 'react-icons/fi'

import { useEffect, useRef, useState } from 'react'

import { useAuth } from '../../../context/AuthContext'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import logoMark from '../../../assets/praksha-mark.png'


function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // =========================================================
  // STATE
  // =========================================================

  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [rememberMe, setRememberMe] = useState(false)

  const [error, setError] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const errorTimerRef = useRef(null)


  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current)
      }
    }
  }, [])


  // =========================================================
  // ERROR HANDLING
  // =========================================================

  const showError = () => {
    setError('login-error')

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current)
    }

    errorTimerRef.current = setTimeout(() => {
      setError('')
      errorTimerRef.current = null
    }, 3500)
  }


  const clearError = () => {
    setError('')

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current)
      errorTimerRef.current = null
    }
  }


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    clearError()

    const normalizedEmail = email.trim().toLowerCase()
    const trimmedPassword = password.trim()

    // Basic validation
    if (!normalizedEmail || !trimmedPassword) {
      showError()
      return
    }

    setIsSubmitting(true)

    try {
      const result = await login({
        email: normalizedEmail,
        password: trimmedPassword,
        rememberMe,
        allowedRole: 'admin',
      })

      console.log('ADMIN LOGIN RESULT:', result)

      // Only admin can enter admin dashboard
      if (
        !result.success ||
        result.user?.role !== 'admin'
      ) {
        showError()
        return
      }

      navigate('/admin/dashboard', {
        replace: true,
      })
    } catch (loginError) {
      console.error('ADMIN LOGIN ERROR:', loginError)
      showError()
    } finally {
      setIsSubmitting(false)
    }
  }


  // =========================================================
  // UI
  // =========================================================

  return (
    <Box
      sx={{
        minHeight: '100vh',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        px: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },

        py: {
          xs: 3,
          sm: 4,
        },

        bgcolor: 'background.default',

        backgroundImage: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at top, rgba(37,99,235,0.12), transparent 42%)'
            : 'radial-gradient(circle at top, rgba(37,99,235,0.07), transparent 42%)',
      }}
    >

      <AdminSurface
        sx={{
          width: '100%',

          maxWidth: 470,

          p: {
            xs: 2.75,
            sm: 4,
          },

          borderRadius: '20px',

          boxShadow:
            '0 20px 50px rgba(15, 23, 42, 0.08)',

          border: '1px solid #E2E8F0',
        }}
      >

        <Stack spacing={2.5}>


          {/* =================================================
              BRAND / HEADER
          ================================================= */}

          <Stack
            spacing={1.25}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
            }}
          >

            {/* Logo */}

            <Box
              sx={{
                width: 64,
                height: 64,

                display: 'grid',
                placeItems: 'center',

                borderRadius: '18px',

                bgcolor: '#FFFFFF',

                border: '1px solid #E2E8F0',

                boxShadow:
                  '0 8px 22px rgba(15, 23, 42, 0.08)',

                mb: 0.25,
              }}
            >

              <Box
                component="img"
                src={logoMark}
                alt="Praksha Academy"
                sx={{
                  width: 45,
                  height: 45,
                  objectFit: 'contain',
                }}
              />

            </Box>


            {/* Heading */}

            <Box>

              <Typography
                component="h1"
                sx={{
                  color: '#0F172A',

                  fontSize: {
                    xs: '1.55rem',
                    sm: '1.75rem',
                  },

                  fontWeight: 800,

                  letterSpacing: '-0.025em',

                  lineHeight: 1.2,
                }}
              >
                Admin Login
              </Typography>


              <Typography
                sx={{
                  mt: 0.65,

                  color: '#64748B',

                  fontSize: '0.88rem',

                  lineHeight: 1.5,
                }}
              >
                Manage Praksha Academy operations securely.
              </Typography>

            </Box>

          </Stack>


          {/* =================================================
              ERROR ALERT
          ================================================= */}

          {error && (
            <Box
              role="alert"
              aria-live="assertive"
              sx={{
                display: 'flex',

                alignItems: 'center',

                gap: 1,

                px: 1.15,
                py: 0.85,

                minHeight: 44,

                borderRadius: '10px',

                bgcolor: '#FEF2F2',

                border: '1px solid #FECACA',

                animation:
                  'adminLoginAlertEnter 220ms ease-out',

                '@keyframes adminLoginAlertEnter': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-4px)',
                  },

                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >

              {/* Error icon */}

              <Box
                sx={{
                  width: 28,
                  height: 28,

                  minWidth: 28,

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  borderRadius: '7px',

                  bgcolor: '#FEE2E2',

                  color: '#DC2626',
                }}
              >
                <FiAlertCircle
                  size={16}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Box>


              {/* Error message */}

              <Typography
                sx={{
                  flex: 1,

                  color: '#B91C1C',

                  fontSize: '0.78rem',

                  fontWeight: 600,

                  lineHeight: 1.35,
                }}
              >
                Invalid administrator credentials.
                Please try again.
              </Typography>


              {/* Close */}

              <IconButton
                onClick={clearError}
                size="small"
                aria-label="Dismiss error message"
                sx={{
                  width: 26,
                  height: 26,

                  flexShrink: 0,

                  color: '#B91C1C',

                  '&:hover': {
                    bgcolor: '#FEE2E2',
                    color: '#991B1B',
                  },

                  '&:focus-visible': {
                    outline: '2px solid #2563EB',
                    outlineOffset: '2px',
                  },
                }}
              >
                <FiX size={15} />
              </IconButton>

            </Box>
          )}


          {/* =================================================
              FORM
          ================================================= */}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >

            <Stack spacing={2.5}>


              {/* =================================================
                  EMAIL
              ================================================= */}

              <TextField
                label="Administrator Email"
                type="email"

                value={email}

                onChange={(event) => {
                  setEmail(event.target.value)

                  if (error) {
                    clearError()
                  }
                }}

                placeholder="admin@praksha.academy"

                fullWidth

                required

                autoComplete="username"

                disabled={isSubmitting}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail
                        size={18}
                        color="#64748B"
                        aria-hidden="true"
                      />
                    </InputAdornment>
                  ),
                }}

                sx={{
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                  },

                  '& .MuiInputBase-root': {
                    borderRadius: '12px',

                    backgroundColor: '#FFFFFF',

                    transition:
                      'box-shadow 0.2s ease, border-color 0.2s ease',
                  },

                  '& .MuiInputBase-input': {
                    fontWeight: 500,
                  },

                  '& .MuiInputBase-root.Mui-focused': {
                    boxShadow:
                      '0 0 0 3px rgba(37, 99, 235, 0.10)',
                  },
                }}
              />


              {/* =================================================
                  PASSWORD
              ================================================= */}

              <TextField
                label="Password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }

                value={password}

                onChange={(event) => {
                  setPassword(event.target.value)

                  if (error) {
                    clearError()
                  }
                }}

                placeholder="Enter administrator password"

                fullWidth

                required

                autoComplete="current-password"

                disabled={isSubmitting}

                InputProps={{

                  startAdornment: (
                    <InputAdornment position="start">

                      <FiLock
                        size={18}
                        color="#64748B"
                        aria-hidden="true"
                      />

                    </InputAdornment>
                  ),


                  endAdornment: (
                    <InputAdornment position="end">

                      <Box
                        component="button"
                        type="button"

                        onClick={() =>
                          setShowPassword(
                            (value) => !value
                          )
                        }

                        disabled={isSubmitting}

                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }

                        title={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }

                        sx={{
                          display: 'inline-flex',

                          alignItems: 'center',

                          justifyContent: 'center',

                          gap: 0.45,

                          minWidth: 58,

                          height: 32,

                          px: 0.75,

                          border: 'none',

                          borderRadius: '7px',

                          bgcolor: 'transparent',

                          color: '#64748B',

                          fontFamily: 'inherit',

                          fontSize: '0.72rem',

                          fontWeight: 700,

                          cursor: isSubmitting
                            ? 'default'
                            : 'pointer',

                          transition:
                            'color 0.18s ease, background-color 0.18s ease',

                          '&:hover': {
                            color: '#2563EB',

                            bgcolor:
                              'rgba(37, 99, 235, 0.07)',
                          },

                          '&:focus-visible': {
                            outline:
                              '2px solid #2563EB',

                            outlineOffset: '2px',
                          },

                          '&:disabled': {
                            opacity: 0.5,

                            cursor: 'default',
                          },
                        }}
                      >

                        {showPassword ? (
                          <FiEyeOff
                            size={17}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <FiEye
                            size={17}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}

                        <span>
                          {showPassword
                            ? 'Hide'
                            : 'Show'}
                        </span>

                      </Box>

                    </InputAdornment>
                  ),
                }}

                sx={{
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                  },

                  '& .MuiInputBase-root': {
                    borderRadius: '12px',

                    backgroundColor: '#FFFFFF',

                    transition:
                      'box-shadow 0.2s ease, border-color 0.2s ease',
                  },

                  '& .MuiInputBase-input': {
                    fontWeight: 500,

                    letterSpacing:
                      showPassword
                        ? '0'
                        : '0.02em',
                  },

                  '& .MuiInputBase-root.Mui-focused': {
                    boxShadow:
                      '0 0 0 3px rgba(37, 99, 235, 0.10)',
                  },
                }}
              />


              {/* =================================================
                  REMEMBER + FORGOT
              ================================================= */}

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                {/* Remember me */}

                <FormControlLabel
                  sx={{
                    m: 0,
                    flexShrink: 0,
                  }}
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                      size="small"
                      disabled={isSubmitting}
                      sx={{
                        p: 0.5,

                        color: '#94A3B8',

                        '&.Mui-checked': {
                          color: '#2563EB',
                        },

                        '&:focus-visible': {
                          outline: '2px solid #2563EB',
                          outlineOffset: '2px',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      component="span"
                      sx={{
                        ml: 0.5,
                        color: '#475569',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Remember me
                    </Typography>
                  }
                />

                {/* Forgot password */}

                <Typography
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    color: '#2563EB',

                    fontSize: '0.84rem',

                    fontWeight: 700,

                    textDecoration: 'none',

                    whiteSpace: 'nowrap',

                    ml: 'auto',

                    transition: 'color 0.18s ease',

                    '&:hover': {
                      color: '#1D4ED8',
                      textDecoration: 'underline',
                    },

                    '&:focus-visible': {
                      outline: '2px solid #2563EB',
                      outlineOffset: '3px',
                      borderRadius: '3px',
                    },
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>


              {/* =================================================
                  LOGIN BUTTON
              ================================================= */}

              <Button
                type="submit"

                fullWidth

                disabled={isSubmitting}

                endIcon={
                  !isSubmitting && (
                    <FiArrowRight
                      size={18}
                      aria-hidden="true"
                    />
                  )
                }

                sx={{
                  minHeight: 52,

                  borderRadius: '12px',

                  bgcolor: '#2563EB',

                  color: '#FFFFFF',

                  fontWeight: 700,

                  fontSize: '0.95rem',

                  textTransform: 'none',

                  boxShadow:
                    '0 8px 18px rgba(37, 99, 235, 0.18)',

                  transition:
                    'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',

                  '&:hover': {
                    bgcolor: '#1D4ED8',

                    boxShadow:
                      '0 12px 24px rgba(37, 99, 235, 0.24)',

                    transform:
                      'translateY(-1px)',
                  },

                  '&:active': {
                    transform:
                      'translateY(0)',
                  },

                  '&.Mui-disabled': {
                    bgcolor: '#93C5FD',

                    color: '#FFFFFF',

                    boxShadow: 'none',
                  },

                  '&:focus-visible': {
                    outline:
                      '2px solid #2563EB',

                    outlineOffset: '3px',
                  },
                }}
              >
                {isSubmitting
                  ? 'Signing in...'
                  : 'Login to Dashboard'}
              </Button>

            </Stack>

          </Box>


          {/* =================================================
              SECURITY FOOTER
          ================================================= */}

          <Box
            sx={{
              width: '100%',

              display: 'flex',

              justifyContent: 'center',

              alignItems: 'center',

              textAlign: 'center',

              pt: 0.25,
            }}
          >

            <Stack
              direction="row"

              alignItems="center"

              justifyContent="center"

              spacing={0.6}
            >

              <FiLock
                size={12}
                color="#94A3B8"
                aria-hidden="true"
              />

              <Typography
                component="span"
                sx={{
                  color: '#94A3B8',

                  fontSize: '0.72rem',

                  lineHeight: 1.5,

                  fontWeight: 500,

                  whiteSpace: 'nowrap',
                }}
              >
                Authorized administrators only.
              </Typography>

            </Stack>

          </Box>

        </Stack>

      </AdminSurface>

    </Box>
  )
}

export default AdminLogin