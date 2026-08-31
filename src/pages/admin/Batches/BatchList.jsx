import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  FiEdit2,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminSurface from '../../../components/admin/common/AdminSurface'
import DataTable from '../../../components/admin/common/DataTable'

import {
  getBatches,
  deleteBatch,
} from '../../../services/batchService'

import { getClasses } from '../../../services/classService'

const BatchList = () => {
  const navigate = useNavigate()

  const [batches, setBatches] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [batchData, classData] = await Promise.all([
        getBatches(),
        getClasses(),
      ])

      setBatches(batchData)
      setClasses(classData)
    } catch (err) {
      console.error(err)
      setError(
        err.message ||
          'Unable to load batches. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getClassName = (classId) => {
    const academicClass = classes.find(
      (item) => item.id === classId
    )

    return academicClass?.name || 'Unknown Class'
  }

  const handleDelete = async (batch) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${batch.name}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')

      await deleteBatch(batch.id)

      setBatches((previous) =>
        previous.filter((item) => item.id !== batch.id)
      )
    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          'Unable to delete batch. Please try again.'
      )
    }
  }

  const columns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 220,
    },
    {
      id: 'class',
      label: 'Class',
      minWidth: 180,
      render: (_, row) => (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#334155',
          }}
        >
          {getClassName(row.classId)}
        </Typography>
      ),
    },
    {
      id: 'course',
      label: 'Course',
      minWidth: 180,
      render: () => (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            color: '#94A3B8',
          }}
        >
          —
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          sx={{
            height: 26,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            bgcolor:
              value === 'Active'
                ? 'rgba(22, 163, 74, 0.10)'
                : 'rgba(100, 116, 139, 0.10)',
            color:
              value === 'Active'
                ? '#16A34A'
                : '#64748B',
          }}
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 120,
      align: 'right',
      render: (_, row) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 0.5,
          }}
        >
          <Tooltip title="Edit batch">
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/admin/batches/${row.id}/edit`)
              }
              sx={{
                color: '#2563EB',
                '&:hover': {
                  bgcolor: 'rgba(37, 99, 235, 0.08)',
                },
              }}
            >
              <FiEdit2 size={16} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete batch">
            <IconButton
              size="small"
              onClick={() => handleDelete(row)}
              sx={{
                color: '#DC2626',
                '&:hover': {
                  bgcolor: 'rgba(220, 38, 38, 0.08)',
                },
              }}
            >
              <FiTrash2 size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1400,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Batches"
        subtitle="Manage academic batches and class groups."
        breadcrumbs={[
          {
            label: 'Admin',
            to: '/admin/dashboard',
          },
          {
            label: 'Batches',
          },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus size={17} />}
            onClick={() => navigate('/admin/batches/add')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '9px',
              px: 2.5,
              py: 1,
              bgcolor: '#2563EB',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Add Batch
          </Button>
        }
      />

      <AdminSurface
        sx={{
          overflow: 'hidden',
        }}
      >
        {/* Error */}
        {error && (
          <Box
            sx={{
              mx: 2.5,
              mt: 2,
              p: 1.5,
              borderRadius: '9px',
              bgcolor: '#FEF2F2',
              border: '1px solid #FECACA',
            }}
          >
            <Typography
              sx={{
                color: '#B91C1C',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* Loading */}
        {loading ? (
          <Box
            sx={{
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#64748B',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              Loading batches...
            </Typography>
          </Box>
        ) : batches.length === 0 ? (
          /* Empty */
          <Box
            sx={{
              minHeight: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: '#1E293B',
                fontSize: '1rem',
                mb: 0.5,
              }}
            >
              No batches yet
            </Typography>

            <Typography
              sx={{
                color: '#64748B',
                fontSize: '0.875rem',
                mb: 2,
              }}
            >
              Create your first academic batch.
            </Typography>

            <Button
              variant="contained"
              startIcon={<FiPlus size={16} />}
              onClick={() =>
                navigate('/admin/batches/add')
              }
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
              Add Batch
            </Button>
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={batches}
            searchKey="name"
            emptyText="No batches found."
          />
        )}
      </AdminSurface>
    </Box>
  )
}

export default BatchList