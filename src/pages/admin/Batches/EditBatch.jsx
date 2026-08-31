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
  Typography,
} from '@mui/material'
import { FiArchive, FiArrowLeft } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'

import {
  getBatchById,
  updateBatch,
} from '../../../services/batchService'

import { getClasses } from '../../../services/classService'

const EditBatch = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [name, setName] = useState('')
  const [classId, setClassId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [status, setStatus] = useState('Active')

  const [classes, setClasses] = useState([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')

        const [batch, classData] = await Promise.all([
          getBatchById(id),
          getClasses(),
        ])

        if (!batch) {
          setError('Batch not found.')
          return
        }

        setName(batch.name || '')
        setClassId(batch.classId || '')
        setCourseId(batch.courseId || '')
        setStatus(batch.status || 'Active')

        setClasses(classData || [])
      } catch (err) {
        console.error(err)

        setError(
          err.message ||
            'Unable to load batch. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const validate = () => {
    const nextErrors = {}

    if (!name.trim()) {
      nextErrors.name = 'Batch name is required.'
    } else if (name.trim().length < 2) {
      nextErrors.name =
        'Batch name must be at least 2 characters.'
    }

    if (!classId) {
      nextErrors.classId = 'Class is required.'
    }

    if (!status) {
      nextErrors.status = 'Status is required.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    try {
      setSaving(true)
      setError('')

      await updateBatch(id, {
        name: name.trim(),
        classId,
        courseId: courseId || '',
        status,
      })

      navigate('/admin/batches')
    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          'Unable to update batch. Please try again.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Edit Batch"
        subtitle="Update the academic batch details."
        breadcrumbs={[
          {
            label: 'Admin',
            to: '/admin/dashboard',
          },
          {
            label: 'Batches',
            to: '/admin/batches',
          },
          {
            label: 'Edit',
          },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={16} />}
            onClick={() => navigate('/admin/batches')}
            disabled={saving}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '9px',
              px: 2.5,
              py: 1,
              borderColor: '#E2E8F0',
              color: '#64748B',
              bgcolor: '#FFFFFF',
              '&:hover': {
                borderColor: '#CBD5E1',
                bgcolor: '#F8FAFC',
              },
            }}
          >
            Back
          </Button>
        }
      />

      <AdminSurface
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#64748B',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Loading batch...
            </Typography>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Stack spacing={2.5}>
              {error && (
                <Alert
                  severity="error"
                  onClose={() => setError('')}
                  sx={{
                    borderRadius: '10px',
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Section heading */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 0.5 }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: '10px',
                    bgcolor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                    flexShrink: 0,
                  }}
                >
                  <FiArchive size={22} />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      lineHeight: 1.3,
                    }}
                  >
                    Batch Information
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      color: '#64748B',
                      mt: 0.25,
                    }}
                  >
                    Update the batch name, class, course and status.
                  </Typography>
                </Box>
              </Stack>

              {/* Batch Name */}
              <TextField
                label="Batch Name"
                placeholder="e.g. Morning Batch"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)

                  if (errors.name) {
                    setErrors((previous) => ({
                      ...previous,
                      name: '',
                    }))
                  }

                  setError('')
                }}
                error={Boolean(errors.name)}
                helperText={
                  errors.name ||
                  'Enter a unique batch name.'
                }
                required
                fullWidth
                disabled={saving}
                autoComplete="off"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    fontFamily: 'Inter, sans-serif',
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
              />

              {/* Class */}
              <FormControl
                fullWidth
                required
                error={Boolean(errors.classId)}
                disabled={saving}
              >
                <InputLabel>Class</InputLabel>

                <Select
                  value={classId}
                  label="Class"
                  onChange={(event) => {
                    setClassId(event.target.value)

                    if (errors.classId) {
                      setErrors((previous) => ({
                        ...previous,
                        classId: '',
                      }))
                    }

                    setError('')
                  }}
                  sx={{
                    borderRadius: '10px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <MenuItem value="">
                    Select class
                  </MenuItem>

                  {classes.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>

                {errors.classId && (
                  <FormHelperText>
                    {errors.classId}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Course */}
              <FormControl
                fullWidth
                disabled
              >
                <InputLabel>Course</InputLabel>

                <Select
                  value={courseId}
                  label="Course"
                  sx={{
                    borderRadius: '10px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <MenuItem value="">
                    No course
                  </MenuItem>
                </Select>

                <FormHelperText>
                  Course selection will be available in Sprint 08.
                </FormHelperText>
              </FormControl>

              {/* Status */}
              <FormControl
                fullWidth
                required
                error={Boolean(errors.status)}
                disabled={saving}
              >
                <InputLabel>Status</InputLabel>

                <Select
                  value={status}
                  label="Status"
                  onChange={(event) => {
                    setStatus(event.target.value)

                    if (errors.status) {
                      setErrors((previous) => ({
                        ...previous,
                        status: '',
                      }))
                    }

                    setError('')
                  }}
                  sx={{
                    borderRadius: '10px',
                    fontFamily: 'Inter, sans-serif',
                  }}
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
                sx={{
                  pt: 1,
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() =>
                    navigate('/admin/batches')
                  }
                  disabled={saving}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '9px',
                    px: 2.5,
                    py: 1.25,
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
                  disabled={saving}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: '9px',
                    px: 2.75,
                    py: 1.25,
                    bgcolor: '#2563EB',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#1D4ED8',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {saving
                    ? 'Saving...'
                    : 'Update Batch'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </AdminSurface>
    </Box>
  )
}

export default EditBatch