import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Alert,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import {
  FiUploadCloud,
  FiX,
  FiSave,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'

import {
  createBlog,
  updateBlog,
} from '../../../services/blogService'

const CATEGORIES = [
  'Technology',
  'Cloud',
  'Design',
  'AI/ML',
  'Development',
  'Career',
  'Data Science',
]

const STATUS_OPTIONS = ['Draft', 'Published']

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',

    '& fieldset': {
      borderColor: '#E2E8F0',
    },

    '&:hover fieldset': {
      borderColor: '#CBD5E1',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
      borderWidth: 1.5,
    },
  },

  '& .MuiInputLabel-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
  },
}

const SectionCard = ({ title, children }) => (
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      p: 3,
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '0.9375rem',
        color: '#1E293B',
        mb: 2.5,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
)

const CreateBlog = ({
  prefill = null,
  editMode = false,
}) => {
  const navigate = useNavigate()

  const [thumbnail, setThumbnail] = useState(
    prefill?.thumbnail ?? null
  )

  const [tagInput, setTagInput] = useState('')

  const [tags, setTags] = useState(
    prefill?.tags ?? []
  )

  const [loading, setLoading] = useState(false)

  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: prefill ?? {
      title: '',
      category: '',
      author: '',
      content: '',
      seoTitle: '',
      seoDescription: '',
      status: 'Draft',
    },
  })

  const handleThumbChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Thumbnail must be smaller than 5 MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setThumbnail(reader.result)
    }

    reader.onerror = () => {
      toast.error('Failed to load thumbnail.')
    }

    reader.readAsDataURL(file)

    // Allow selecting the same image again
    event.target.value = ''
  }

  const addTag = () => {
    const tag = tagInput.trim()

    if (!tag) {
      return
    }

    if (tags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      setTagInput('')
      return
    }

    setTags((previous) => [...previous, tag])
    setTagInput('')
  }

  const removeTag = (tag) => {
    setTags((previous) =>
      previous.filter((item) => item !== tag)
    )
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setServerError('')

      const payload = {
        ...data,
        tags,
        thumbnail,
      }

      if (editMode) {
        if (!prefill?.id) {
          throw new Error(
            'Blog post ID is missing. Unable to update the post.'
          )
        }

        await updateBlog(prefill.id, payload)

        toast.success(
          'Blog post updated successfully.'
        )
      } else {
        await createBlog(payload)

        toast.success(
          'Blog post created successfully.'
        )
      }

      navigate('/admin/blog')
    } catch (error) {
      console.error(
        'Failed to save blog post:',
        error
      )

      const message =
        error?.message ||
        `Unable to ${editMode ? 'update' : 'create'
        } blog post. Please try again.`

      setServerError(message)

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const clearServerError = () => {
    if (serverError) {
      setServerError('')
    }
  }

  return (
    <Box>
      <PageHeader
        title={
          editMode
            ? 'Edit Blog Post'
            : 'Create Blog Post'
        }
        subtitle={
          editMode
            ? 'Update the blog post details below.'
            : 'Fill in the details to publish a new blog post.'
        }
        breadcrumbs={[
          { label: 'Admin' },
          {
            label: 'Blog',
            to: '/admin/blog',
          },
          {
            label: editMode ? 'Edit' : 'Create',
          },
        ]}
      />

      {serverError && (
        <Alert
          severity="error"
          onClose={clearServerError}
          sx={{
            mb: 3,
            borderRadius: '10px',
          }}
        >
          {serverError}
        </Alert>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="row g-4">

          {/* Left column */}
          <div className="col-12 col-lg-8">
            <Stack spacing={3}>

              <SectionCard title="Post Content">
                <Stack spacing={2.5}>

                  <TextField
                    label="Title *"
                    fullWidth
                    {...register('title', {
                      required: 'Title is required',
                    })}
                    error={!!errors.title}
                    helperText={
                      errors.title?.message
                    }
                    disabled={loading}
                    sx={fieldSx}
                    onChange={clearServerError}
                  />

                  <TextField
                    label="Content *"
                    fullWidth
                    multiline
                    rows={10}
                    {...register('content', {
                      required:
                        'Content is required',
                    })}
                    error={!!errors.content}
                    helperText={
                      errors.content?.message ??
                      'Tip: A rich text editor can be integrated here.'
                    }
                    disabled={loading}
                    sx={fieldSx}
                    onChange={clearServerError}
                  />

                </Stack>
              </SectionCard>

              <SectionCard title="SEO Settings">
                <Stack spacing={2.5}>

                  <TextField
                    label="SEO Title"
                    fullWidth
                    {...register('seoTitle')}
                    disabled={loading}
                    sx={fieldSx}
                  />

                  <TextField
                    label="SEO Description"
                    fullWidth
                    multiline
                    rows={3}
                    {...register('seoDescription')}
                    disabled={loading}
                    sx={fieldSx}
                  />

                </Stack>
              </SectionCard>

            </Stack>
          </div>

          {/* Right column */}
          <div className="col-12 col-lg-4">
            <Stack spacing={3}>

              <SectionCard title="Publish Settings">
                <Stack spacing={2.5}>

                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        sx={fieldSx}
                        disabled={loading}
                      >
                        <InputLabel>
                          Status
                        </InputLabel>

                        <Select
                          {...field}
                          label="Status"
                          input={
                            <OutlinedInput label="Status" />
                          }
                        >
                          {STATUS_OPTIONS.map(
                            (status) => (
                              <MenuItem
                                key={status}
                                value={status}
                              >
                                {status}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="category"
                    control={control}
                    rules={{
                      required:
                        'Category is required',
                    }}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.category}
                        sx={fieldSx}
                        disabled={loading}
                      >
                        <InputLabel>
                          Category *
                        </InputLabel>

                        <Select
                          {...field}
                          label="Category *"
                          input={
                            <OutlinedInput label="Category *" />
                          }
                        >
                          {CATEGORIES.map(
                            (category) => (
                              <MenuItem
                                key={category}
                                value={category}
                              >
                                {category}
                              </MenuItem>
                            )
                          )}
                        </Select>

                        {errors.category && (
                          <Typography
                            sx={{
                              color: '#DC2626',
                              fontSize: '0.75rem',
                              mt: 0.5,
                              ml: 1.75,
                            }}
                          >
                            {errors.category.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />

                  <TextField
                    label="Author *"
                    fullWidth
                    {...register('author', {
                      required:
                        'Author is required',
                    })}
                    error={!!errors.author}
                    helperText={
                      errors.author?.message
                    }
                    disabled={loading}
                    sx={fieldSx}
                  />

                </Stack>
              </SectionCard>

              <SectionCard title="Thumbnail">
                <Box
                  component="label"
                  htmlFor="thumbnail-upload"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    p: 3,
                    border:
                      '2px dashed #E2E8F0',
                    borderRadius: '12px',
                    cursor: loading
                      ? 'default'
                      : 'pointer',
                    bgcolor: '#F8FAFC',
                    transition:
                      'border-color 0.2s',
                    '&:hover': {
                      borderColor: loading
                        ? '#E2E8F0'
                        : '#2563EB',
                    },
                    overflow: 'hidden',
                  }}
                >
                  {thumbnail ? (
                    <Box
                      component="img"
                      src={thumbnail}
                      alt="Thumbnail preview"
                      sx={{
                        width: '100%',
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  ) : (
                    <>
                      <FiUploadCloud
                        size={30}
                        color="#94A3B8"
                      />

                      <Typography
                        sx={{
                          fontFamily:
                            'Inter, sans-serif',
                          fontSize: '0.8rem',
                          color: '#64748B',
                          textAlign: 'center',
                        }}
                      >
                        Click to upload thumbnail
                        <br />
                        PNG, JPG up to 5 MB
                      </Typography>
                    </>
                  )}

                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={loading}
                    onChange={handleThumbChange}
                  />
                </Box>

                {thumbnail && (
                  <Button
                    size="small"
                    disabled={loading}
                    onClick={() =>
                      setThumbnail(null)
                    }
                    sx={{
                      mt: 1,
                      color: '#EF4444',
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: '0.8rem',
                    }}
                  >
                    Remove
                  </Button>
                )}
              </SectionCard>

              <SectionCard title="Tags">
                <Stack
                  direction="row"
                  spacing={1}
                >
                  <TextField
                    size="small"
                    placeholder="Add a tag..."
                    value={tagInput}
                    disabled={loading}
                    onChange={(event) => {
                      setTagInput(
                        event.target.value
                      )
                    }}
                    onKeyDown={(event) => {
                      if (
                        event.key === 'Enter'
                      ) {
                        event.preventDefault()
                        addTag()
                      }
                    }}
                    sx={{
                      ...fieldSx,
                      flex: 1,
                    }}
                  />

                  <Button
                    variant="outlined"
                    size="small"
                    disabled={loading}
                    onClick={addTag}
                    sx={{
                      borderRadius: '10px',
                      borderColor: '#E2E8F0',
                      color: '#64748B',
                      fontFamily:
                        'Inter, sans-serif',
                      '&:hover': {
                        borderColor: '#2563EB',
                        color: '#2563EB',
                      },
                    }}
                  >
                    Add
                  </Button>
                </Stack>

                {tags.length > 0 && (
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={0.75}
                    sx={{ mt: 1.5 }}
                  >
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        disabled={loading}
                        onDelete={() =>
                          removeTag(tag)
                        }
                        deleteIcon={
                          <FiX size={12} />
                        }
                        sx={{
                          fontFamily:
                            'Inter, sans-serif',
                          fontSize: '0.75rem',
                          bgcolor:
                            'rgba(37,99,235,0.08)',
                          color: '#2563EB',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </SectionCard>

            </Stack>
          </div>
        </div>

        {/* Actions */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 4,
            pt: 3,
            borderTop:
              '1px solid #E2E8F0',
          }}
        >
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() =>
              navigate('/admin/blog')
            }
            sx={{
              fontFamily:
                'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              borderColor: '#E2E8F0',
              color: '#64748B',
              '&:hover': {
                borderColor: '#CBD5E1',
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              <FiSave size={16} />
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
            {loading
              ? editMode
                ? 'Updating...'
                : 'Saving...'
              : editMode
                ? 'Update Post'
                : 'Publish Post'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default CreateBlog