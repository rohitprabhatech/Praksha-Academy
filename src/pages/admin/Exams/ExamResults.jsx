import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import {
  FiArrowLeft,
  FiAward,
  FiSearch,
  FiUsers,
} from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import {
  getExamById,
  getExamResults,
} from '../../../services/assessmentService'

const ExamResults = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [exam, setExam] = useState(null)
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const [examData, resultData] =
          await Promise.all([
            getExamById(id),
            getExamResults(id),
          ])

        setExam(examData)
        setResults(resultData)
      } catch (err) {
        setError(
          err.message || 'Failed to load exam results.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const filteredResults = useMemo(() => {
    if (!search.trim()) return results

    return results.filter((result) =>
      result.student
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [results, search])

  const gradedCount = results.filter(
    (result) =>
      typeof result.score === 'number'
  ).length

  const columns = [
    {
      id: 'student',
      label: 'Student',
      minWidth: 240,
    },
    {
      id: 'score',
      label: 'Score',
      minWidth: 150,
      render: (value, row) =>
        `${value ?? '—'} / ${row.total ?? 100}`,
    },
    {
      id: 'percentage',
      label: 'Percentage',
      minWidth: 150,
      render: (_, row) => {
        if (
          typeof row.score !== 'number' ||
          !row.total
        ) {
          return '—'
        }

        return `${Math.round(
          (row.score / row.total) * 100
        )}%`
      },
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 140,
      render: (_, row) => {
        if (
          typeof row.score !== 'number' ||
          !row.total
        ) {
          return (
            <Chip
              label="Pending"
              size="small"
              sx={{
                bgcolor: '#FFF7ED',
                color: '#EA580C',
                fontWeight: 700,
              }}
            />
          )
        }

        const percentage =
          (row.score / row.total) * 100

        return (
          <Chip
            label={percentage >= 40 ? 'Passed' : 'Failed'}
            size="small"
            sx={{
              bgcolor:
                percentage >= 40
                  ? '#ECFDF5'
                  : '#FEF2F2',
              color:
                percentage >= 40
                  ? '#059669'
                  : '#DC2626',
              fontWeight: 700,
            }}
          />
        )
      },
    },
  ]

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading results...</Typography>
      </Box>
    )
  }

  if (!exam) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          {error || 'Exam not found.'}
        </Typography>
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
        title="Exam Results"
        subtitle={`${exam.title} · ${exam.courseName}`}
        breadcrumbs={[
          { label: 'Admin', to: '/admin' },
          { label: 'Exams', to: '/admin/exams' },
          { label: exam.title },
          { label: 'Results' },
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
            Back to Exams
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
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        <Box
          sx={{
            flex: 1,
            p: 2.5,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                bgcolor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiUsers color="#2563EB" />
            </Box>

            <Box>
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.8125rem',
                }}
              >
                Total Results
              </Typography>

              <Typography
                sx={{
                  color: '#1E293B',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                {results.length}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2.5,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                bgcolor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiAward color="#059669" />
            </Box>

            <Box>
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.8125rem',
                }}
              >
                Graded
              </Typography>

              <Typography
                sx={{
                  color: '#1E293B',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                {gradedCount}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Box
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            size="small"
            placeholder="Search by student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: {
                xs: '100%',
                sm: 280,
              },
            }}
          />
        </Box>

        <DataTable
          columns={columns}
          rows={filteredResults}
          searchKey="student"
          emptyText="No exam results found."
        />
      </Box>
    </Box>
  )
}

export default ExamResults