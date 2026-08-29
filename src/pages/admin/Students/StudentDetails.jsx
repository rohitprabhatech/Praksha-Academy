import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiBookOpen,
  FiCalendar,
  FiEdit2,
  FiMail,
  FiPhone,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'

import { getStudentById } from '../../../services/studentService'

const StudentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getStudentById(id)

        if (!data) {
          setError('Student not found.')
          return
        }

        setStudent(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load student details.')
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [id])

  if (loading) {
    return (
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography sx={{ color: '#64748B' }}>
          Loading student details...
        </Typography>
      </Box>
    )
  }

  if (!student) {
    return (
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <PageHeader
          title="Student Details"
          subtitle="Unable to find this student."
        />

        <AdminSurface>
          <Typography
            sx={{
              color: '#DC2626',
              mb: 2,
            }}
          >
            {error || 'Student not found.'}
          </Typography>

          <Button
            startIcon={<FiArrowLeft />}
            onClick={() => navigate('/admin/students')}
            sx={{ textTransform: 'none' }}
          >
            Back to Students
          </Button>
        </AdminSurface>
      </Box>
    )
  }

  const progress = Math.min(
    100,
    Math.max(0, Number(student.progress) || 0)
  )
  const enrolledCount =
    student.enrolledCount ??
    student.enrolledCourses?.length ??
    0
  const joinedDate = student.createdAt
    ? new Date(student.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Not available'

  const statusColor =
    student.status === 'Active'
      ? {
          bg: '#DCFCE7',
          color: '#15803D',
          border: '#BBF7D0',
        }
      : {
          bg: '#F1F5F9',
          color: '#64748B',
          border: '#E2E8F0',
        }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1220,
        mx: 'auto',
      }}
    >
      <PageHeader
        title={student.fullName}
        subtitle="Student profile and learning progress."
        action={
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              startIcon={<FiArrowLeft />}
              onClick={() => navigate('/admin/students')}
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                px: 2.5,
                py: 1.1,
                fontWeight: 700,
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

            <Button
              startIcon={<FiEdit2 />}
              onClick={() =>
                navigate(`/admin/students/${student.id}/edit`)
              }
              variant="contained"
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                px: 2.5,
                py: 1.1,
                fontWeight: 700,
                bgcolor: '#2563EB',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                  boxShadow: 'none',
                },
              }}
            >
              Edit Student
            </Button>
          </Stack>
        }
      />

      <Box sx={{ mt: 3 }}>
        <AdminSurface
          sx={{
            p: { xs: 2.25, md: 3 },
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              height: 86,
              bgcolor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              zIndex: 0,
            }}
          />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2.5}
            alignItems={{ sm: 'center' }}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#EFF6FF',
                color: '#2563EB',
                border: '4px solid #FFFFFF',
                boxShadow: '0 10px 24px rgba(37, 99, 235, 0.16)',
                flexShrink: 0,
              }}
            >
              <FiUser size={32} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: '#1E293B',
                  lineHeight: 1.15,
                }}
              >
                {student.fullName}
              </Typography>

              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.9rem',
                  mt: 0.5,
                }}
              >
                Student ID: {student.id}
              </Typography>
            </Box>

            <Chip
              label={student.status}
              sx={{
                fontWeight: 700,
                bgcolor: statusColor.bg,
                color: statusColor.color,
                border: `1px solid ${statusColor.border}`,
                px: 0.75,
                alignSelf: { xs: 'flex-start', sm: 'center' },
              }}
            />
          </Stack>
        </AdminSurface>
      </Box>

      <Grid container spacing={2.5} sx={{ mt: 0 }}>
        <Grid item xs={12} lg={7}>
          <AdminSurface sx={{ p: { xs: 2.25, md: 3 }, height: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              mb: 0.5,
            }}
          >
            Contact Information
          </Typography>

          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.875rem',
              mb: 2.5,
            }}
          >
            Primary contact details for account updates.
          </Typography>

          <Divider sx={{ mb: 2.5 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#EFF6FF',
                    color: '#2563EB',
                    flexShrink: 0,
                  }}
                >
                  <FiMail size={19} />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#94A3B8',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Email
                  </Typography>

                  <Typography
                    sx={{
                      color: '#334155',
                      fontWeight: 700,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {student.email}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#F0FDF4',
                    color: '#16A34A',
                    flexShrink: 0,
                  }}
                >
                  <FiPhone size={19} />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#94A3B8',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Phone
                  </Typography>

                  <Typography
                    sx={{
                      color: '#334155',
                      fontWeight: 700,
                    }}
                  >
                    {student.phone || 'Not provided'}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          </AdminSurface>
        </Grid>

        <Grid item xs={12} lg={5}>
          <AdminSurface sx={{ p: { xs: 2.25, md: 3 }, height: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#1E293B',
                mb: 2.5,
              }}
            >
              Quick Stats
            </Typography>

            <Stack spacing={2}>
              {[
                {
                  icon: <FiBookOpen size={20} />,
                  label: 'Enrolled courses',
                  value: enrolledCount,
                  color: '#2563EB',
                  bg: '#EFF6FF',
                },
                {
                  icon: <FiTrendingUp size={20} />,
                  label: 'Overall progress',
                  value: `${progress}%`,
                  color: '#7C3AED',
                  bg: '#F5F3FF',
                },
                {
                  icon: <FiCalendar size={20} />,
                  label: 'Joined on',
                  value: joinedDate,
                  color: '#EA580C',
                  bg: '#FFF7ED',
                },
              ].map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: item.bg,
                      color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: '#94A3B8',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        color: '#1E293B',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </AdminSurface>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <AdminSurface sx={{ p: { xs: 2.25, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              mb: 0.5,
            }}
          >
            Enrolled Courses
          </Typography>

          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.875rem',
              mb: 2.5,
            }}
          >
            Courses currently assigned to this student.
          </Typography>

          <Divider sx={{ mb: 2.5 }} />

          {student.enrolledCourses?.length > 0 ? (
            <Grid container spacing={1.5}>
              {student.enrolledCourses.map((course) => (
                <Grid item xs={12} md={6} key={course.id}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{
                      p: 1.75,
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      bgcolor: '#F8FAFC',
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#FFFFFF',
                        color: '#2563EB',
                        border: '1px solid #DBEAFE',
                      }}
                    >
                      <FiBookOpen size={18} />
                    </Box>

                    <Typography sx={{ color: '#1E293B', fontWeight: 700 }}>
                      {course.title}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems={{ sm: 'center' }}
              sx={{
                p: 2.5,
                borderRadius: '8px',
                bgcolor: '#F8FAFC',
                border: '1px dashed #CBD5E1',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#FFFFFF',
                  color: '#94A3B8',
                  flexShrink: 0,
                }}
              >
                <FiBookOpen size={22} />
              </Box>

              <Box>
                <Typography sx={{ color: '#334155', fontWeight: 700 }}>
                  No courses enrolled yet
                </Typography>

                <Typography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '0.875rem',
                    mt: 0.25,
                  }}
                >
                  Course assignments will appear here once added.
                </Typography>
              </Box>
            </Stack>
          )}
        </AdminSurface>
      </Box>

      <Box sx={{ mt: 3 }}>
        <AdminSurface sx={{ p: { xs: 2.25, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              mb: 0.5,
            }}
          >
            Learning Progress
          </Typography>

          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.875rem',
              mb: 2.5,
            }}
          >
            Completion across current learning activity.
          </Typography>

          <Divider sx={{ mb: 2.5 }} />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ sm: 'flex-end' }}
            justifyContent="space-between"
            sx={{ mb: 1.5 }}
          >
            <Box>
              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Overall progress
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  mt: 0.25,
                  lineHeight: 1,
                }}
              >
                {progress}%
              </Typography>
            </Box>

            <Chip
              label={progress >= 70 ? 'On track' : 'Needs attention'}
              sx={{
                fontWeight: 700,
                bgcolor: progress >= 70 ? '#DCFCE7' : '#FEF3C7',
                color: progress >= 70 ? '#15803D' : '#B45309',
                alignSelf: { xs: 'flex-start', sm: 'auto' },
              }}
            />
          </Stack>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 10,
              bgcolor: '#E2E8F0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 10,
                bgcolor: '#2563EB',
              },
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 1.25 }}
          >
            <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
              0%
            </Typography>

            <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
              100%
            </Typography>
          </Stack>
        </AdminSurface>
      </Box>
    </Box>
  )
}

export default StudentDetails
