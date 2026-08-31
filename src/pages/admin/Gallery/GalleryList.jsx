import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Stack,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material'
import {
  FiTrash2,
  FiImage,
  FiVideo,
  FiPlay,
  FiRefreshCw,
} from 'react-icons/fi'
import { toast } from 'react-toastify'

import PageHeader from '../../../components/admin/common/PageHeader'
import AdminModal from '../../../components/admin/common/AdminModal'
import EmptyState from '../../../components/admin/common/EmptyState'
import ErrorState from '../../../components/admin/common/ErrorState'

import {
  getGalleryItems,
  deleteGalleryItem,
} from '../../../services/galleryService'

const PLACEHOLDER_BG = [
  'rgba(37,99,235,0.08)',
  'rgba(245,158,11,0.08)',
  'rgba(34,197,94,0.08)',
  'rgba(139,92,246,0.08)',
]

const PLACEHOLDER_COLOR = [
  '#2563EB',
  '#D97706',
  '#16A34A',
  '#7C3AED',
]

// =========================================================
// GALLERY ITEM
// =========================================================

const GalleryItem = ({
  item,
  idx,
  onDelete,
}) => {
  const bg =
    PLACEHOLDER_BG[idx % 4]

  const color =
    PLACEHOLDER_COLOR[idx % 4]

  const [imageError, setImageError] =
    useState(false)

  const hasImage =
    item.type === 'image' &&
    Boolean(item.url) &&
    !imageError

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        overflow: 'hidden',

        transition:
          'box-shadow 0.2s ease, transform 0.2s ease',

        '&:hover': {
          boxShadow:
            '0 12px 28px rgba(15,23,42,0.1)',
          transform: 'translateY(-3px)',
        },

        '&:hover .gallery-overlay': {
          opacity: 1,
        },
      }}
    >
      {/* =====================================================
          THUMBNAIL
      ===================================================== */}

      <Box
        sx={{
          height: 160,
          bgcolor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ---------------------------------------------------
            ACTUAL IMAGE
        --------------------------------------------------- */}

        {hasImage ? (
          <Box
            component="img"
            src={item.url}
            alt={
              item.altText ||
              item.title ||
              'Gallery image'
            }
            loading="lazy"
            onError={() =>
              setImageError(true)
            }
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : item.type === 'video' ? (
          /* -------------------------------------------------
             VIDEO PLACEHOLDER
          ------------------------------------------------- */

          <Box
            sx={{
              display: 'flex',
              flexDirection:
                'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'center',
              }}
            >
              <FiPlay
                size={18}
                color="#fff"
              />
            </Box>

            <Typography
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontSize:
                  '0.75rem',
                color,
                fontWeight: 600,
              }}
            >
              Video
            </Typography>
          </Box>
        ) : (
          /* -------------------------------------------------
             IMAGE PLACEHOLDER
          ------------------------------------------------- */

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:
                'center',
            }}
          >
            <FiImage
              size={38}
              color={color}
              opacity={0.5}
            />
          </Box>
        )}

        {/* =================================================
            DELETE OVERLAY
        ================================================= */}

        <Box
          className="gallery-overlay"
          sx={{
            position: 'absolute',
            inset: 0,

            bgcolor:
              'rgba(15,23,42,0.45)',

            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'center',

            opacity: 0,

            transition:
              'opacity 0.2s ease',
          }}
        >
          <IconButton
            onClick={() =>
              onDelete(item)
            }
            aria-label={`Delete ${item.title}`}
            sx={{
              bgcolor:
                'rgba(239,68,68,0.92)',

              color: '#fff',

              width: 40,
              height: 40,

              '&:hover': {
                bgcolor:
                  '#EF4444',
              },
            }}
          >
            <FiTrash2 size={16} />
          </IconButton>
        </Box>
      </Box>

      {/* =====================================================
          DETAILS
      ===================================================== */}

      <Box
        sx={{
          p: 1.75,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              'Inter, sans-serif',
            fontWeight: 600,
            fontSize:
              '0.875rem',
            color: '#1E293B',
            mb: 0.75,

            overflow: 'hidden',
            textOverflow:
              'ellipsis',
            whiteSpace:
              'nowrap',
          }}
        >
          {item.title}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          gap={0.5}
          alignItems="center"
        >
          <Chip
            label={
              item.type ===
              'image'
                ? 'Image'
                : 'Video'
            }
            size="small"
            sx={{
              bgcolor:
                item.type ===
                'image'
                  ? 'rgba(37,99,235,0.08)'
                  : 'rgba(139,92,246,0.08)',

              color:
                item.type ===
                'image'
                  ? '#2563EB'
                  : '#7C3AED',

              fontFamily:
                'Inter, sans-serif',

              fontWeight: 600,

              fontSize:
                '0.7rem',

              height: 20,
            }}
          />

          <Typography
            sx={{
              fontFamily:
                'Inter, sans-serif',
              fontSize:
                '0.7rem',
              color: '#94A3B8',
              ml: 'auto',
            }}
          >
            {item.date || '—'}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

