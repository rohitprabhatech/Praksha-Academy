import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  Chip,
  Avatar,
  Rating,
  CircularProgress,
} from '@mui/material'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import AdminModal from '../../../components/admin/common/AdminModal'
import EmptyState from '../../../components/admin/common/EmptyState'
import ErrorState from '../../../components/admin/common/ErrorState'

import {
  getTestimonials,
  deleteTestimonial,
} from '../../../services/testimonialService'

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const AVATAR_COLORS = [
  '#2563EB',
  '#7C3AED',
  '#16A34A',
  '#D97706',
  '#DC2626',
]

const TestimonialsList = () => {
  const navigate = useNavigate()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // =========================================================
  // LOAD TESTIMONIALS
  // =========================================================

  const loadTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getTestimonials()

      setRows(data)
    } catch (err) {
      console.error(
        'Failed to load testimonials:',
        err
      )

      setError(
        err.message ||
          'We could not load testimonials.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTestimonials()
  }, [loadTestimonials])

  // =========================================================
  // DELETE TESTIMONIAL
  // =========================================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    try {
      setDeleting(true)

      await deleteTestimonial(deleteTarget.id)

      setRows((previous) =>
        previous.filter(
          (item) =>
            String(item.id) !==
            String(deleteTarget.id)
        )
      )

      toast.success(
        'Testimonial deleted successfully.'
      )

      setDeleteTarget(null)
    } catch (err) {
      console.error(
        'Failed to delete testimonial:',
        err
      )

      toast.error(
        err.message ||
          'Unable to delete testimonial.'
      )
    } finally {
      setDeleting(false)
    }
  }

  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  const columns = [
    {
      id: 'name',
      label: 'Reviewer',
      minWidth: 180,

      render: (val, row) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor:
                AVATAR_COLORS[
                  Number(row.id) % 5
                ] || AVATAR_COLORS[0],
              fontSize: '0.8rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(val)}
          </Avatar>

          <Box>
            <Box
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#1E293B',
              }}
            >
              {val}
            </Box>

            <Box
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontSize: '0.75rem',
                color: '#94A3B8',
              }}
            >
              {row.role || 'Student'}
            </Box>
          </Box>
        </Stack>
      ),
    },

    {
      id: 'course',
      label: 'Course',
      minWidth: 160,
    },

    {
      id: 'rating',
      label: 'Rating',
      minWidth: 130,

      render: (val) => (
        <Rating
          value={Number(val) || 0}
          readOnly
          size="small"
          sx={{
            color: '#F59E0B',
            '& .MuiRating-iconEmpty': {
              color: '#E2E8F0',
            },
          }}
        />
      ),
    },

    {
      id: 'content',
      label: 'Review',
      minWidth: 220,

      render: (val) => (
        <Box
          sx={{
            fontFamily:
              'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: '#64748B',
            maxWidth: 280,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {val}
        </Box>
      ),
    },

    {
      id: 'status',
      label: 'Status',
      minWidth: 100,

      render: (val) => (
        <Chip
          label={val}
          size="small"
          sx={{
            bgcolor:
              val === 'Published'
                ? 'rgba(34,197,94,0.1)'
                : 'rgba(245,158,11,0.1)',

            color:
              val === 'Published'
                ? '#16A34A'
                : '#D97706',

            fontFamily:
              'Inter, sans-serif',

            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
          }}
        />
      ),
    },

    {
      id: 'actions',
      label: 'Actions',
      align: 'right',
      minWidth: 100,

      render: (_, row) => (
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="flex-end"
        >
          <Button
            size="small"
            variant="text"
            onClick={() =>
              navigate(
                `/admin/testimonials/${row.id}/edit`
              )
            }
            sx={{
              minWidth: 32,
              p: 0.75,
              color: '#64748B',
              borderRadius: '8px',

              '&:hover': {
                color: '#F59E0B',
                bgcolor:
                  'rgba(245,158,11,0.06)',
              },
            }}
          >
            <FiEdit2 size={15} />
          </Button>

          <Button
            size="small"
            variant="text"
            onClick={() =>
              setDeleteTarget(row)
            }
            sx={{
              minWidth: 32,
              p: 0.75,
              color: '#64748B',
              borderRadius: '8px',

              '&:hover': {
                color: '#EF4444',
                bgcolor:
                  'rgba(239,68,68,0.06)',
              },
            }}
          >
            <FiTrash2 size={15} />
          </Button>
        </Stack>
      ),
    },
  ]

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <Box>
      <PageHeader
        title="Testimonials"
        subtitle="Manage student reviews and testimonials displayed on the website."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Testimonials' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={
              <FiPlus size={16} />
            }
            onClick={() =>
              navigate(
                '/admin/testimonials/add'
              )
            }
            sx={{
              fontFamily:
                'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              bgcolor: '#2563EB',
              boxShadow: 'none',

              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            Add Testimonial
          </Button>
        }
      />

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <Box
          sx={{
            minHeight: 360,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            spacing={2}
            alignItems="center"
          >
            <CircularProgress
              size={32}
              thickness={4}
              sx={{
                color: '#2563EB',
              }}
            />

            <Box
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontSize: '0.875rem',
                color: '#64748B',
              }}
            >
              Loading testimonials...
            </Box>
          </Stack>
        </Box>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <ErrorState
          title="Unable to load testimonials"
          message={error}
          onRetry={loadTestimonials}
        />
      )}

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {!loading &&
        !error &&
        rows.length === 0 && (
          <EmptyState
            title="No testimonials found"
            description="There are no testimonials available yet. Add your first testimonial to get started."
            action={
              <Button
                variant="contained"
                startIcon={
                  <FiPlus size={15} />
                }
                onClick={() =>
                  navigate(
                    '/admin/testimonials/add'
                  )
                }
                sx={{
                  mt: 1,
                  bgcolor: '#2563EB',
                  boxShadow: 'none',
                  borderRadius:
                    '10px',
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  textTransform:
                    'none',

                  '&:hover': {
                    bgcolor: '#1D4ED8',
                    boxShadow: 'none',
                  },
                }}
              >
                Add Testimonial
              </Button>
            }
          />
        )}

      {/* =====================================================
          DATA TABLE
      ===================================================== */}

      {!loading &&
        !error &&
        rows.length > 0 && (
          <DataTable
            columns={columns}
            rows={rows}
            searchKey="name"
            emptyText="No testimonials match your search."
          />
        )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <AdminModal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting) {
            setDeleteTarget(null)
          }
        }}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Delete testimonial from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={
          deleting
            ? 'Deleting...'
            : 'Delete'
        }
        variant="danger"
      />
    </Box>
  )
}

export default TestimonialsList