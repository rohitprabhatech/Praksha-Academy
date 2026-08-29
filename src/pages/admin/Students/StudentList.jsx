import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  FiEdit2,
  FiEye,
  FiPauseCircle,
  FiPlayCircle,
  FiPlus,
  FiTrash2,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import AdminModal from '../../../components/admin/common/AdminModal'

import {
  deleteStudent,
  getStudents,
  toggleStudentStatus,
} from '../../../services/studentService'

const StudentList = () => {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [statusTarget, setStatusTarget] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Success toast
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const loadStudents = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getStudents()
      setStudents(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setError('Unable to load students. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const showToast = (message, severity = 'success') => {
    setToast({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseToast = (_, reason) => {
    if (reason === 'clickaway') return

    setToast((current) => ({
      ...current,
      open: false,
    }))
  }

  const filteredStudents = useMemo(() => {
    if (statusFilter === 'All') {
      return students
    }

    return students.filter(
      (student) => student.status === statusFilter
    )
  }, [students, statusFilter])

  const activeCount = students.filter(
    (student) => student.status === 'Active'
  ).length

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      setActionLoading(true)

      await deleteStudent(deleteTarget.id)

      setStudents((current) =>
        current.filter(
          (student) => student.id !== deleteTarget.id
        )
      )

      const deletedName = deleteTarget.fullName

      setDeleteTarget(null)

      showToast(
        `${deletedName} deleted successfully.`,
        'success'
      )
    } catch (err) {
      console.error(err)

      setError(
        'Unable to delete the student. Please try again.'
      )

      showToast(
        'Unable to delete student.',
        'error'
      )
    } finally {
      setActionLoading(false)
    }
  }

  const handleToggleStatus = async () => {
    if (!statusTarget) return

    try {
      setActionLoading(true)

      const previousStatus = statusTarget.status

      const updatedStudent = await toggleStudentStatus(
        statusTarget.id
      )

      setStudents((current) =>
        current.map((student) =>
          student.id === updatedStudent.id
            ? updatedStudent
            : student
        )
      )

      setStatusTarget(null)

      if (previousStatus === 'Active') {
        showToast(
          `${updatedStudent.fullName} deactivated successfully.`,
          'success'
        )
      } else {
        showToast(
          `${updatedStudent.fullName} activated successfully.`,
          'success'
        )
      }
    } catch (err) {
      console.error(err)

      setError(
        'Unable to update student status. Please try again.'
      )

      showToast(
        'Unable to update student status.',
        'error'
      )
    } finally {
      setActionLoading(false)
    }
  }

  const columns = [
    {
      id: 'fullName',
      label: 'Name',
      minWidth: 190,
      render: (value, row) => (
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#1E293B',
              fontSize: '0.875rem',
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              color: '#94A3B8',
              fontSize: '0.75rem',
              mt: 0.25,
            }}
          >
            Student ID: {row.id}
          </Typography>
        </Box>
      ),
    },

    {
      id: 'email',
      label: 'Email',
      minWidth: 220,
      render: (value) => (
        <Typography
          sx={{
            color: '#334155',
            fontSize: '0.875rem',
            overflowWrap: 'anywhere',
          }}
        >
          {value}
        </Typography>
      ),
    },

    {
      id: 'phone',
      label: 'Phone',
      minWidth: 130,
      render: (value) => value || '-',
    },

    {
      id: 'status',
      label: 'Status',
      minWidth: 110,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.72rem',
            borderRadius: '999px',
            px: 0.5,
            bgcolor:
              value === 'Active'
                ? '#DCFCE7'
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
      id: 'enrolledCount',
      label: 'Enrolled',
      minWidth: 100,
      align: 'center',
      render: (value) => value ?? 0,
    },

    {
      id: 'actions',
      label: 'Actions',
      minWidth: 170,
      align: 'right',
      render: (_, row) => (
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="flex-end"
        >
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/admin/students/${row.id}`)
              }
              sx={{
                color: '#2563EB',
                '&:hover': { bgcolor: '#EFF6FF' },
              }}
            >
              <FiEye size={17} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() =>
                navigate(
                  `/admin/students/${row.id}/edit`
                )
              }
              sx={{
                color: '#475569',
                '&:hover': {
                  color: '#2563EB',
                  bgcolor: '#EFF6FF',
                },
              }}
            >
              <FiEdit2 size={16} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              row.status === 'Active'
                ? 'Deactivate'
                : 'Activate'
            }
          >
            <IconButton
              size="small"
              onClick={() => setStatusTarget(row)}
              sx={{
                color:
                  row.status === 'Active'
                    ? '#D97706'
                    : '#16A34A',
                '&:hover': {
                  bgcolor:
                    row.status === 'Active'
                      ? '#FEF3C7'
                      : '#DCFCE7',
                },
              }}
            >
              {row.status === 'Active' ? (
                <FiPauseCircle size={17} />
              ) : (
                <FiPlayCircle size={17} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => setDeleteTarget(row)}
              sx={{
                color: '#DC2626',
                '&:hover': { bgcolor: '#FEF2F2' },
              }}
            >
              <FiTrash2 size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1280,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Students"
        subtitle={`${students.length} total | ${activeCount} active`}
        action={
          <Button
            variant="contained"
            startIcon={<FiUserPlus size={17} />}
            onClick={() => navigate('/admin/students/add')}
            sx={{
              bgcolor: '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              px: 2.75,
              py: 1.15,
              borderRadius: '8px',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Add Student
          </Button>
        }
      />

      {error && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: '#FEF2F2',
            border: '1px solid #FECACA',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
          >
            <Typography
              sx={{
                color: '#B91C1C',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </Typography>

            <Button
              size="small"
              variant="outlined"
              onClick={loadStudents}
              sx={{
                textTransform: 'none',
                alignSelf: {
                  xs: 'flex-start',
                  sm: 'auto',
                },
              }}
            >
              Retry
            </Button>
          </Stack>
        </Box>
      )}

      {loading ? (
        <Box
          sx={{
            p: 8,
            textAlign: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            bgcolor: '#FFFFFF',
          }}
        >
          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.9rem',
            }}
          >
            Loading students...
          </Typography>
        </Box>
      ) : students.length === 0 ? (
        <Box
          sx={{
            p: 8,
            textAlign: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            bgcolor: '#FFFFFF',
          }}
        >
          <FiUsers size={44} color="#CBD5E1" />

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: 700,
              color: '#334155',
            }}
          >
            No students yet
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: '#94A3B8',
              fontSize: '0.875rem',
            }}
          >
            Add your first student to get started.
          </Typography>

          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={() =>
              navigate('/admin/students/add')
            }
            sx={{
              mt: 3,
              textTransform: 'none',
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Add Student
          </Button>
        </Box>
      ) : filteredStudents.length === 0 ? (
        <Box
          sx={{
            p: 6,
            textAlign: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: 2,
            bgcolor: '#FFFFFF',
          }}
        >
          <Typography
            sx={{
              color: '#64748B',
              fontWeight: 600,
            }}
          >
            No students match this filter.
          </Typography>
        </Box>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredStudents.map((student) => ({
            ...student,
            searchText: `${student.fullName} ${student.email}`.toLowerCase(),
          }))}
          searchKey="searchText"
          searchPlaceholder="Search students..."
          emptyText="No students found."
          toolbarAction={
            <Select
              size="small"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              sx={{
                minWidth: 150,
                borderRadius: '8px',
                fontSize: '0.875rem',
                bgcolor: '#FFFFFF',
                '& .MuiSelect-select': {
                  py: 0.8,
                },
              }}
            >
              <MenuItem value="All">All Students</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          }
        />
      )}

      {/* Delete Confirmation */}
      <AdminModal
        open={Boolean(deleteTarget)}
        onClose={() =>
          !actionLoading && setDeleteTarget(null)
        }
        onConfirm={handleDelete}
        title="Delete Student"
        message={
          <>
            Are you sure you want to delete{' '}
            <strong>
              {deleteTarget?.fullName}
            </strong>
            ? This action cannot be undone.
          </>
        }
        confirmLabel="Delete Student"
        cancelLabel="Cancel"
        variant="danger"
        loading={actionLoading}
      />

      {/* Activate / Deactivate Confirmation */}
      <AdminModal
        open={Boolean(statusTarget)}
        onClose={() =>
          !actionLoading && setStatusTarget(null)
        }
        onConfirm={handleToggleStatus}
        title={
          statusTarget?.status === 'Active'
            ? 'Deactivate Student'
            : 'Activate Student'
        }
        message={
          <>
            Are you sure you want to{' '}
            {statusTarget?.status === 'Active'
              ? 'deactivate'
              : 'activate'}{' '}
            <strong>
              {statusTarget?.fullName}
            </strong>
            ?
          </>
        }
        confirmLabel={
          statusTarget?.status === 'Active'
            ? 'Deactivate'
            : 'Activate'
        }
        cancelLabel="Cancel"
        variant={
          statusTarget?.status === 'Active'
            ? 'warning'
            : 'info'
        }
        loading={actionLoading}
      />

      {/* Success / Error Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={handleCloseToast}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: '100%',
            fontWeight: 600,
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default StudentList
