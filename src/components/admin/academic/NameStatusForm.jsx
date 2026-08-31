import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'

const EMPTY_INITIAL_DATA = {}

const NameStatusForm = ({
  initialData = EMPTY_INITIAL_DATA,
  onSubmit,
  onCancel,
  onChange,
  loading = false,
  error = '',
  submitLabel = 'Save',
}) => {
  const [name, setName] = useState(initialData.name || '')
  const [status, setStatus] = useState(initialData.status || 'Active')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setName(initialData.name || '')
    setStatus(initialData.status || 'Active')
    setErrors({})
  }, [initialData])

  const clearServerError = () => {
    if (onChange) {
      onChange()
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!name.trim()) {
      nextErrors.name = 'Name is required.'
    } else if (name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.'
    }

    if (!status) {
      nextErrors.status = 'Status is required.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit({
      name: name.trim(),
      status,
    })
  }

  const handleNameChange = (event) => {
    const value = event.target.value

    setName(value)

    if (errors.name) {
      setErrors((previous) => ({
        ...previous,
        name: '',
      }))
    }

    // Clear server/duplicate error immediately
    clearServerError()
  }

  const handleStatusChange = (event) => {
    const value = event.target.value

    setStatus(value)

    if (errors.status) {
      setErrors((previous) => ({
        ...previous,
        status: '',
      }))
    }

    // Clear server error immediately
    clearServerError()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Stack spacing={2.5}>

        {/* Server / duplicate error */}
        {error && (
          <Alert
            severity="error"
            onClose={clearServerError}
            sx={{
              borderRadius: '10px',
            }}
          >
            {error}
          </Alert>
        )}

        {/* Name */}
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={Boolean(errors.name)}
          helperText={
            errors.name || 'Enter a unique name.'
          }
          required
          fullWidth
          disabled={loading}
          autoComplete="off"
          autoFocus
        />

        {/* Status */}
        <FormControl
          fullWidth
          required
          error={Boolean(errors.status)}
          disabled={loading}
        >
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </Select>

          {errors.status && (
            <FormHelperText>
              {errors.status}
            </FormHelperText>
          )}
        </FormControl>

        {/* Buttons */}
        <Stack
          direction={{
            xs: 'column-reverse',
            sm: 'row',
          }}
          spacing={1.5}
          justifyContent="flex-end"
          sx={{ pt: 1 }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '9px',
              px: 2.5,
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
            disabled={loading}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '9px',
              px: 2.75,
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            {loading ? 'Saving...' : submitLabel}
          </Button>
        </Stack>

      </Stack>
    </Box>
  )
}

export default NameStatusForm