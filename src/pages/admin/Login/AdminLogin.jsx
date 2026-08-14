import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from 'react-icons/fi'
import { useState } from 'react'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { adminIdentity } from '../../../constants/adminDashboard'
import logoMark from '../../../assets/praksha-mark.png'

function AdminLogin() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Temporary frontend authentication.
    // Replace this with API authentication when backend auth is connected.
    navigate('/admin/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 1.5, sm: 2, md: 3 },
        py: 4,
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
          maxWidth: 450,
          p: { xs: 2.5, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          {/* Brand */}
          <Stack
            spacing={1.5}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 2.5,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 10px 28px rgba(15, 23, 42, 0.10)',
              }}
            >
              <Box
                component="img"
                src={logoMark}
                alt="Praksha Academy"
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: 'contain',
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '1.55rem', sm: '1.8rem' },
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}
              >
                Admin Login
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 0.75,
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}
              >
                Sign in to manage Praksha Academy operations.
              </Typography>
            </Box>
          </Stack>

          {/* Security badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              py: 0.8,
              px: 1.5,
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(37, 99, 235, 0.12)'
                  : 'rgba(37, 99, 235, 0.06)',
              color: 'primary.main',
            }}
          >
            <FiShield size={15} />
            <Typography
              sx={{
                fontSize: '0.76rem',
                fontWeight: 800,
              }}
            >
              Secure administrator access
            </Typography>
          </Box>

          {/* Login form */}
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Administrator Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={adminIdentity.email}
              fullWidth
              required
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiMail size={18} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                },
                '& .MuiInputBase-input': {
                  fontWeight: 500,
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              fullWidth
              required
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiLock size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={showPassword ? 'Hide password' : 'Show password'}
                      arrow
                    >
                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowPassword((value) => !value)
                        }
                        edge="end"
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                },
                '& .MuiInputBase-input': {
                  fontWeight: 500,
                },
              }}
            />

            {/* Remember / forgot */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                    }}
                  >
                    Remember me
                  </Typography>
                }
              />

              <Typography
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  color: 'primary.main',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Typography>
            </Stack>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<FiArrowRight size={18} />}
              sx={{
                minHeight: 50,
                borderRadius: 1.5,
                fontWeight: 800,
                textTransform: 'none',
                fontSize: '0.95rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Login to Dashboard
            </Button>
          </Stack>

          {/* Footer */}
          <Box
            sx={{
              pt: 0.5,
              textAlign: 'center',
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                fontSize: '0.75rem',
                lineHeight: 1.5,
              }}
            >
              Authorized administrators only.
            </Typography>
          </Box>
        </Stack>
      </AdminSurface>
    </Box>
  )
}

export default AdminLogin
