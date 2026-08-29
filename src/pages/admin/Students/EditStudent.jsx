import { Box, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiUserPlus, FiUserX } from 'react-icons/fi'

import StudentForm from '../../../components/admin/students/StudentForm'
import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'

import {
  getStudentById,
  updateStudent,
} from '../../../services/studentService'

const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
        setError('Unable to load student.')
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [id])

  const handleSubmit = async (studentData) => {
    try {
      setSaving(true)
      setError('')

      await updateStudent(id, studentData)

      navigate(`/admin/students/${id}`)
    } catch (err) {
      console.error(err)
      setError('Unable to update student. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: 'auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography sx={{ color: '#64748B' }}>
          Loading student...
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
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <PageHeader
          title="Edit Student"
          subtitle="Student could not be found."
          action={
            <Button
              variant="outlined"
              startIcon={<FiArrowLeft size={17} />}
              onClick={() => navigate('/admin/students')}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                px: 2.5,
                py: 1.05,
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
          }
        />

        <Box
          sx={{
            mt: 3,
            minHeight: 360,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            bgcolor: '#FFFFFF',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            px: 3,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 460,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                borderRadius: '50%',
                bgcolor: '#FEF2F2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiUserX size={30} />
            </Box>

            <Typography
              sx={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#1E293B',
                mb: 1,
              }}
            >
              Student not found
            </Typography>

            <Typography
              sx={{
                color: '#64748B',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              The student you are trying to edit does not exist
              or may have been removed.
            </Typography>

            <Button
              variant="contained"
              startIcon={<FiArrowLeft size={17} />}
              onClick={() => navigate('/admin/students')}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '8px',
                px: 2.75,
                py: 1.15,
                bgcolor: '#2563EB',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                  boxShadow: 'none',
                },
              }}
            >
              Back to Students
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <PageHeader
        title="Edit Student"
        subtitle={`Update ${student.fullName}'s profile.`}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={16} />}
            onClick={() => navigate('/admin/students')}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 2.5,
              py: 1.05,
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
        }
      />

      <Box sx={{ mt: 3 }}>
        <AdminSurface
          sx={{
            p: { xs: 2.25, md: 3 },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#EFF6FF',
                color: '#2563EB',
                flexShrink: 0,
              }}
            >
              <FiUserPlus size={21} />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#1E293B',
                  lineHeight: 1.2,
                }}
              >
                Student Information
              </Typography>

              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.875rem',
                  mt: 0.25,
                }}
              >
                Update the student's account and contact details.
              </Typography>
            </Box>
          </Stack>

          <StudentForm
            initialData={student}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/students')}
            loading={saving}
            error={error}
          />
        </AdminSurface>
      </Box>
    </Box>
  )
}

export default EditStudent