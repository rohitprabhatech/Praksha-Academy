import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiSave,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import {
  createExam,
} from '../../../services/assessmentService'
import { getCourses } from '../../../services/courseService'

const CreateExam = () => {
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({
    title: '',
    courseId: '',
    date: '',
    duration: '',
    status: 'Draft',
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadCourses()
  }, [])

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Title is required.'
    }

    if (!form.courseId) {
      nextErrors.courseId = 'Course is required.'
    }

    if (!form.status) {
      nextErrors.status = 'Status is required.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      setSaving(true)

      const exam = await createExam(form)

      navigate(
        `/admin/exams/${exam.id}/questions`
      )
    } catch (error) {
      setErrors({
        submit:
          error.message || 'Failed to create exam.',
      })
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
        title="Create Exam"
        subtitle="Create an exam for a course."
        breadcrumbs={[
          { label: 'Admin', to: '/admin' },
          { label: 'Exams', to: '/admin/exams' },
          { label: 'Create Exam' },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={() =>
              navigate('/admin/exams')
            }
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
            }}
          >
            Back
          </Button>
        }
      />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '18px',
          p: { xs: 2, md: 4 },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#1E293B',
          }}
        >
          Exam Information
        </Typography>

        <Typography
          sx={{
            color: '#64748B',
            fontSize: '0.875rem',
            mt: 0.5,
            mb: 3,
          }}
        >
          Enter the basic details for this exam.
        </Typography>

        {errors.submit && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: '#FEF2F2',
              color: '#DC2626',
            }}
          >
            {errors.submit}
          </Box>
        )}

        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Exam Title *"
            value={form.title}
            onChange={(e) =>
              updateField('title', e.target.value)
            }
            error={Boolean(errors.title)}
            helperText={errors.title}
          />

          <FormControl
            fullWidth
            error={Boolean(errors.courseId)}
          >
            <InputLabel>Course *</InputLabel>

            <Select
              value={form.courseId}
              label="Course *"
              onChange={(e) =>
                updateField(
                  'courseId',
                  e.target.value
                )
              }
            >
              <MenuItem value="">
                Select Course
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
                  mt: 0.5,
                  ml: 1.5,
                }}
              >
                {errors.courseId}
              </Typography>
            )}
          </FormControl>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) =>
                updateField(
                  'date',
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              label="Duration"
              type="number"
              value={form.duration}
              onChange={(e) =>
                updateField(
                  'duration',
                  e.target.value
                )
              }
              helperText="Duration in minutes"
              inputProps={{
                min: 1,
              }}
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Status *</InputLabel>

            <Select
              value={form.status}
              label="Status *"
              onChange={(e) =>
                updateField(
                  'status',
                  e.target.value
                )
              }
            >
              <MenuItem value="Draft">
                Draft
              </MenuItem>

              <MenuItem value="Published">
                Published
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Box
          sx={{
            mt: 4,
            pt: 2.5,
            borderTop: '1px solid #E2E8F0',
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
          >
            <Button
              variant="outlined"
              onClick={() =>
                navigate('/admin/exams')
              }
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '10px',
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<FiSave />}
              disabled={saving}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '10px',
              }}
            >
              {saving ? 'Creating...' : 'Create Exam'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateExam