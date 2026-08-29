import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiEye,
  FiFileText,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import {
  deleteExam,
  getExams,
} from '../../../services/assessmentService'
import { getCourses } from '../../../services/courseService'

const ExamList = () => {
  const navigate = useNavigate()

  const [exams, setExams] = useState([])
  const [courses, setCourses] = useState([])
  const [courseFilter, setCourseFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadExams = async () => {
    try {
      setLoading(true)
      setError('')

      const [examData, courseData] = await Promise.all([
        getExams(),
        getCourses(),
      ])

      setExams(examData)
      setCourses(courseData)
    } catch (err) {
      setError(err.message || 'Failed to load exams.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExams()
  }, [])

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const courseMatch =
        !courseFilter || exam.courseId === courseFilter

      const statusMatch =
        !statusFilter || exam.status === statusFilter

      return courseMatch && statusMatch
    })
  }, [exams, courseFilter, statusFilter])

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    )

    if (!confirmed) return

    try {
      await deleteExam(id)
      await loadExams()
    } catch (err) {
      setError(err.message || 'Failed to delete exam.')
    }
  }

  const columns = [
    {
      id: 'title',
      label: 'Exam',
      minWidth: 240,
      render: (value, row) => (
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              fontSize: '0.875rem',
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: '#94A3B8',
              fontSize: '0.75rem',
              mt: 0.35,
            }}
          >
            {row.questionCount || 0} question
            {row.questionCount !== 1 ? 's' : ''}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'courseName',
      label: 'Course',
      minWidth: 190,
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 130,
      render: (value) => value || '—',
    },
    {
      id: 'duration',
      label: 'Duration',
      minWidth: 120,
      render: (value) => (value ? `${value} min` : '—'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            bgcolor:
              value === 'Published'
                ? '#ECFDF5'
                : '#FFF7ED',
            color:
              value === 'Published'
                ? '#059669'
                : '#EA580C',
          }}
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 230,
      render: (_, row) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FiFileText size={14} />}
            onClick={() =>
              navigate(`/admin/exams/${row.id}/questions`)
            }
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              minWidth: 105,
            }}
          >
            Questions
          </Button>

          <Button
            size="small"
            variant="outlined"
            startIcon={<FiEye size={14} />}
            onClick={() =>
              navigate(`/admin/exams/${row.id}/results`)
            }
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              minWidth: 85,
            }}
          >
            Results
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() =>
              handleDelete(row.id, row.title)
            }
            sx={{
              minWidth: 36,
              borderRadius: '10px',
            }}
          >
            <FiTrash2 size={16} />
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1250,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Exams"
        subtitle="Create and manage exams for your courses."
        breadcrumbs={[
          { label: 'Admin', to: '/admin' },
          { label: 'Exams' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={() => navigate('/admin/exams/create')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              px: 2.5,
              py: 1.2,
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            }}
          >
            Create Exam
          </Button>
        }
      />

      {error && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: '#FEF2F2',
            color: '#DC2626',
          }}
        >
          {error}
        </Box>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Course</InputLabel>
          <Select
            value={courseFilter}
            label="Course"
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <MenuItem value="">All Courses</MenuItem>

            {courses.map((course) => (
              <MenuItem
                key={course.id}
                value={course.id}
              >
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Published">
              Published
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Box
          sx={{
            p: 6,
            textAlign: 'center',
            color: '#64748B',
          }}
        >
          Loading exams...
        </Box>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredExams}
          searchKey="title"
          emptyText="No exams found."
        />
      )}
    </Box>
  )
}

export default ExamList