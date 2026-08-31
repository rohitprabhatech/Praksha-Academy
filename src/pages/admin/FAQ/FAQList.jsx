import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Button, Chip, CircularProgress } from '@mui/material'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import AdminModal from '../../../components/admin/common/AdminModal'
import EmptyState from '../../../components/admin/common/EmptyState'
import ErrorState from '../../../components/admin/common/ErrorState'

import {
  getFAQs,
  deleteFAQ,
} from '../../../services/faqService'

const FAQList = () => {
  const navigate = useNavigate()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // =========================================================
  // LOAD FAQS
  // =========================================================

  const loadFAQs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getFAQs()

      setRows(data)
    } catch (err) {
      console.error('Failed to load FAQs:', err)

      setError(
        err.message ||
          'We could not load the FAQs.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFAQs()
  }, [loadFAQs])

  // =========================================================
  // DELETE FAQ
  // =========================================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    try {
      setDeleting(true)

      await deleteFAQ(deleteTarget.id)

      setRows((previous) =>
        previous.filter(
          (faq) =>
            String(faq.id) !==
            String(deleteTarget.id)
        )
      )

      toast.success('FAQ deleted successfully.')
      setDeleteTarget(null)
    } catch (err) {
      console.error(
        'Failed to delete FAQ:',
        err
      )

      toast.error(
        err.message ||
          'Unable to delete FAQ.'
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
      id: 'question',
      label: 'Question',
      minWidth: 280,

      render: (val) => (
        <Box
          sx={{
            fontFamily:
              'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#1E293B',
            maxWidth: 380,
            overflow: 'hidden',
            textOverflow:
              'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {val}
        </Box>
      ),
    },

    {
      id: 'category',
      label: 'Category',
      minWidth: 120,
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
              val === 'Active'
                ? 'rgba(34,197,94,0.1)'
                : 'rgba(100,116,139,0.1)',

            color:
              val === 'Active'
                ? '#16A34A'
                : '#64748B',

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
                `/admin/faq/${row.id}/edit`
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
        title="FAQs"
        subtitle="Manage frequently asked questions displayed on the website."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'FAQ' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={
              <FiPlus size={16} />
            }
            onClick={() =>
              navigate('/admin/faq/add')
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
            Add FAQ
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
              Loading FAQs...
            </Box>
          </Stack>
        </Box>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <ErrorState
          title="Unable to load FAQs"
          message={error}
          onRetry={loadFAQs}
        />
      )}

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {!loading &&
        !error &&
        rows.length === 0 && (
          <EmptyState
            title="No FAQs found"
            description="There are no FAQ entries available yet. Add your first FAQ to get started."
            action={
              <Button
                variant="contained"
                startIcon={
                  <FiPlus size={15} />
                }
                onClick={() =>
                  navigate(
                    '/admin/faq/add'
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
                Add FAQ
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
            searchKey="question"
            emptyText="No FAQs match your search."
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
        title="Delete FAQ"
        message={`Delete this FAQ entry permanently?`}
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

export default FAQList