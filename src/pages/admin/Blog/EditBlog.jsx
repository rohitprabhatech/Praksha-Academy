import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiFileText,
  FiRefreshCw,
} from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import CreateBlog from './CreateBlog'
import { getBlogById } from '../../../services/blogService'

const EditBlog = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBlog = async () => {
    try {
      setLoading(true)
      setError('')
      setBlog(null)

      const data = await getBlogById(id)

      if (!data) {
        setError('Blog post not found.')
        return
      }

      setBlog(data)
    } catch (err) {
      console.error('Failed to load blog post:', err)

      setError(
        err?.message ||
          'Unable to load blog post. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlog()
  }, [id])

  /*
   * Loading state
   */
  if (loading) {
    return (
      <Box>
        <PageHeader
          title="Edit Blog"
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Blog', to: '/admin/blog' },
            { label: 'Edit' },
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
          <Stack
            spacing={2}
            alignItems="center"
          >
            <CircularProgress
              size={34}
              sx={{
                color: '#2563EB',
              }}
            />

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#64748B',
              }}
            >
              Loading blog post...
            </Typography>
          </Stack>
        </Box>
      </Box>
    )
  }

  /*
   * Error / Not Found state
   */
  if (error || !blog) {
    return (
      <Box>
        <PageHeader
          title="Edit Blog"
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
              p: {
                xs: 3,
                sm: 5,
              },
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
              The blog post you're trying to edit doesn't
              exist or may have been deleted.
            </Typography>

            {/* Other errors */}
            {error &&
              error !== 'Blog post not found.' && (
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
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={1.5}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                startIcon={
                  <FiArrowLeft size={15} />
                }
                onClick={() =>
                  navigate('/admin/blog')
                }
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
                startIcon={
                  <FiRefreshCw size={15} />
                }
                onClick={loadBlog}
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

  /*
   * Blog found
   */
  return (
    <CreateBlog
      prefill={blog}
      editMode
    />
  )
}

export default EditBlog