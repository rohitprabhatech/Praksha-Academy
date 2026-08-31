import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import NameStatusForm from '../../../components/admin/academic/NameStatusForm'

import {
  getSubjectById,
  updateSubject,
} from '../../../services/subjectService'

const EditSubject = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [subject, setSubject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadSubject = async () => {
      try {
        setLoading(true)
        setError('')
        setNotFound(false)

        const data = await getSubjectById(id)

        if (!data) {
          setNotFound(true)
          return
        }

        setSubject(data)
      } catch (err) {
        console.error(err)
        setError(
          err.message ||
            'Unable to load subject. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadSubject()
  }, [id])

  const handleSubmit = async (data) => {
    try {
      setSaving(true)
      setError('')

      await updateSubject(id, data)

      navigate('/admin/subjects')
    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          'Unable to update subject. Please try again.'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => {
    navigate('/admin/subjects')
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
        title="Edit Subject"
        subtitle="Update the academic subject details."
        breadcrumbs={[
          {
            label: 'Admin',
            to: '/admin/dashboard',
          },
          {
            label: 'Subjects',
            to: '/admin/subjects',
          },
          {
            label: 'Edit',
          },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={16} />}
            onClick={handleBack}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '9px',
              px: 2.5,
              py: 1,
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
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* Loading */}
        {loading && (
          <Box
            sx={{
              minHeight: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}

        {/* Not Found */}
        {!loading && notFound && (
          <Box
            sx={{
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1E293B',
              }}
            >
              Subject not found
            </Box>

            <Box
              sx={{
                fontSize: '0.875rem',
                color: '#64748B',
                mb: 1,
              }}
            >
              The subject you're trying to edit does not exist.
            </Box>

            <Button
              variant="contained"
              onClick={handleBack}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '9px',
                bgcolor: '#2563EB',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                  boxShadow: 'none',
                },
              }}
            >
              Back to Subjects
            </Button>
          </Box>
        )}

        {/* Load Error */}
        {!loading && !notFound && error && !subject && (
          <Box
            sx={{
              minHeight: 220,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#DC2626',
              }}
            >
              Unable to load subject
            </Box>

            <Box
              sx={{
                fontSize: '0.875rem',
                color: '#64748B',
                mb: 1,
              }}
            >
              {error}
            </Box>

            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '9px',
              }}
            >
              Back to Subjects
            </Button>
          </Box>
        )}

        {/* Form */}
        {!loading && !notFound && subject && (
          <NameStatusForm
            initialData={subject}
            onSubmit={handleSubmit}
            onCancel={handleBack}
            onChange={() => setError('')}
            loading={saving}
            error={error}
            submitLabel="Update Subject"
          />
        )}
      </AdminSurface>
    </Box>
  )
}

export default EditSubject