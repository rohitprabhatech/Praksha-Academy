import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'
import {
  createFAQ,
  getFAQById,
  updateFAQ,
} from '../../../services/faqService'

const CATEGORIES = [
  'Enrollment',
  'Payments',
  'Classes',
  'Certificates',
  'Materials',
  'Courses',
  'General',
]

const STATUS_OPTIONS = ['Active', 'Inactive']

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

const AddFAQ = ({ editMode = false }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = editMode || Boolean(id)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [loadError, setLoadError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: '',
      answer: '',
      category: '',
      status: 'Active',
    },
  })

  // =========================================================
  // LOAD FAQ FOR EDIT
  // =========================================================

  useEffect(() => {
    if (!isEdit || !id) {
      setLoading(false)
      return
    }

    const loadFAQ = async () => {
      try {
        setLoading(true)
        setLoadError('')

        const faq = await getFAQById(id)

        if (!faq) {
          throw new Error('FAQ not found.')
        }

        reset({
          question: faq.question || '',
          answer: faq.answer || '',
          category: faq.category || '',
          status: faq.status || 'Active',
        })
      } catch (error) {
        console.error('Failed to load FAQ:', error)

        setLoadError(
          error.message || 'Unable to load FAQ.'
        )

        toast.error(
          error.message || 'Unable to load FAQ.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadFAQ()
  }, [id, isEdit, reset])

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = async (data) => {
    try {
      setSaving(true)

      const payload = {
        question: data.question.trim(),
        answer: data.answer.trim(),
        category: data.category,
        status: data.status,
      }

      if (isEdit) {
        await updateFAQ(id, payload)
        toast.success('FAQ updated successfully.')
      } else {
        await createFAQ(payload)
        toast.success('FAQ added successfully.')
      }

      navigate('/admin/faq')
    } catch (error) {
      console.error(
        isEdit
          ? 'Failed to update FAQ:'
          : 'Failed to create FAQ:',
        error
      )

      toast.error(
        error.message ||
          (isEdit
            ? 'Unable to update FAQ.'
            : 'Unable to add FAQ.')
      )
    } finally {
      setSaving(false)
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <Box>
        <PageHeader
          title="Edit FAQ"
          subtitle="Update an existing FAQ."
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'FAQ', to: '/admin/faq' },
            { label: 'Edit FAQ' },
          ]}
        />

        <Box
          sx={{
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            minHeight: 350,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            spacing={1.5}
            alignItems="center"
          >
            <CircularProgress
              size={32}
              sx={{ color: '#2563EB' }}
            />

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: '#64748B',
              }}
            >
              Loading FAQ...
            </Typography>
          </Stack>
        </Box>
      </Box>
    )
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (loadError) {
    return (
      <Box>
        <PageHeader
          title="Edit FAQ"
          subtitle="Update an existing FAQ."
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'FAQ', to: '/admin/faq' },
            { label: 'Edit FAQ' },
          ]}
        />

        <Box
          sx={{
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#1E293B',
                mb: 1,
              }}
            >
              Unable to load FAQ
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: '#64748B',
                mb: 2,
              }}
            >
              {loadError}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => navigate('/admin/faq')}
              sx={{
                borderRadius: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
              }}
            >
              Back to FAQ
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <PageHeader
        title={isEdit ? 'Edit FAQ' : 'Add FAQ'}
        subtitle={
          isEdit
            ? 'Update an existing frequently asked question.'
            : 'Add a new frequently asked question.'
        }
        breadcrumbs={[
          { label: 'Admin' },
          {
            label: 'FAQ',
            to: '/admin/faq',
          },
          {
            label: isEdit ? 'Edit FAQ' : 'Add FAQ',
          },
        ]}
      />

      {/* Same centered layout as Add Image */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack spacing={3}>

            {/* =================================================
                FAQ DETAILS
            ================================================= */}

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  mb: 2.5,
                }}
              >
                FAQ Details
              </Typography>

              <Stack spacing={2.5}>

                {/* Question */}

                <TextField
                  label="Question *"
                  fullWidth
                  {...register('question', {
                    required: 'Question is required',
                    minLength: {
                      value: 5,
                      message:
                        'Question must be at least 5 characters.',
                    },
                  })}
                  error={!!errors.question}
                  helperText={errors.question?.message}
                  disabled={saving}
                  sx={fieldSx}
                />

                {/* Answer */}

                <TextField
                  label="Answer *"
                  fullWidth
                  multiline
                  rows={6}
                  {...register('answer', {
                    required: 'Answer is required',
                    minLength: {
                      value: 10,
                      message:
                        'Answer must be at least 10 characters.',
                    },
                  })}
                  error={!!errors.answer}
                  helperText={errors.answer?.message}
                  disabled={saving}
                  sx={fieldSx}
                />

                {/* Category + Status */}

                <div className="row g-3">

                  <div className="col-12 col-md-6">
                    <Controller
                      name="category"
                      control={control}
                      rules={{
                        required: 'Category is required',
                      }}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.category}
                          disabled={saving}
                          sx={fieldSx}
                        >
                          <InputLabel>
                            Category *
                          </InputLabel>

                          <Select
                            {...field}
                            label="Category *"
                            input={
                              <OutlinedInput label="Category *" />
                            }
                          >
                            {CATEGORIES.map((category) => (
                              <MenuItem
                                key={category}
                                value={category}
                              >
                                {category}
                              </MenuItem>
                            ))}
                          </Select>

                          {errors.category && (
                            <Typography
                              sx={{
                                mt: 0.5,
                                ml: 1.5,
                                fontFamily:
                                  'Inter, sans-serif',
                                fontSize: '0.75rem',
                                color: '#d32f2f',
                              }}
                            >
                              {errors.category.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          disabled={saving}
                          sx={fieldSx}
                        >
                          <InputLabel>
                            Status
                          </InputLabel>

                          <Select
                            {...field}
                            label="Status"
                            input={
                              <OutlinedInput label="Status" />
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
                  </div>

                </div>
              </Stack>
            </Box>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="flex-end"
            >
              <Button
                type="button"
                variant="outlined"
                disabled={saving}
                onClick={() =>
                  navigate('/admin/faq')
                }
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  textTransform: 'none',

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
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress
                      size={15}
                      sx={{ color: '#FFFFFF' }}
                    />
                  ) : (
                    <FiSave size={15} />
                  )
                }
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  bgcolor: '#2563EB',
                  boxShadow: 'none',
                  textTransform: 'none',

                  '&:hover': {
                    bgcolor: '#1D4ED8',
                    boxShadow: 'none',
                  },

                  '&.Mui-disabled': {
                    bgcolor: '#93C5FD',
                    color: '#FFFFFF',
                  },
                }}
              >
                {saving
                  ? isEdit
                    ? 'Updating...'
                    : 'Saving...'
                  : isEdit
                    ? 'Update FAQ'
                    : 'Save FAQ'}
              </Button>
            </Stack>

          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default AddFAQ