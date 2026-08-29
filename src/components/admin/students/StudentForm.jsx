import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { FiSave, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  status: 'Active',
}

const StudentForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
  error = '',
}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setValues({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        status: initialData.status || 'Active',
      })
    } else {
      setValues(initialValues)
    }
  }, [initialData])

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const validate = () => {
    const nextErrors = {}

    const fullName = values.fullName.trim()
    const email = values.email.trim()
    const phone = values.phone.trim()

    if (!fullName) {
      nextErrors.fullName = 'Full name is required.'
    } else if (fullName.length < 2) {
      nextErrors.fullName = 'Full name must be at least 2 characters.'
    }

    if (!email) {
      nextErrors.email = 'Email is required.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      nextErrors.phone = 'Phone number must contain exactly 10 digits.'
    }

    if (!['Active', 'Inactive'].includes(values.status)) {
      nextErrors.status = 'Select a valid status.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    await onSubmit({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      status: values.status,
    })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Stack spacing={3}>
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: 2.5,
          }}
        >
          <TextField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            required
            fullWidth
            disabled={loading}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName || 'Minimum 2 characters'}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FFFFFF',
              },
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
            fullWidth
            disabled={loading}
            error={Boolean(errors.email)}
            helperText={errors.email || 'Enter student email address'}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FFFFFF',
              },
            }}
          />

          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            fullWidth
            disabled={loading}
            inputProps={{
              maxLength: 10,
              inputMode: 'numeric',
            }}
            error={Boolean(errors.phone)}
            helperText={errors.phone || 'Optional - 10 digits'}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FFFFFF',
              },
            }}
          />

          <FormControl
            fullWidth
            required
            disabled={loading}
            error={Boolean(errors.status)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#FFFFFF',
              },
            }}
          >
            <InputLabel>Status</InputLabel>

            <Select
              name="status"
              value={values.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Inactive">
                Inactive
              </MenuItem>
            </Select>

            <FormHelperText>
              {errors.status || 'Student account status'}
            </FormHelperText>
          </FormControl>
        </Box>

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          spacing={1.5}
          justifyContent="flex-end"
          sx={{
            pt: 1,
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <Button
            type="button"
            variant="outlined"
            startIcon={<FiX />}
            onClick={onCancel}
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1.05,
              fontWeight: 700,
              borderColor: '#E2E8F0',
              color: '#64748B',
              '&:hover': {
                borderColor: '#CBD5E1',
                bgcolor: '#F8FAFC',
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress
                  size={17}
                  color="inherit"
                />
              ) : (
                <FiSave />
              )
            }
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1.05,
              fontWeight: 700,
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            {loading ? 'Saving...' : 'Save Student'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default StudentForm
