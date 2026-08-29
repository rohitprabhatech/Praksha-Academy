import { useEffect, useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
} from '@mui/material'
import { FiArrowLeft, FiArchive } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import NameStatusForm from '../../../components/admin/academic/NameStatusForm'

import {
  getClassById,
  updateClass,
} from '../../../services/classService'

const EditClass = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [classData, setClassData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadClass = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getClassById(id)

        if (!data) {
          setClassData(null)
          setError('Class not found.')
          return
        }

        setClassData(data)
      } catch (err) {
        console.error(err)
        setClassData(null)
        setError('Unable to load class.')
      } finally {
        setLoading(false)
      }
    }

    loadClass()
  }, [id])

  const handleSubmit = async (data) => {
    try {
      setSaving(true)
      setError('')

      await updateClass(id, data)

      navigate('/admin/classes')
    } catch (err) {
      console.error(err)

      setError(
        err?.message ||
          'Unable to update class. Please try again.'
      )
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
        }}
      >
        <PageHeader
          title="Edit Class"
          subtitle="Loading class information..."
        />

        <AdminSurface sx={{ mt: 3, p: 4 }}>
          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.9rem',
            }}
          >
            Loading class...
          </Typography>
        </AdminSurface>
      </Box>
    )
  }

  if (!classData) {
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
          title="Edit Class"
          subtitle="The requested class could not be found."
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

        <AdminSurface
          sx={{
            mt: 3,
            p: { xs: 3, sm: 5 },
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              mx: 'auto',
              borderRadius: '12px',
              bgcolor: '#FEF2F2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiArchive size={24} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: 700,
              color: '#1E293B',
            }}
          >
            Class not found
          </Typography>

          <Typography
            sx={{
              mt: 0.75,
              color: '#64748B',
              fontSize: '0.9rem',
            }}
          >
            {error ||
              'The class you are trying to edit does not exist.'}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate('/admin/classes')}
            sx={{
              mt: 3,
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '9px',
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Back to Classes
          </Button>
        </AdminSurface>
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
      }}
    >
      <PageHeader
        title="Edit Class"
        subtitle={`Update ${classData.name}'s information.`}
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
                Update the class name and status.
              </Typography>
            </Box>
          </Stack>

          <NameStatusForm
            initialData={classData}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/classes')}
            loading={saving}
            error={error}
            submitLabel="Save Changes"
          />
        </AdminSurface>
      </Box>
    </Box>
  )
}

export default EditClass