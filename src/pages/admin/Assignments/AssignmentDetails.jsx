import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiCalendar,
  FiClipboard,
  FiFileText,
  FiUsers,
} from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import {
  getAssignmentById,
  getAssignmentSubmissions,
} from '../../../services/assessmentService'

const AssignmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [assignment, setAssignment] = useState(null)
  const [submissionCount, setSubmissionCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        setLoading(true)
        setError('')

        const [assignmentData, submissions] = await Promise.all([
          getAssignmentById(id),
          getAssignmentSubmissions(id),
        ])

        setAssignment(assignmentData)
        setSubmissionCount(submissions.length)
      } catch (err) {
        setError(err.message || 'Failed to load assignment.')
      } finally {
        setLoading(false)
      }
    }

    loadAssignment()
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
          title="Assignment Details"
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Assignments', to: '/admin/assignments' },
            { label: 'Details' },
          ]}
        />

        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    )
  }

  if (!assignment) {
    return null
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <PageHeader
        title={assignment.title}
        subtitle="View assignment details and manage submissions."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Assignments', to: '/admin/assignments' },
          { label: assignment.title },
        ]}
        action={
          <Button
            component={RouterLink}
            to={`/admin/assignments/${id}/submissions`}
            variant="contained"
            startIcon={<FiUsers />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              px: 2.5,
            }}
          >
            View Submissions
          </Button>
        }
      />

      <Stack spacing={3}>
        {/* Assignment summary */}
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #E2E8F0',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#1E293B',
                    mb: 0.75,
                  }}
                >
                  {assignment.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#64748B',
                    fontSize: '0.95rem',
                  }}
                >
                  {assignment.courseName}
                </Typography>
              </Box>

              <Chip
                label={assignment.status}
                sx={{
                  fontWeight: 600,
                  bgcolor:
                    assignment.status === 'Published'
                      ? '#ECFDF5'
                      : '#FFF7ED',
                  color:
                    assignment.status === 'Published'
                      ? '#059669'
                      : '#EA580C',
                }}
              />
            </Stack>
          </Box>

          <Divider />

          <Box
            sx={{
              p: { xs: 2.5, md: 3.5 },
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            <InfoItem
              icon={<FiClipboard />}
              label="Course"
              value={assignment.courseName}
            />

            <InfoItem
              icon={<FiCalendar />}
              label="Due Date"
              value={assignment.dueDate || 'No due date'}
            />

            <InfoItem
              icon={<FiUsers />}
              label="Submissions"
              value={`${submissionCount} submission${
                submissionCount === 1 ? '' : 's'
              }`}
            />
          </Box>
        </Paper>

        {/* Instructions */}
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #E2E8F0',
            borderRadius: 3,
          }}
        >
          <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FiFileText size={19} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#1E293B',
                }}
              >
                Instructions
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: '#475569',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}
            >
              {assignment.instructions || 'No instructions provided.'}
            </Typography>
          </Box>
        </Paper>

        {/* Actions */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={() => navigate('/admin/assignments')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Back to Assignments
          </Button>

          <Button
            variant="contained"
            startIcon={<FiUsers />}
            onClick={() =>
              navigate(`/admin/assignments/${id}/submissions`)
            }
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Manage Submissions
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <Box>
    <Stack direction="row" spacing={1} alignItems="center" mb={0.75}>
      <Box sx={{ color: '#64748B', display: 'flex' }}>
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#64748B',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </Typography>
    </Stack>

    <Typography
      sx={{
        fontWeight: 600,
        color: '#1E293B',
      }}
    >
      {value}
    </Typography>
  </Box>
)

export default AssignmentDetails