import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Typography,
  Rating,
  CircularProgress,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { FiUploadCloud, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'

import {
  createTestimonial,
  updateTestimonial,
} from '../../../services/testimonialService'

const STATUS_OPTIONS = ['Published', 'Draft']

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',

    '& fieldset': {
      borderColor: '#E2E8F0',
    },

    '&:hover fieldset': {
      borderColor: '#CBD5E1',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
      borderWidth: 1.5,
    },
  },

  '& .MuiInputLabel-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
  },
}

const AddTestimonial = ({
  prefill = null,
  editMode = false,
}) => {
  const navigate = useNavigate()

  const [avatar, setAvatar] = useState(
    prefill?.avatar ?? null
  )

  const [rating, setRating] = useState(
    prefill?.rating ?? 5
  )

  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      prefill ?? {
        name: '',
        role: '',
        course: '',
        content: '',
        status: 'Published',
      },
  })

  // =========================================================
  // AVATAR
  // =========================================================

  const handleAvatar = (e) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Avatar image must be smaller than 5 MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setAvatar(reader.result)
    }

    reader.onerror = () => {
      toast.error('Unable to read the selected image.')
    }

    reader.readAsDataURL(file)
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = async (data) => {
    try {
      setSaving(true)

      const payload = {
        ...data,
        rating,
        avatar,
      }

      if (editMode && prefill?.id) {
        await updateTestimonial(
          prefill.id,
          payload
        )

        toast.success(
          'Testimonial updated successfully.'
        )
      } else {
        await createTestimonial(payload)

        toast.success(
          'Testimonial added successfully.'
        )
      }

      navigate('/admin/testimonials')
    } catch (error) {
      console.error(
        'Failed to save testimonial:',
        error
      )

      toast.error(
        error.message ||
          'Unable to save testimonial.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <PageHeader
        title={
          editMode
            ? 'Edit Testimonial'
            : 'Add Testimonial'
        }
        subtitle={
          editMode
            ? 'Update the testimonial details below.'
            : 'Add a new student testimonial.'
        }
        breadcrumbs={[
          { label: 'Admin' },
          {
            label: 'Testimonials',
            to: '/admin/testimonials',
          },
          {
            label: editMode ? 'Edit' : 'Add',
          },
        ]}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
          pb: 4,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack spacing={3}>

            {/* =================================================
                REVIEWER INFORMATION
            ================================================= */}

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  mb: 2.5,
                }}
              >
                Reviewer Information
              </Typography>

              <Stack spacing={2.5}>

                {/* Avatar + Name + Role */}

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  alignItems={{
                    xs: 'stretch',
                    sm: 'center',
                  }}
                  spacing={2.5}
                >
                  <Box
                    component="label"
                    htmlFor="avatar-upload"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: '#F1F5F9',
                      border:
                        '2px dashed #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      flexShrink: 0,
                      transition:
                        'border-color 0.2s',

                      '&:hover': {
                        borderColor: '#2563EB',
                      },
                    }}
                  >
                    {avatar ? (
                      <Box
                        component="img"
                        src={avatar}
                        alt="Reviewer avatar preview"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Stack
                        alignItems="center"
                        spacing={0.5}
                      >
                        <FiUploadCloud
                          size={20}
                          color="#94A3B8"
                        />

                        <Typography
                          sx={{
                            fontFamily:
                              'Inter, sans-serif',
                            fontSize: '0.6rem',
                            color: '#94A3B8',
                            textAlign: 'center',
                          }}
                        >
                          Photo
                        </Typography>
                      </Stack>
                    )}

                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleAvatar}
                    />
                  </Box>

                  <Stack
                    spacing={2}
                    sx={{
                      flex: 1,
                      width: '100%',
                    }}
                  >
                    <TextField
                      label="Full Name *"
                      fullWidth
                      {...register('name', {
                        required:
                          'Name is required',
                      })}
                      error={!!errors.name}
                      helperText={
                        errors.name?.message
                      }
                      sx={fieldSx}
                    />

                    <TextField
                      label="Role / Job Title"
                      fullWidth
                      {...register('role')}
                      sx={fieldSx}
                    />
                  </Stack>
                </Stack>

                {/* Course */}

                <TextField
                  label="Course Name *"
                  fullWidth
                  {...register('course', {
                    required:
                      'Course is required',
                  })}
                  error={!!errors.course}
                  helperText={
                    errors.course?.message
                  }
                  sx={fieldSx}
                />

                {/* Rating */}

                <Box>
                  <Typography
                    sx={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: '0.875rem',
                      color: '#64748B',
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    Rating *
                  </Typography>

                  <Rating
                    value={rating}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setRating(newValue)
                      }
                    }}
                    size="large"
                    sx={{
                      color: '#F59E0B',

                      '& .MuiRating-iconEmpty': {
                        color: '#E2E8F0',
                      },
                    }}
                  />
                </Box>

                {/* Review */}

                <TextField
                  label="Review Content *"
                  fullWidth
                  multiline
                  rows={5}
                  {...register('content', {
                    required:
                      'Content is required',
                  })}
                  error={!!errors.content}
                  helperText={
                    errors.content?.message
                  }
                  sx={fieldSx}
                />

                {/* Status */}

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      sx={fieldSx}
                    >
                      <InputLabel>
                        Status
                      </InputLabel>

                      <Select
                        {...field}
                        label="Status"
                        input={
                          <OutlinedInput
                            label="Status"
                          />
                        }
                      >
                        {STATUS_OPTIONS.map(
                          (status) => (
                            <MenuItem
                              key={status}
                              value={status}
                            >
                              {status}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
            </Box>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                disabled={saving}
                onClick={() =>
                  navigate(
                    '/admin/testimonials'
                  )
                }
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  px: 3,
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress
                      size={15}
                      color="inherit"
                    />
                  ) : (
                    <FiSave size={15} />
                  )
                }
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  bgcolor: '#2563EB',
                  boxShadow: 'none',
                  px: 3,

                  '&:hover': {
                    bgcolor: '#1D4ED8',
                    boxShadow: 'none',
                  },
                }}
              >
                {saving
                  ? 'Saving...'
                  : editMode
                    ? 'Update Testimonial'
                    : 'Save Testimonial'}
              </Button>
            </Stack>

          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default AddTestimonial