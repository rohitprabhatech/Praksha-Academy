import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  FiEdit2,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import DataTable from '../../../components/admin/common/DataTable'
import AdminModal from '../../../components/admin/common/AdminModal'

import {
  getSubjects,
  deleteSubject,
  updateSubjectStatus,
} from '../../../services/subjectService'

const SubjectList = () => {
  const navigate = useNavigate()

  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const loadSubjects = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getSubjects()
      setSubjects(data)
    } catch (err) {
      console.error(err)
      setError('Unable to load subjects. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject)
    setModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSubject) return

    try {
      setDeleting(true)

      await deleteSubject(selectedSubject.id)

      setSubjects((previous) =>
        previous.filter(
          (item) => item.id !== selectedSubject.id
        )
      )

      setModalOpen(false)
      setSelectedSubject(null)

      setSuccessMessage(
        'Subject deleted successfully.'
      )

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (err) {
      console.error(err)
      setError(
        err.message ||
        'Unable to delete subject. Please try again.'
      )
    } finally {
      setDeleting(false)
    }
  }

  const handleStatusToggle = async (subject) => {
    const newStatus =
      subject.status === 'Active'
        ? 'Inactive'
        : 'Active'

    try {
      setStatusUpdating(subject.id)

      const updated = await updateSubjectStatus(
        subject.id,
        newStatus
      )

      setSubjects((previous) =>
        previous.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      )

      setSuccessMessage(
        `Subject ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully.`
      )

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (err) {
      console.error(err)
      setError(
        err.message ||
        'Unable to update subject status.'
      )
    } finally {
      setStatusUpdating(null)
    }
  }

  const columns = [
    {
      id: 'name',
      label: 'Subject',
      minWidth: 260,
      render: (value) => (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              bgcolor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FiFileText size={18} />
          </Box>

          <Typography
            sx={{
              fontWeight: 600,
              color: '#1E293B',
              fontSize: '0.875rem',
            }}
          >
            {value}
          </Typography>
        </Stack>
      ),
    },

    {
      id: 'status',
      label: 'Status',
      minWidth: 130,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            bgcolor:
              value === 'Active'
                ? '#ECFDF3'
                : '#F1F5F9',
            color:
              value === 'Active'
                ? '#15803D'
                : '#64748B',
          }}
        />
      ),
    },

    {
      id: 'actions',
      label: 'Actions',
      minWidth: 220,
      align: 'right',
      render: (_, row) => (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FiEdit2 size={14} />}
            onClick={() =>
              navigate(
                `/admin/subjects/${row.id}/edit`
              )
            }
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              borderColor: '#E2E8F0',
              color: '#475569',
              '&:hover': {
                borderColor: '#CBD5E1',
                bgcolor: '#F8FAFC',
              },
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="outlined"
            startIcon={
              row.status === 'Active'
                ? <FiToggleLeft size={14} />
                : <FiToggleRight size={14} />
            }
            disabled={statusUpdating === row.id}
            onClick={() =>
              handleStatusToggle(row)
            }
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              borderColor: '#E2E8F0',
              color:
                row.status === 'Active'
                  ? '#64748B'
                  : '#2563EB',
              '&:hover': {
                bgcolor: '#F8FAFC',
                borderColor: '#CBD5E1',
              },
            }}
          >
            {row.status === 'Active'
              ? 'Inactive'
              : 'Active'}
          </Button>

          <Button
            size="small"
            variant="outlined"
            startIcon={<FiTrash2 size={14} />}
            onClick={() =>
              handleDeleteClick(row)
            }
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              borderColor: '#FECACA',
              color: '#DC2626',
              '&:hover': {
                bgcolor: '#FEF2F2',
                borderColor: '#FCA5A5',
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Subjects"
        subtitle="Manage all academic subjects."
        breadcrumbs={[
          { label: 'Admin', to: '/admin/dashboard' },
          { label: 'Subjects' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={() =>
              navigate('/admin/subjects/add')
            }
            sx={{
              bgcolor: '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '9px',
              px: 2.5,
              py: 1.1,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Add Subject
          </Button>
        }
      />

      {successMessage && (
        <Box
          sx={{
            mb: 2,
            px: 2,
            py: 1.25,
            borderRadius: '9px',
            bgcolor: '#ECFDF3',
            border: '1px solid #BBF7D0',
            color: '#15803D',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {successMessage}
        </Box>
      )}

      {error && (
        <Box
          sx={{
            mb: 2,
            px: 2,
            py: 1.25,
            borderRadius: '9px',
            bgcolor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {error}
        </Box>
      )}

      <AdminSurface sx={{ p: 0 }}>
        {loading ? (
          <Box
            sx={{
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#64748B',
                fontSize: '0.9rem',
              }}
            >
              Loading subjects...
            </Typography>
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={subjects}
            searchKey="name"
            emptyText="No subjects yet"
          />
        )}
      </AdminSurface>

      <AdminModal
        open={modalOpen}
        onClose={() => {
          if (!deleting) {
            setModalOpen(false)
            setSelectedSubject(null)
          }
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Subject"
        message={
          selectedSubject
            ? `Are you sure you want to delete "${selectedSubject.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this subject?'
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleting}
      />
    </Box>
  )
}

export default SubjectList