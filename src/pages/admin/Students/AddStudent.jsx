import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi'
import StudentForm from '../../../components/admin/students/StudentForm'
import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import { createStudent } from '../../../services/studentService'
import { useState } from 'react'

const AddStudent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (studentData) => {
    try {
      setLoading(true)
      setError('')

      await createStudent(studentData)

      navigate('/admin/students')
    } catch (err) {
      console.error(err)
      setError('Unable to create student. Please try again.')
    } finally {
      setLoading(false)
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
        title="Add Student"
        subtitle="Create a new student profile."
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
        <AdminSurface sx={{ p: { xs: 2.25, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
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
                Enter the basic account and contact details.
              </Typography>
            </Box>
          </Stack>

          <StudentForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/students')}
            loading={loading}
            error={error}
          />
        </AdminSurface>
      </Box>
    </Box>
  )
}

export default AddStudent
