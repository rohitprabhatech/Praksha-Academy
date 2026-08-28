import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiUsers,
} from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import {
  getAssignmentById,
  getAssignmentSubmissions,
} from '../../../services/assessmentService'

const AssignmentSubmissions = () => {
  const { id } = useParams()

  const [assignment, setAssignment] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        setLoading(true)
        setError('')

        const [assignmentData, submissionData] = await Promise.all([
          getAssignmentById(id),
          getAssignmentSubmissions(id),
        ])

        setAssignment(assignmentData)
        setSubmissions(submissionData)
      } catch (err) {
        setError(err.message || 'Failed to load submissions.')
      } finally {
        setLoading(false)
      }
    }

    loadSubmissions()
  }, [id])

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

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <PageHeader
          title="Submissions"
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Assignments', to: '/admin/assignments' },
            { label: 'Submissions' },
          ]}
        />

        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <PageHeader
        title="Assignment Submissions"
        subtitle={
          assignment
            ? `${assignment.title} · ${assignment.courseName}`
            : 'View student submissions.'
        }
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Assignments', to: '/admin/assignments' },
          {
            label: assignment?.title || 'Assignment',
            to: `/admin/assignments/${id}`,
          },
          { label: 'Submissions' },
        ]}
        action={
          <Button
            component={RouterLink}
            to={`/admin/assignments/${id}`}
            variant="outlined"
            startIcon={<FiArrowLeft />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Back to Assignment
          </Button>
        }
      />

      {/* Summary */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(3, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <SummaryCard
          icon={<FiUsers />}
          label="Total Submissions"
          value={submissions.length}
        />

        <SummaryCard
          icon={<FiCheckCircle />}
          label="Submitted"
          value={
            submissions.filter(
              (item) => item.status === 'Submitted'
            ).length
          }
        />

        <SummaryCard
          icon={<FiClock />}
          label="Pending"
          value={
            submissions.filter(
              (item) => item.status === 'Pending'
            ).length
          }
        />
      </Box>

      {/* Empty state */}
      {submissions.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #E2E8F0',
            borderRadius: 3,
            p: { xs: 4, md: 7 },
            textAlign: 'center',
          }}
        >
          <FiUsers size={42} color="#94A3B8" />

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: 700,
              color: '#1E293B',
            }}
          >
            No submissions yet
          </Typography>

          <Typography
            sx={{
              mt: 0.75,
              color: '#64748B',
            }}
          >
            Students have not submitted this assignment yet.
          </Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: '1px solid #E2E8F0',
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              p: 2.5,
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: '#1E293B',
              }}
            >
              Student Submissions
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: '0.875rem',
                color: '#64748B',
              }}
            >
              Review submission status and scores.
            </Typography>
          </Box>

          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCell}>STUDENT</TableCell>
                <TableCell sx={headerCell}>DATE</TableCell>
                <TableCell sx={headerCell}>STATUS</TableCell>
                <TableCell sx={headerCell}>SCORE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id} hover>
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: '#1E293B',
                      }}
                    >
                      {submission.student}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ color: '#475569' }}>
                    {submission.date || '—'}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={submission.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          submission.status === 'Submitted'
                            ? '#ECFDF5'
                            : '#FFF7ED',
                        color:
                          submission.status === 'Submitted'
                            ? '#059669'
                            : '#EA580C',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {submission.score !== null &&
                    submission.score !== undefined
                      ? (
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: '#1E293B',
                          }}
                        >
                          {submission.score}
                        </Typography>
                      )
                      : (
                        <Typography sx={{ color: '#94A3B8' }}>
                          —
                        </Typography>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

const SummaryCard = ({ icon, label, value }) => (
  <Paper
    elevation={0}
    sx={{
      border: '1px solid #E2E8F0',
      borderRadius: 3,
      p: 2.5,
    }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: '#EFF6FF',
          color: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '#64748B',
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#1E293B',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  </Paper>
)

const headerCell = {
  fontWeight: 700,
  fontSize: '0.75rem',
  color: '#64748B',
  letterSpacing: '0.04em',
  bgcolor: '#F8FAFC',
}

export default AssignmentSubmissions