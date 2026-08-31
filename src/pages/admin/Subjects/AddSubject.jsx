import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import NameStatusForm from '../../../components/admin/academic/NameStatusForm'

import { createSubject } from '../../../services/subjectService'

const AddSubject = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      setError('')

      await createSubject(data)

      navigate('/admin/subjects')
    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          'Unable to create subject. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleErrorClear = () => {
    setError('')
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
        title="Add Subject"
        subtitle="Create a new academic subject."
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
            label: 'Add',
          },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={16} />}
            onClick={() => navigate('/admin/subjects')}
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
        <NameStatusForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/subjects')}
          onChange={handleErrorClear}
          loading={loading}
          error={error}
          submitLabel="Save Subject"
        />
      </AdminSurface>
    </Box>
  )
}

export default AddSubject