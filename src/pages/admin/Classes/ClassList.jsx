import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  FiEdit2,
  FiEye,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import DataTable from '../../../components/admin/common/DataTable'
import PageHeader from '../../../components/admin/common/PageHeader'
import AdminModal from '../../../components/admin/common/AdminModal'

import {
  deleteClass,
  getClasses,
  updateClassStatus,
} from '../../../services/classService'

const ClassList = () => {
  const navigate = useNavigate()

  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [statusTarget, setStatusTarget] = useState(null)
  const [statusLoading, setStatusLoading] = useState(false)

  const [toast, setToast] = useState('')

  const loadClasses = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getClasses()
      setClasses(data)
    } catch (err) {
      console.error(err)
      setError('Unable to load classes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClasses()
  }, [])

  useEffect(() => {
    if (!toast) return undefined

    const timer = setTimeout(() => {
      setToast('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast])

  const filteredClasses = useMemo(() => {
    if (statusFilter === 'All') {
      return classes
    }

    return classes.filter(
      (item) => item.status === statusFilter
    )
  }, [classes, statusFilter])

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      setDeleteLoading(true)

      await deleteClass(deleteTarget.id)

      setClasses((previous) =>
        previous.filter(
          (item) => item.id !== deleteTarget.id
        )
      )

      setDeleteTarget(null)
      setToast('Class deleted successfully.')
    } catch (err) {
      console.error(err)
      setToast(
        err.message || 'Unable to delete class.'
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleStatusChange = async () => {
    if (!statusTarget) return

    const nextStatus =
      statusTarget.status === 'Active'
        ? 'Inactive'
        : 'Active'

    try {
      setStatusLoading(true)

      const updated = await updateClassStatus(
        statusTarget.id,
        nextStatus
      )

      setClasses((previous) =>
        previous.map((item) =>
          item.id === updated.id ? updated : item
        )
      )

      setStatusTarget(null)

      setToast(
        `Class ${nextStatus.toLowerCase()} successfully.`
      )
    } catch (err) {
      console.error(err)
      setToast(
        err.message ||
          'Unable to update class status.'
      )
    } finally {
      setStatusLoading(false)
    }
  }

  const columns = [
    {
      id: 'name',
      label: 'NAME',
      minWidth: 220,
      render: (value) => (
        <Typography
          sx={{
            fontWeight: 700,
            color: '#1E293B',
            fontSize: '0.9rem',
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'STATUS',
      minWidth: 130,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            borderRadius: '7px',
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
      label: 'ACTIONS',
      align: 'right',
      minWidth: 150,
      render: (_, row) => (
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="flex-end"
        >
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() =>
                navigate(
                  `/admin/classes/${row.id}/edit`
                )
              }
              sx={{
                color: '#2563EB',
              }}
            >
              <FiEdit2 size={17} />
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
              onClick={() =>
                setStatusTarget(row)
              }
              sx={{
                color:
                  row.status === 'Active'
                    ? '#F59E0B'
                    : '#16A34A',
              }}
            >
              <FiEye size={17} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() =>
                setDeleteTarget(row)
              }
              sx={{
                color: '#DC2626',
              }}
            >
              <FiTrash2 size={17} />
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
        maxWidth: 1200,
        mx: 'auto',
        width: '100%',
      }}
    >
      <PageHeader
        title="Classes"
        subtitle={`${classes.length} classes`}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={() =>
              navigate('/admin/classes/add')
            }
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '9px',
              px: 2.5,
              py: 1.1,
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Add Class
          </Button>
        }
      />

      <Box sx={{ mt: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{
            xs: 'stretch',
            sm: 'center',
          }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography
            sx={{
              color: '#64748B',
              fontSize: '0.9rem',
            }}
          >
            Manage academic classes and streams.
          </Typography>

          <Select
            size="small"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            sx={{
              minWidth: 150,
              bgcolor: '#FFFFFF',
              borderRadius: '8px',
            }}
          >
            <MenuItem value="All">
              All Status
            </MenuItem>
            <MenuItem value="Active">
              Active
            </MenuItem>
            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </Select>
        </Stack>

        <DataTable
          columns={columns}
          rows={filteredClasses}
          searchKey="name"
          emptyText="No classes yet"
        />
      </Box>

      {toast && (
        <Box
          sx={{
            position: 'fixed',
            right: { xs: 16, sm: 24 },
            bottom: { xs: 16, sm: 24 },
            zIndex: 1400,
            bgcolor: '#166534',
            color: '#FFFFFF',
            px: 2.5,
            py: 1.5,
            borderRadius: '10px',
            boxShadow:
              '0 10px 30px rgba(15,23,42,0.18)',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          {toast}
        </Box>
      )}

      <AdminModal
        open={Boolean(deleteTarget)}
        onClose={() => {
          if (!deleteLoading) {
            setDeleteTarget(null)
          }
        }}
        onConfirm={handleDelete}
        title="Delete Class"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleteLoading}
      />

      <AdminModal
        open={Boolean(statusTarget)}
        onClose={() => {
          if (!statusLoading) {
            setStatusTarget(null)
          }
        }}
        onConfirm={handleStatusChange}
        title={
          statusTarget?.status === 'Active'
            ? 'Deactivate Class'
            : 'Activate Class'
        }
        message={
          statusTarget
            ? `Are you sure you want to ${
                statusTarget.status === 'Active'
                  ? 'deactivate'
                  : 'activate'
              } "${statusTarget.name}"?`
            : ''
        }
        confirmLabel={
          statusTarget?.status === 'Active'
            ? 'Deactivate'
            : 'Activate'
        }
        cancelLabel="Cancel"
        variant="warning"
        loading={statusLoading}
      />
    </Box>
  )
}

export default ClassList