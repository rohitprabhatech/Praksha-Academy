import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Chip,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  FiUploadCloud,
  FiX,
  FiSave,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'
import { createGalleryItem } from '../../../services/galleryService'

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

const AddImage = () => {
  const navigate = useNavigate()

  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      altText: '',
    },
  })

  // =========================================================
  // FILE HANDLING
  // =========================================================

  const handleFile = (e) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image.')
      e.target.value = ''
      return
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10 MB.')
      e.target.value = ''
      return
    }

    // Remove previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setPreview(null)
    setSelectedFile(null)

    const input = document.getElementById('image-upload')

    if (input) {
      input.value = ''
    }
  }

  // =========================================================
  // TAGS
  // =========================================================

  const addTag = () => {
    const tag = tagInput.trim()

    if (!tag) {
      return
    }

    if (!tags.includes(tag)) {
      setTags((previous) => [...previous, tag])
    }

    setTagInput('')
  }

  const removeTag = (tagToRemove) => {
    setTags((previous) =>
      previous.filter((tag) => tag !== tagToRemove)
    )
  }

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  // =========================================================
  // FILE READER
  // =========================================================

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.onerror = () => {
        reject(
          new Error('Unable to read the selected image.')
        )
      }

      reader.readAsDataURL(file)
    })
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = async (data) => {
    if (!selectedFile) {
      toast.error('Please select an image.')
      return
    }

    try {
      setSaving(true)

      // Convert image to a data URL so the mock service
      // can persist it in localStorage.
      const imageUrl = await readFileAsDataUrl(
        selectedFile
      )

      await createGalleryItem({
        type: 'image',
        title: data.title,
        altText: data.altText?.trim() || '',
        tags,
        url: imageUrl,
      })

      toast.success('Image added to gallery!')

      navigate('/admin/gallery')
    } catch (err) {
      console.error('Failed to add image:', err)

      toast.error(
        err.message || 'Unable to add image.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <PageHeader
        title="Add Image"
        subtitle="Upload a new image to the gallery."
        breadcrumbs={[
          { label: 'Admin' },
          {
            label: 'Gallery',
            to: '/admin/gallery',
          },
          {
            label: 'Add Image',
          },
        ]}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack spacing={3}>

            {/* =================================================
                UPLOAD SECTION
            ================================================= */}

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  mb: 2,
                }}
              >
                Upload Image
              </Typography>

              <Box
                component="label"
                htmlFor="image-upload"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,

                  minHeight: 260,

                  p: 3,

                  border:
                    '2px dashed #CBD5E1',

                  borderRadius: '12px',

                  cursor: saving
                    ? 'not-allowed'
                    : 'pointer',

                  bgcolor: '#F8FAFC',

                  transition:
                    'border-color 0.2s ease, background-color 0.2s ease',

                  '&:hover': {
                    borderColor: saving
                      ? '#CBD5E1'
                      : '#2563EB',

                    bgcolor: saving
                      ? '#F8FAFC'
                      : '#F1F5F9',
                  },

                  overflow: 'hidden',
                }}
              >
                {preview ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: 240,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={preview}
                      alt="Selected image preview"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '16px',
                        bgcolor:
                          'rgba(37,99,235,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FiUploadCloud
                        size={28}
                        color="#2563EB"
                      />
                    </Box>

                    <Stack
                      spacing={0.5}
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontFamily:
                            'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: '#1E293B',
                        }}
                      >
                        Click to upload image
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily:
                            'Inter, sans-serif',
                          fontSize: '0.8rem',
                          color: '#94A3B8',
                        }}
                      >
                        PNG, JPG, JPEG or WEBP
                      </Typography>

                      <Typography
                        sx={{
                          fontFamily:
                            'Inter, sans-serif',
                          fontSize: '0.75rem',
                          color: '#94A3B8',
                        }}
                      >
                        Maximum file size: 10 MB
                      </Typography>
                    </Stack>
                  </>
                )}

                <input
                  id="image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  hidden
                  onChange={handleFile}
                  disabled={saving}
                />
              </Box>

              {preview && (
                <Button
                  type="button"
                  size="small"
                  onClick={removeImage}
                  disabled={saving}
                  startIcon={<FiX size={14} />}
                  sx={{
                    mt: 1.5,
                    color: '#EF4444',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'none',

                    '&:hover': {
                      bgcolor:
                        'rgba(239,68,68,0.06)',
                    },
                  }}
                >
                  Remove Image
                </Button>
              )}
            </Box>

            {/* =================================================
                IMAGE DETAILS
            ================================================= */}

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  mb: 2,
                }}
              >
                Image Details
              </Typography>

              <Stack spacing={2.5}>

                {/* Title */}

                <TextField
                  label="Title *"
                  fullWidth
                  {...register('title', {
                    required:
                      'Title is required',
                  })}
                  error={!!errors.title}
                  helperText={
                    errors.title?.message
                  }
                  sx={fieldSx}
                />

                {/* Alt text */}

                <TextField
                  label="Alt Text"
                  fullWidth
                  {...register('altText')}
                  helperText="Describe the image for accessibility and SEO."
                  sx={fieldSx}
                />

                {/* Tags */}

                <Box>
                  <Typography
                    sx={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#334155',
                      mb: 1,
                    }}
                  >
                    Tags
                  </Typography>

                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Add tag..."
                      value={tagInput}
                      onChange={(e) =>
                        setTagInput(
                          e.target.value
                        )
                      }
                      onKeyDown={
                        handleTagKeyDown
                      }
                      sx={{
                        ...fieldSx,
                        flex: 1,
                      }}
                    />

                    <Button
                      type="button"
                      variant="outlined"
                      size="small"
                      onClick={addTag}
                      sx={{
                        minWidth: {
                          xs: '100%',
                          sm: 80,
                        },

                        height: {
                          xs: 40,
                          sm: 40,
                        },

                        borderRadius: '10px',
                        borderColor:
                          '#E2E8F0',
                        color: '#64748B',
                        fontFamily:
                          'Inter, sans-serif',
                        fontWeight: 600,
                        textTransform:
                          'none',

                        '&:hover': {
                          borderColor:
                            '#2563EB',
                          color:
                            '#2563EB',
                          bgcolor:
                            'rgba(37,99,235,0.04)',
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
                      sx={{
                        mt: 1.5,
                      }}
                    >
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          onDelete={() =>
                            removeTag(tag)
                          }
                          deleteIcon={
                            <FiX size={12} />
                          }
                          sx={{
                            fontFamily:
                              'Inter, sans-serif',
                            fontSize:
                              '0.75rem',
                            bgcolor:
                              'rgba(37,99,235,0.08)',
                            color:
                              '#2563EB',
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Box>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="flex-end"
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() =>
                  navigate('/admin/gallery')
                }
                disabled={saving}
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  textTransform: 'none',

                  '&:hover': {
                    borderColor:
                      '#CBD5E1',
                    bgcolor: '#F8FAFC',
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={
                  <FiSave size={15} />
                }
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  bgcolor: '#2563EB',
                  boxShadow: 'none',
                  textTransform: 'none',

                  '&:hover': {
                    bgcolor: '#1D4ED8',
                    boxShadow: 'none',
                  },

                  '&.Mui-disabled': {
                    bgcolor: '#93C5FD',
                    color: '#FFFFFF',
                  },
                }}
              >
                {saving
                  ? 'Saving...'
                  : 'Save Image'}
              </Button>
            </Stack>

          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default AddImage