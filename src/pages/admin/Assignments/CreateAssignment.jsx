import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import {
  createAssignment,
} from '../../../services/assessmentService'
import { getCourses } from '../../../services/courseService'

const CreateAssignment = () => {
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '',
    courseId: '',
    dueDate: '',
    instructions: '',
    attachment: null,
    status: 'Draft',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoadingCourses(true)
        const data = await getCourses()
        setCourses(data)
      } catch (err) {
        setError(err.message || 'Failed to load courses')
      } finally {
        setLoadingCourses(false)
      }
    }

    loadCourses()
  }, [])

  const handleChange = (field) => (event) => {
    const value =
      field === 'attachment'
        ? event.target.files?.[0] || null
        : event.target.value

    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: '',
    }))

    setError('')
    setSuccess('')
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Assignment title is required'
    }

    if (!form.courseId) {
      nextErrors.courseId = 'Course is required'
    }

    if (!form.status) {
      nextErrors.status = 'Status is required'
    }

    if (form.status === 'Published' && !form.dueDate) {
      nextErrors.dueDate =
        'Due date is required when publishing'
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
      setSuccess('')

      await createAssignment({
        ...form,
        title: form.title.trim(),
        instructions: form.instructions.trim(),
        attachment: form.attachment
          ? form.attachment.name
          : null,
      })

      setSuccess('Assignment created successfully.')

      setTimeout(() => {
        navigate('/admin/assignments')
      }, 700)
    } catch (err) {
      setError(
        err.message || 'Failed to create assignment'
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
        title="Create Assignment"
        subtitle="Create coursework for a course."
        breadcrumbs={[
          {
            label: 'Admin',
          },
          {
            label: 'Assignments',
            to: '/admin/assignments',
          },
          {
            label: 'Create Assignment',
          },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={16} />}
            onClick={() =>
              navigate('/admin/assignments')
            }
            sx={{
              textTransform: 'none',
              borderColor: '#CBD5E1',
              color: '#334155',
            }}
          >
            Back
          </Button>
        }
      />

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 3,
          p: { xs: 2, md: 3 },
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1E293B',
                mb: 0.5,
              }}
            >
              Assignment Information
            </Typography>

            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#64748B',
              }}
            >
              Enter the basic details for this assignment.
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Assignment Title"
            placeholder="Enter assignment title"
            value={form.title}
            onChange={handleChange('title')}
            error={Boolean(errors.title)}
            helperText={errors.title}
            required
          />

          <Select
            fullWidth
            displayEmpty
            value={form.courseId}
            onChange={handleChange('courseId')}
            error={Boolean(errors.courseId)}
            disabled={loadingCourses}
          >
            <MenuItem value="">
              {loadingCourses
                ? 'Loading courses...'
                : 'Select Course'}
            </MenuItem>

            {courses.map((course) => (
              <MenuItem
                key={course.id}
                value={course.id}
              >
                {course.name}
              </MenuItem>
            ))}
          </Select>

          {errors.courseId && (
            <Typography
              sx={{
                color: '#DC2626',
                fontSize: '0.75rem',
                mt: -2.5,
                ml: 1.5,
              }}
            >
              {errors.courseId}
            </Typography>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              value={form.dueDate}
              onChange={handleChange('dueDate')}
              error={Boolean(errors.dueDate)}
              helperText={
                errors.dueDate ||
                (form.status === 'Published'
                  ? 'Required for published assignments'
                  : 'Optional for drafts')
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Select
              fullWidth
              value={form.status}
              onChange={handleChange('status')}
              error={Boolean(errors.status)}
            >
              <MenuItem value="Draft">
                Draft
              </MenuItem>

              <MenuItem value="Published">
                Published
              </MenuItem>
            </Select>
          </Stack>

          <TextField
            fullWidth
            multiline
            minRows={5}
            label="Instructions"
            placeholder="Enter assignment instructions..."
            value={form.instructions}
            onChange={handleChange('instructions')}
          />

          <Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<FiUpload size={16} />}
              sx={{
                textTransform: 'none',
                borderColor: '#CBD5E1',
                color: '#334155',
              }}
            >
              Choose Attachment

              <input
                hidden
                type="file"
                onChange={handleChange('attachment')}
              />
            </Button>

            {form.attachment && (
              <Typography
                sx={{
                  mt: 1,
                  fontSize: '0.8rem',
                  color: '#64748B',
                  wordBreak: 'break-word',
                }}
              >
                Selected: {form.attachment.name}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              pt: 2,
              borderTop: '1px solid #E2E8F0',
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1.5}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  navigate('/admin/assignments')
                }
                disabled={saving}
                sx={{
                  textTransform: 'none',
                  borderColor: '#CBD5E1',
                  color: '#334155',
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={<FiSave size={16} />}
                disabled={saving || loadingCourses}
                sx={{
                  textTransform: 'none',
                  bgcolor: '#2563EB',
                  '&:hover': {
                    bgcolor: '#1D4ED8',
                  },
                }}
              >
                {saving
                  ? 'Creating...'
                  : 'Create Assignment'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default CreateAssignment