// =========================================================
// GALLERY LIST
// =========================================================

const GalleryList = () => {
  const navigate = useNavigate()

  const [tab, setTab] = useState(0)

  const [items, setItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [deleteTarget, setDeleteTarget] =
    useState(null)

  const [deleting, setDeleting] =
    useState(false)

  // =======================================================
  // LOAD GALLERY
  // =======================================================

  const loadGallery = async () => {
    try {
      setLoading(true)
      setError('')

      const data =
        await getGalleryItems()

      setItems(
        Array.isArray(data)
          ? data
          : []
      )
    } catch (err) {
      console.error(
        'Failed to load gallery:',
        err
      )

      setError(
        err.message ||
          'Unable to load gallery. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGallery()
  }, [])

  // =======================================================
  // COUNTS
  // =======================================================

  const imageCount =
    items.filter(
      (item) =>
        item.type === 'image'
    ).length

  const videoCount =
    items.filter(
      (item) =>
        item.type === 'video'
    ).length

  // =======================================================
  // FILTER
  // =======================================================

  const filtered =
    tab === 0
      ? items
      : tab === 1
        ? items.filter(
            (item) =>
              item.type ===
              'image'
          )
        : items.filter(
            (item) =>
              item.type ===
              'video'
          )

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return
    }

    try {
      setDeleting(true)

      await deleteGalleryItem(
        deleteTarget.id
      )

      setItems(
        (previous) =>
          previous.filter(
            (item) =>
              String(item.id) !==
              String(
                deleteTarget.id
              )
          )
      )

      toast.success(
        'Item deleted from gallery.'
      )

      setDeleteTarget(null)
    } catch (err) {
      console.error(
        'Failed to delete gallery item:',
        err
      )

      toast.error(
        err.message ||
          'Unable to delete gallery item.'
      )
    } finally {
      setDeleting(false)
    }
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <Box>
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <PageHeader
        title="Gallery"
        subtitle="Manage images and videos displayed on the website."
        breadcrumbs={[
          {
            label: 'Admin',
          },
          {
            label: 'Gallery',
          },
        ]}
        action={
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1.5}
          >
            <Button
              variant="outlined"
              startIcon={
                <FiImage
                  size={15}
                />
              }
              onClick={() =>
                navigate(
                  '/admin/gallery/add-image'
                )
              }
              disabled={loading}
              sx={{
                fontFamily:
                  'Inter, sans-serif',

                fontWeight: 600,

                borderRadius:
                  '10px',

                borderColor:
                  '#2563EB',

                color:
                  '#2563EB',

                textTransform:
                  'none',

                '&:hover': {
                  bgcolor:
                    'rgba(37,99,235,0.06)',
                },
              }}
            >
              Add Image
            </Button>

            <Button
              variant="contained"
              startIcon={
                <FiVideo
                  size={15}
                />
              }
              onClick={() =>
                navigate(
                  '/admin/gallery/add-video'
                )
              }
              disabled={loading}
              sx={{
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
              }}
            >
              Add Video
            </Button>
          </Stack>
        }
      />

      {/* ===================================================
          ERROR STATE
      =================================================== */}

      {error && !loading ? (
        <ErrorState
          title="Unable to load gallery"
          message={error}
          action={
            <Button
              variant="contained"
              startIcon={
                <FiRefreshCw
                  size={15}
                />
              }
              onClick={
                loadGallery
              }
              sx={{
                textTransform:
                  'none',

                borderRadius:
                  '10px',

                bgcolor:
                  '#2563EB',

                boxShadow:
                  'none',

                fontWeight: 600,

                '&:hover': {
                  bgcolor:
                    '#1D4ED8',

                  boxShadow:
                    'none',
                },
              }}
            >
              Try Again
            </Button>
          }
        />
      ) : (
        <>
          {/* ===============================================
              FILTER TABS
          =============================================== */}

          <Box
            sx={{
              bgcolor:
                '#FFFFFF',

              border:
                '1px solid #E2E8F0',

              borderRadius:
                '16px',

              mb: 3,

              overflow:
                'hidden',
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, value) =>
                setTab(value)
              }
              sx={{
                px: 2,

                '& .MuiTab-root': {
                  fontFamily:
                    'Inter, sans-serif',

                  fontWeight: 600,

                  fontSize:
                    '0.875rem',

                  textTransform:
                    'none',

                  color:
                    '#64748B',

                  minHeight:
                    52,
                },

                '& .Mui-selected': {
                  color:
                    '#2563EB',
                },

                '& .MuiTabs-indicator': {
                  bgcolor:
                    '#2563EB',

                  height: 3,

                  borderRadius:
                    '3px 3px 0 0',
                },
              }}
            >
              <Tab
                label={`All (${items.length})`}
              />

              <Tab
                label={`Images (${imageCount})`}
              />

              <Tab
                label={`Videos (${videoCount})`}
              />
            </Tabs>
          </Box>

          {/* ===============================================
              LOADING
          =============================================== */}

          {loading ? (
            <Box
              sx={{
                minHeight: 360,

                display: 'flex',

                alignItems:
                  'center',

                justifyContent:
                  'center',
              }}
            >
              <Stack
                spacing={1.5}
                alignItems="center"
              >
                <CircularProgress
                  size={32}
                  thickness={4}
                />

                <Typography
                  sx={{
                    color:
                      '#64748B',

                    fontFamily:
                      'Inter, sans-serif',

                    fontSize:
                      '0.875rem',
                  }}
                >
                  Loading gallery...
                </Typography>
              </Stack>
            </Box>
          ) : filtered.length ===
            0 ? (
            /* =============================================
                EMPTY STATE
            ============================================= */

            <EmptyState
              title="No gallery items found"
              description={
                tab === 1
                  ? 'There are no images in the gallery yet.'
                  : tab === 2
                    ? 'There are no videos in the gallery yet.'
                    : 'Your gallery is empty. Add an image or video to get started.'
              }
              action={
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
                      <FiImage
                        size={15}
                      />
                    }
                    onClick={() =>
                      navigate(
                        '/admin/gallery/add-image'
                      )
                    }
                    sx={{
                      textTransform:
                        'none',

                      borderRadius:
                        '10px',

                      fontWeight:
                        600,
                    }}
                  >
                    Add Image
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={
                      <FiVideo
                        size={15}
                      />
                    }
                    onClick={() =>
                      navigate(
                        '/admin/gallery/add-video'
                      )
                    }
                    sx={{
                      textTransform:
                        'none',

                      borderRadius:
                        '10px',

                      fontWeight:
                        600,

                      bgcolor:
                        '#2563EB',

                      boxShadow:
                        'none',

                      '&:hover': {
                        bgcolor:
                          '#1D4ED8',

                        boxShadow:
                          'none',
                      },
                    }}
                  >
                    Add Video
                  </Button>
                </Stack>
              }
            />
          ) : (
            /* =============================================
                GALLERY GRID
            ============================================= */

            <div className="row g-3">
              {filtered.map(
                (item, index) => (
                  <div
                    key={item.id}
                    className="col-12 col-sm-6 col-md-4 col-xl-3"
                  >
                    <GalleryItem
                      item={item}
                      idx={index}
                      onDelete={
                        setDeleteTarget
                      }
                    />
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      <AdminModal
        open={!!deleteTarget}
        onClose={() =>
          !deleting &&
          setDeleteTarget(null)
        }
        onConfirm={
          handleDelete
        }
        title="Remove from Gallery"
        message={`Delete "${deleteTarget?.title}" permanently? This cannot be undone.`}
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

export default GalleryList