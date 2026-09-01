import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Stack,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiRefreshCw,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'
import DataTable from '../../../components/admin/common/DataTable'
import AdminModal from '../../../components/admin/common/AdminModal'

import {
  getBlogs,
  deleteBlog,
} from '../../../services/blogService'

const STATUS_COLORS = {
  Published: {
    bgcolor: 'rgba(34,197,94,0.1)',
    color: '#16A34A',
  },
  Draft: {
    bgcolor: 'rgba(245,158,11,0.1)',
    color: '#D97706',
  },
}

const BlogList = () => {
  const navigate = useNavigate()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadBlogs = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getBlogs()

      setRows(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load blogs:', err)

      setError(
        err?.message ||
        'Unable to load blog posts. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    try {
      setDeleting(true)

      await deleteBlog(deleteTarget.id)

      setRows((previous) =>
        previous.filter(
          (blog) =>
            String(blog.id) !== String(deleteTarget.id)
        )
      )

      toast.success('Blog post deleted successfully.')

      setDeleteTarget(null)
    } catch (err) {
      console.error('Failed to delete blog:', err)

      toast.error(
        err?.message ||
        'Unable to delete blog post. Please try again.'
      )
    } finally {
      setDeleting(false)
    }
  }

  const columns = [
    {
      id: 'title',
      label: 'Title',
      minWidth: 200,
      render: (val, row) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          {row.thumbnail ? (
            <Box
              component="img"
              src={row.thumbnail}
              alt=""
              sx={{
                width: 40,
                height: 40,
                objectFit: 'cover',
                borderRadius: '8px',
                flexShrink: 0,
              }}
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'rgba(37,99,235,0.08)',
                borderRadius: '8px',
                fontSize: '0.7rem',
                color: '#2563EB',
                fontWeight: 700,
              }}
            >
              {val?.charAt(0)?.toUpperCase() || 'B'}
            </Avatar>
          )}

          <Box>
            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#1E293B',
              }}
            >
              {val || 'Untitled'}
            </Box>

            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: '#94A3B8',
              }}
            >
              {row.createdAt || row.date || '—'}
            </Box>
          </Box>
        </Stack>
      ),
    },

    {
      id: 'category',
      label: 'Category',
      minWidth: 120,
    },

    {
      id: 'author',
      label: 'Author',
      minWidth: 130,
    },

    {
      id: 'tags',
      label: 'Tags',
      minWidth: 140,
      render: (val) => (
        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          gap={0.5}
        >
          {(Array.isArray(val) ? val : []).map(
            (tag, index) => (
              <Chip
                key={`${tag}-${index}`}
                label={tag}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 22,
                  bgcolor: '#F1F5F9',
                  color: '#475569',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            )
          )}
        </Stack>
      ),
    },

    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: (val) => (
        <Chip
          label={val || 'Draft'}
          size="small"
          sx={{
            ...(STATUS_COLORS[val] || STATUS_COLORS.Draft),
            fontFamily: 'Inter, sans-serif',
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
      minWidth: 130,
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
              navigate(`/admin/blog/${row.id}`)
            }
            sx={{
              minWidth: 32,
              p: 0.75,
              color: '#64748B',
              '&:hover': {
                color: '#2563EB',
                bgcolor: 'rgba(37,99,235,0.06)',
              },
              borderRadius: '8px',
            }}
          >
            <FiEye size={15} />
          </Button>

          <Button
            size="small"
            variant="text"
            onClick={() =>
              navigate(`/admin/blog/${row.id}/edit`)
            }
            sx={{
              minWidth: 32,
              p: 0.75,
              color: '#64748B',
              '&:hover': {
                color: '#F59E0B',
                bgcolor: 'rgba(245,158,11,0.06)',
              },
              borderRadius: '8px',
            }}
          >
            <FiEdit2 size={15} />
          </Button>

          <Button
            size="small"
            variant="text"
            onClick={() => setDeleteTarget(row)}
            disabled={deleting}
            sx={{
              minWidth: 32,
              p: 0.75,
              color: '#64748B',
              '&:hover': {
                color: '#EF4444',
                bgcolor: 'rgba(239,68,68,0.06)',
              },
              borderRadius: '8px',
            }}
          >
            <FiTrash2 size={15} />
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Box>
      <PageHeader
        title="Blog Posts"
        subtitle="Manage all blog articles published on the website."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Blog' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus size={16} />}
            onClick={() =>
              navigate('/admin/blog/create')
            }
            sx={{
              bgcolor: '#2563EB',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1D4ED8',
                boxShadow: 'none',
              },
            }}
          >
            New Post
          </Button>
        }
      />

      {/* Loading */}
      {loading ? (
        <Box
          sx={{
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            bgcolor: '#FFFFFF',
          }}
        >
          <Stack
            alignItems="center"
            spacing={1.5}
          >
            <CircularProgress
              size={30}
              sx={{ color: '#2563EB' }}
            />

            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                color: '#64748B',
              }}
            >
              Loading blog posts...
            </Box>
          </Stack>
        </Box>
      ) : error ? (
        /* Error */
        <Box
          sx={{
            border: '1px solid #FECACA',
            borderRadius: '16px',
            bgcolor: '#FFFFFF',
            p: 3,
          }}
        >
          <Alert
            severity="error"
            sx={{
              borderRadius: '10px',
              alignItems: 'center',
            }}
            action={
              <Button
                size="small"
                startIcon={<FiRefreshCw size={14} />}
                onClick={loadBlogs}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      ) : (
        /* Data */
        <DataTable
          columns={columns}
          rows={rows}
          searchKey="title"
          emptyText="No blog posts found."
        />
      )}

      <AdminModal
        open={!!deleteTarget}
        onClose={() => {
          if (!deleting) {
            setDeleteTarget(null)
          }
        }}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel={
          deleting ? 'Deleting...' : 'Delete'
        }
        variant="danger"
      />
    </Box>
  )
}

export default BlogList