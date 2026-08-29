import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import {
  deleteQuiz,
  getQuizzes,
} from '../../../services/assessmentService'

const QuizList = () => {
  const navigate = useNavigate()

  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const loadQuizzes = async () => {
    try {
      setLoading(true)
      setError('')

      const result = await getQuizzes()
      setQuizzes(result)
    } catch (err) {
      setError(err.message || 'Failed to load quizzes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuizzes()
  }, [])

  const courses = useMemo(() => {
    const uniqueCourses = quizzes.reduce((acc, quiz) => {
      if (
        quiz.courseId &&
        !acc.some((course) => course.id === quiz.courseId)
      ) {
        acc.push({
          id: quiz.courseId,
          name: quiz.courseName || 'Unknown Course',
        })
      }

      return acc
    }, [])

    return uniqueCourses
  }, [quizzes])

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const courseMatch =
        courseFilter === 'all' || quiz.courseId === courseFilter

      const statusMatch =
        statusFilter === 'all' ||
        quiz.status?.toLowerCase() === statusFilter.toLowerCase()

      return courseMatch && statusMatch
    })
  }, [quizzes, courseFilter, statusFilter])

  const handleDelete = async (quiz) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${quiz.title}"?`
    )

    if (!confirmed) return

    try {
      await deleteQuiz(quiz.id)
      setQuizzes((current) =>
        current.filter((item) => item.id !== quiz.id)
      )
    } catch (err) {
      setError(err.message || 'Failed to delete quiz.')
    }
  }

  const columns = [
    {
      id: 'title',
      label: 'Quiz',
      minWidth: 240,
      render: (value, row) => (
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#1E293B',
              mb: 0.25,
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.75rem',
              color: '#94A3B8',
            }}
          >
            {row.questionCount || 0} question
            {row.questionCount === 1 ? '' : 's'}
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
      minWidth: 110,
      render: (value) => (value ? `${value} min` : '—'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value) => (
        <Chip
          label={value || 'Draft'}
          size="small"
          sx={{
            fontWeight: 600,
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
      minWidth: 180,
      render: (_, row) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FiFileText size={15} />}
            onClick={() =>
              navigate(`/admin/quizzes/${row.id}/questions`)
            }
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Questions
          </Button>

          <Button
            size="small"
            variant="outlined"
            startIcon={<FiEye size={15} />}
            onClick={() =>
              navigate(`/admin/quizzes/${row.id}/results`)
            }
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Results
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(row)}
            sx={{
              minWidth: 36,
              width: 36,
              height: 36,
              borderRadius: 1.5,
              p: 0,
            }}
            aria-label={`Delete ${row.title}`}
          >
            <FiTrash2 size={16} />
          </Button>
        </Stack>
      ),
    },
  ]

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
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
        title="Quizzes"
        subtitle="Create and manage quizzes for your courses."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Quizzes' },
        ]}
        action={
          <Button
            component={RouterLink}
            to="/admin/quizzes/create"
            variant="contained"
            startIcon={<FiPlus />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 2.5,
            }}
          >
            Create Quiz
          </Button>
        }
      />

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={loadQuizzes}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        <FormControl size="small" sx={{ minWidth: { sm: 210 } }}>
          <InputLabel>Course</InputLabel>

          <Select
            value={courseFilter}
            label="Course"
            onChange={(event) =>
              setCourseFilter(event.target.value)
            }
          >
            <MenuItem value="all">All Courses</MenuItem>

            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: { sm: 160 } }}>
          <InputLabel>Status</InputLabel>

          <Select
            value={statusFilter}
            label="Status"
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <DataTable
        columns={columns}
        rows={filteredQuizzes}
        searchKey="title"
        emptyText="No quizzes found."
      />
    </Box>
  )
}

export default QuizList