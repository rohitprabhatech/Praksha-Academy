import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiCalendar,
  FiEdit2,
  FiFileText,
  FiFolder,
  FiRefreshCw,
  FiTag,
  FiUser,
} from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import { getBlogById } from '../../../services/blogService'

const MetaRow = ({ icon: Icon, label, value }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '8px',
        bgcolor: 'rgba(37,99,235,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={13} color="#2563EB" />
    </Box>

    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        color: '#64748B',
        fontWeight: 500,
      }}
    >
      <strong style={{ color: '#1E293B' }}>{label}:</strong>{' '}
      {value || '—'}
    </Typography>
  </Stack>
)

const BlogDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBlog = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getBlogById(id)

      if (!data) {
        setBlog(null)
        setError('Blog post not found.')
        return
      }

      setBlog(data)
    } catch (err) {
      console.error(err)
      setBlog(null)
      setError(
        err.message || 'Unable to load blog post. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadBlog()
  }, [loadBlog])

  const handleRetry = () => {
    loadBlog()
  }

  if (loading) {
    return (
      <Box>
        <PageHeader
          title="Blog Details"
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Blog', to: '/admin/blog' },
            { label: 'Details' },
          ]}
        />

        <Box
          sx={{
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress size={32} />
            <Typography
              sx={{
                color: '#64748B',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Loading blog post...
            </Typography>
          </Stack>
        </Box>
      </Box>
    )
  }

  if (error || !blog) {
    return (
      <Box>
        <PageHeader
          title="Blog Details"
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Blog', to: '/admin/blog' },
            { label: 'Not Found' },
          ]}
        />

        <Box
          sx={{
            minHeight: 480,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 620,
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              p: { xs: 3, sm: 5 },
              textAlign: 'center',
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 2.5,
                borderRadius: '20px',
                bgcolor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiFileText
                size={32}
                color="#2563EB"
              />
            </Box>

            {/* Title */}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1E293B',
                mb: 1,
              }}
            >
              Blog post not found
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: '#64748B',
                maxWidth: 460,
                mx: 'auto',
                mb: 3,
              }}
            >
              The blog post you're looking for doesn't exist
              or may have been deleted.
            </Typography>

            {/* Error */}
            {error && error !== 'Blog post not found.' && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  textAlign: 'left',
                  borderRadius: '10px',
                }}
              >
                {error}
              </Alert>
            )}

            {/* Actions */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                startIcon={<FiArrowLeft size={15} />}
                onClick={() => navigate('/admin/blog')}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  px: 2.5,
                  py: 1,
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  '&:hover': {
                    borderColor: '#CBD5E1',
                    bgcolor: '#F8FAFC',
                  },
                }}
              >
                Back to Blog
              </Button>

              <Button
                variant="contained"
                startIcon={<FiRefreshCw size={15} />}
                onClick={handleRetry}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
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
                Try Again
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    )
  }

  const tags = Array.isArray(blog.tags) ? blog.tags : []

  const blogDate = blog.date || blog.createdAt || '—'

  return (
    <Box>
      <PageHeader
        title="Blog Details"
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Blog', to: '/admin/blog' },
          { label: blog.title },
        ]}
        action={
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<FiArrowLeft size={15} />}
              onClick={() => navigate('/admin/blog')}
              sx={{
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                borderRadius: '10px',
                borderColor: '#E2E8F0',
                color: '#64748B',
                '&:hover': {
                  borderColor: '#CBD5E1',
                  bgcolor: '#F8FAFC',
                },
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              startIcon={<FiEdit2 size={15} />}
              onClick={() =>
                navigate(`/admin/blog/${blog.id}/edit`)
              }
              sx={{
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
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
              Edit Post
            </Button>
          </Stack>
        }
      />

      <div className="row g-4">
        {/* Main content */}
        <div className="col-12 col-lg-8">
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Thumbnail */}
            {blog.thumbnail ? (
              <Box
                component="img"
                src={blog.thumbnail}
                alt={blog.title}
                sx={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <Box
                sx={{
                  height: 220,
                  bgcolor: 'rgba(37,99,235,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'rgba(37,99,235,0.12)',
                    borderRadius: '16px',
                    fontSize: '1.5rem',
                    color: '#2563EB',
                    fontWeight: 700,
                  }}
                >
                  {blog.title?.charAt(0)?.toUpperCase() || 'B'}
                </Avatar>
              </Box>
            )}

            <Box sx={{ p: 3 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                sx={{ mb: 1.5 }}
              >
                {blog.category && (
                  <Chip
                    label={blog.category}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(37,99,235,0.08)',
                      color: '#2563EB',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                )}

                <Chip
                  label={blog.status || 'Draft'}
                  size="small"
                  sx={{
                    bgcolor:
                      blog.status === 'Published'
                        ? 'rgba(34,197,94,0.1)'
                        : 'rgba(245,158,11,0.1)',
                    color:
                      blog.status === 'Published'
                        ? '#16A34A'
                        : '#D97706',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              </Stack>

              <Typography
                component="h2"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.375rem',
                  color: '#1E293B',
                  mb: 1,
                }}
              >
                {blog.title}
              </Typography>

              <Divider
                sx={{
                  my: 2.5,
                  borderColor: '#F1F5F9',
                }}
              />

              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  color: '#334155',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {blog.content || 'No content available.'}
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Sidebar */}
        <div className="col-12 col-lg-4">
          <Stack spacing={3}>
            {/* Post info */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#1E293B',
                  mb: 2,
                }}
              >
                Post Info
              </Typography>

              <Stack spacing={1.5}>
                <MetaRow
                  icon={FiUser}
                  label="Author"
                  value={blog.author}
                />

                <MetaRow
                  icon={FiFolder}
                  label="Category"
                  value={blog.category}
                />

                <MetaRow
                  icon={FiCalendar}
                  label="Date"
                  value={blogDate}
                />
              </Stack>
            </Box>

            {/* Tags */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: 2.5,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.75}
                sx={{ mb: 2 }}
              >
                <FiTag size={14} color="#1E293B" />

                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#1E293B',
                  }}
                >
                  Tags
                </Typography>
              </Stack>

              {tags.length > 0 ? (
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={0.75}
                >
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: '#F1F5F9',
                        color: '#475569',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '0.8rem',
                  }}
                >
                  No tags added.
                </Typography>
              )}
            </Box>

            {/* SEO */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#1E293B',
                  mb: 1.5,
                }}
              >
                SEO Preview
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  color: '#2563EB',
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {blog.seoTitle || blog.title}
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: '#64748B',
                  lineHeight: 1.6,
                }}
              >
                {blog.seoDescription ||
                  'No SEO description available.'}
              </Typography>
            </Box>
          </Stack>
        </div>
      </div>
    </Box>
  )
}

export default BlogDetails