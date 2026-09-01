import { useNavigate } from 'react-router-dom'
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Chip,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FiLink,
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
    backgroundColor: '#FFFFFF',

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

  '& .MuiFormHelperText-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.75rem',
  },
}

// =========================================================
// YOUTUBE HELPERS
// =========================================================

const isYouTube = (url = '') =>
  url.includes('youtube.com') ||
  url.includes('youtu.be')

const toEmbed = (url = '') => {
  const match = url.match(
    /(?:v=|youtu\.be\/|youtube\.com\/embed\/)([^&?]+)/
  )

  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : url
}

// =========================================================
// ADD VIDEO
// =========================================================

const AddVideo = () => {
  const navigate = useNavigate()

  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
    },
  })

  const watchedUrl = watch('videoUrl')

  // =======================================================
  // ADD TAG
  // =======================================================

  const addTag = () => {
    const tag = tagInput.trim()

    if (!tag) {
      return
    }

    if (!tags.includes(tag)) {
      setTags((previous) => [
        ...previous,
        tag,
      ])
    }

    setTagInput('')
  }

  // =======================================================
  // REMOVE TAG
  // =======================================================

  const removeTag = (tagToRemove) => {
    setTags((previous) =>
      previous.filter(
        (tag) => tag !== tagToRemove
      )
    )
  }

  // =======================================================
  // SUBMIT
  // =======================================================

  const onSubmit = async (data) => {
    try {
      setSaving(true)

      const videoUrl = data.videoUrl.trim()

      await createGalleryItem({
        type: 'video',
        title: data.title,
        description:
          data.description?.trim() || '',
        url: toEmbed(videoUrl),
        tags,
        date: new Date()
          .toISOString()
          .slice(0, 10),
      })

      toast.success(
        'Video added to gallery!'
      )

      navigate('/admin/gallery')
    } catch (error) {
      console.error(
        'Failed to add video:',
        error
      )

      toast.error(
        error.message ||
          'Unable to add video.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        title="Add Video"
        subtitle="Add a YouTube, Vimeo, or direct video link to the gallery."
        breadcrumbs={[
          {
            label: 'Admin',
          },
          {
            label: 'Gallery',
            to: '/admin/gallery',
          },
          {
            label: 'Add Video',
          },
        ]}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          px: {
            xs: 0,
            sm: 1,
            md: 2,
          },
          pb: 5,
        }}
      >

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >

          <Stack spacing={3}>

            {/* =================================================
                VIDEO DETAILS
            ================================================= */}

            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border:
                  '1px solid #E2E8F0',
                borderRadius: '16px',
                p: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },
              }}
            >

              <Stack
                spacing={0.5}
                sx={{ mb: 3 }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#1E293B',
                  }}
                >
                  Video Details
                </Typography>

                <Typography
                  sx={{
                    fontFamily:
                      'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: '#94A3B8',
                  }}
                >
                  Add the basic information
                  for your gallery video.
                </Typography>
              </Stack>

              <Stack spacing={2.5}>

                {/* TITLE */}

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
                  disabled={saving}
                  sx={fieldSx}
                />

                {/* DESCRIPTION */}

                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register(
                    'description'
                  )}
                  helperText="Optional short description for the video."
                  disabled={saving}
                  sx={fieldSx}
                />

                {/* VIDEO URL */}

                <TextField
                  label="Video URL *"
                  fullWidth
                  placeholder="https://www.youtube.com/watch?v=..."
                  {...register('videoUrl', {
                    required:
                      'Video URL is required',
                  })}
                  error={!!errors.videoUrl}
                  helperText={
                    errors.videoUrl?.message ??
                    'Supports YouTube, Vimeo, or direct .mp4 links.'
                  }
                  disabled={saving}
                  InputProps={{
                    startAdornment: (
                      <FiLink
                        size={16}
                        color="#94A3B8"
                        style={{
                          marginRight: 8,
                          flexShrink: 0,
                        }}
                      />
                    ),
                  }}
                  sx={fieldSx}
                />

                {/* =================================================
                    TAGS
                ================================================= */}

                <Box>

                  <Typography
                    sx={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize:
                        '0.875rem',
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
                      onChange={(event) =>
                        setTagInput(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key ===
                          'Enter'
                        ) {
                          event.preventDefault()
                          addTag()
                        }
                      }}
                      disabled={saving}
                      sx={fieldSx}
                    />

                    <Button
                      type="button"
                      variant="outlined"
                      size="small"
                      onClick={addTag}
                      disabled={saving}
                      sx={{
                        minWidth: {
                          xs: '100%',
                          sm: 80,
                        },

                        height: 40,

                        borderRadius:
                          '10px',

                        borderColor:
                          '#E2E8F0',

                        color:
                          '#64748B',

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
                            '#F8FAFC',
                        },
                      }}
                    >
                      Add
                    </Button>

                  </Stack>

                  {/* TAG LIST */}

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
                            removeTag(
                              tag
                            )
                          }
                          deleteIcon={
                            <FiX
                              size={12}
                            />
                          }
                          sx={{
                            fontFamily:
                              'Inter, sans-serif',

                            fontSize:
                              '0.75rem',

                            bgcolor:
                              'rgba(124,58,237,0.08)',

                            color:
                              '#7C3AED',

                            fontWeight: 600,

                            borderRadius:
                              '7px',
                          }}
                        />
                      ))}
                    </Stack>
                  )}

                </Box>

              </Stack>
            </Box>

            {/* =================================================
                VIDEO PREVIEW
            ================================================= */}

            {watchedUrl &&
              isYouTube(
                watchedUrl
              ) && (
                <Box
                  sx={{
                    bgcolor:
                      '#FFFFFF',

                    border:
                      '1px solid #E2E8F0',

                    borderRadius:
                      '16px',

                    p: {
                      xs: 2.5,
                      sm: 3,
                      md: 3.5,
                    },
                  }}
                >

                  <Stack
                    spacing={0.5}
                    sx={{
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily:
                          'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize:
                          '1rem',
                        color:
                          '#1E293B',
                      }}
                    >
                      Video Preview
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily:
                          'Inter, sans-serif',
                        fontSize:
                          '0.8rem',
                        color:
                          '#94A3B8',
                      }}
                    >
                      Preview the YouTube
                      video before saving.
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio:
                        '16 / 9',
                      maxHeight: 480,
                      bgcolor:
                        '#0F172A',
                      borderRadius:
                        '12px',
                      overflow:
                        'hidden',
                    }}
                  >
                    <Box
                      component="iframe"
                      src={toEmbed(
                        watchedUrl
                      )}
                      title="Video preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      sx={{
                        width: '100%',
                        height: '100%',
                        display:
                          'block',
                        border: 'none',
                      }}
                    />
                  </Box>

                </Box>
              )}

            {/* =================================================
                ACTIONS
            ================================================= */}

            <Stack
              direction={{
                xs: 'column-reverse',
                sm: 'row',
              }}
              spacing={1.5}
              justifyContent="flex-end"
              sx={{
                pt: 0.5,
              }}
            >

              <Button
                type="button"
                variant="outlined"
                onClick={() =>
                  navigate(
                    '/admin/gallery'
                  )
                }
                disabled={saving}
                sx={{
                  minWidth: 110,
                  height: 44,

                  fontFamily:
                    'Inter, sans-serif',

                  fontWeight: 600,

                  borderRadius:
                    '10px',

                  borderColor:
                    '#E2E8F0',

                  color:
                    '#64748B',

                  textTransform:
                    'none',

                  '&:hover': {
                    borderColor:
                      '#CBD5E1',

                    bgcolor:
                      '#F8FAFC',
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={
                  <FiSave size={15} />
                }
                disabled={saving}
                sx={{
                  minWidth: 145,
                  height: 44,

                  fontFamily:
                    'Inter, sans-serif',

                  fontWeight: 600,

                  borderRadius:
                    '10px',

                  bgcolor:
                    '#2563EB',

                  boxShadow:
                    'none',

                  textTransform:
                    'none',

                  '&:hover': {
                    bgcolor:
                      '#1D4ED8',

                    boxShadow:
                      'none',
                  },

                  '&.Mui-disabled': {
                    bgcolor:
                      '#93C5FD',

                    color:
                      '#FFFFFF',
                  },
                }}
              >
                {saving
                  ? 'Saving...'
                  : 'Save Video'}
              </Button>

            </Stack>

          </Stack>

        </form>

      </Box>
    </Box>
  )
}

export default AddVideo