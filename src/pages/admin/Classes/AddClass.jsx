import { useState } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { FiArrowLeft, FiArchive } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import NameStatusForm from '../../../components/admin/academic/NameStatusForm'

import { createClass } from '../../../services/classService'

const AddClass = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (classData) => {
    try {
      setLoading(true)
      setError('')

      await createClass(classData)

      navigate('/admin/classes')
    } catch (err) {
      console.error(err)
      setError(
        err?.message ||
          'Unable to create class. Please try again.'
      )
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
        width: '100%',
      }}
    >
      <PageHeader
        title="Add Class"
        subtitle="Create a new academic class."
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={16} />}
            onClick={() => navigate('/admin/classes')}
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
            p: { xs: 2.25, sm: 3, md: 3.5 },
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
              <FiArchive size={21} />
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
                Class Information
              </Typography>

              <Typography
                sx={{
                  color: '#64748B',
                  fontSize: '0.875rem',
                  mt: 0.25,
                }}
              >
                Enter the academic class name and status.
              </Typography>
            </Box>
          </Stack>

          <NameStatusForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/classes')}
            loading={loading}
            error={error}
            submitLabel="Save Class"
          />
        </AdminSurface>
      </Box>
    </Box>
  )
}

export default AddClass