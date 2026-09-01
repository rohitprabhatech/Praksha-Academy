import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiFileText,
  FiRefreshCw,
} from 'react-icons/fi'

import { getBlogById } from '../services/blogService'

// Editorial layout constants — hero/card sit in a wider column,
// the actual reading text stays narrower for comfortable long-form reading.
const PAGE_WIDTH = 960
const READING_WIDTH = 720

/**
 * Turns raw article text into lightweight content blocks so that
 * markdown-style "## Heading" / "### Heading" lines render as real
 * article headings, while every other line's text and spacing stays
 * exactly as written — no markdown library involved.
 */
function parseContentBlocks(content) {
  const lines = content.split('\n')
  const blocks = []
  let buffer = []

  const flushParagraph = () => {
    if (buffer.length > 0) {
      blocks.push({ type: 'paragraph', text: buffer.join('\n') })
      buffer = []
    }
  }

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{2,3})\s+(.*)/)
    if (headingMatch) {
      flushParagraph()
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2],
      })
    } else if (line.trim() === '') {
      flushParagraph()
    } else {
      buffer.push(line)
    }
  })

  flushParagraph()

  return blocks
}

function BlogDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBlog = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getBlogById(id)

      if (!data || data.status !== 'Published') {
        setPost(null)
        setError('Article not found.')
        return
      }

      setPost(data)
    } catch (err) {
      console.error('Failed to load blog article:', err)

      setPost(null)

      setError(
        err?.message ||
          'Unable to load this article. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          bgcolor: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack alignItems="center" spacing={1.5}>
          <CircularProgress size={32} sx={{ color: '#2563EB' }} />

          <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
            Loading article...
          </Typography>
        </Stack>
      </Box>
    )
  }

  // =========================================================
  // NOT FOUND / ERROR
  // =========================================================

  if (error || !post) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          bgcolor: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              p: { xs: 3, sm: 5 },
              textAlign: 'center',
              bgcolor: '#FFFFFF',
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2.5,
                borderRadius: '16px',
                bgcolor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiFileText size={28} color="#2563EB" />
            </Box>

            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#1E293B',
                mb: 1,
              }}
            >
              Article not found
            </Typography>

            <Typography
              sx={{
                color: '#64748B',
                lineHeight: 1.7,
                fontSize: '0.9rem',
                maxWidth: 420,
                mx: 'auto',
                mb: 3,
              }}
            >
              The article you're looking for doesn't exist, may have
              been deleted, or is not currently published.
            </Typography>

            {error && error !== 'Article not found.' && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: '10px',
                  textAlign: 'left',
                }}
              >
                {error}
              </Alert>
            )}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent="center"
            >
              <Button
                variant="outlined"
                startIcon={<FiArrowLeft size={15} />}
                onClick={() => navigate('/blog')}
                sx={{
                  textTransform: 'none',
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
                onClick={loadBlog}
                sx={{
                  textTransform: 'none',
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
          </Paper>
        </Container>
      </Box>
    )
  }

  const articleContent =
    post.content || post.excerpt || 'No article content available.'

  const contentBlocks = parseContentBlocks(articleContent)

  // Index of the first paragraph block — given a slightly more
  // prominent "lead" treatment, per editorial convention.
  const firstParagraphIndex = contentBlocks.findIndex(
    (b) => b.type === 'paragraph'
  )

  const tags = Array.isArray(post.tags) ? post.tags : []

  const articleDate = post.date || post.createdAt || '—'

  const readTime = post.readTime || '5 min'

  return (
    <Box
      sx={{
        bgcolor: '#F8FAFC',
        minHeight: '100vh',
        py: { xs: 3.5, md: 5 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft ambient glow behind the card — barely visible, just enough
          to lift the article off the flat page background */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -80, md: -120 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 480, md: 900 },
          height: { xs: 320, md: 480 },
          background:
            'radial-gradient(closest-side, rgba(37,99,235,0.07), rgba(37,99,235,0))',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          maxWidth: PAGE_WIDTH,
          mx: 'auto',
          px: { xs: 2.5, sm: 3 },
          position: 'relative',
        }}
      >
        {/* =====================================================
            BACK TO ARTICLES — subtle nav link, not a button
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          onClick={() => navigate('/blog')}
          sx={{
            width: 'fit-content',
            mb: { xs: 2.5, md: 3 },
            cursor: 'pointer',
            color: '#64748B',
            fontSize: '0.875rem',
            fontWeight: 600,
            '&:hover .back-icon-badge': {
              bgcolor: '#2563EB',
              borderColor: '#2563EB',
              color: '#FFFFFF',
            },
            '&:hover .back-label': { color: '#2563EB' },
          }}
        >
          <Box
            className="back-icon-badge"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition:
                'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
            }}
          >
            <FiArrowLeft size={13} />
          </Box>
          <Typography
            component="span"
            className="back-label"
            sx={{
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'inherit',
              transition: 'color 0.15s ease',
            }}
          >
            Back to articles
          </Typography>
        </Stack>

        {/* =====================================================
            ARTICLE CARD — hero + header sit together, visually
            connected; a single subtle divider separates the
            header from the reading area, and another separates
            the reading area from tags.
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
            boxShadow:
              '0 1px 2px rgba(15,23,42,0.04), 0 32px 64px -28px rgba(15,23,42,0.16)',
          }}
        >
          {/* Thin brand accent bar — a small premium signature touch
              that separates the card from the page without any extra text */}
          <Box
            sx={{
              height: 4,
              background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)',
            }}
          />

          {/* HERO IMAGE — editorial aspect ratio, top corners only */}

          {post.thumbnail ? (
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16 / 7',
                bgcolor: '#F1F5F9',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={post.thumbnail}
                alt={post.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Soft fade at the base of the hero so it eases into the
                  white header below instead of ending abruptly */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '30%',
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                aspectRatio: { xs: '16 / 9', sm: '16 / 7' },
                background:
                  'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 55%, #E0ECFF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '14px',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #DBEAFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.08)',
                }}
              >
                <FiFileText size={24} color="#2563EB" />
              </Box>
            </Box>
          )}

          {/* =================================================
              ARTICLE HEADER — meta, title, author
          ================================================= */}

          <Box
            sx={{
              px: { xs: 2.5, sm: 4, md: 5 },
              pt: { xs: 3, md: 3.5 },
            }}
          >
            {/* META ROW */}

            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              sx={{ gap: 1.25, mb: 1.75 }}
            >
              <Chip
                label={post.category || 'General'}
                size="small"
                sx={{
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  height: 24,
                }}
              />

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ color: '#64748B', fontSize: '0.8rem' }}
              >
                <FiCalendar size={13} />
                <span>{articleDate}</span>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ color: '#64748B', fontSize: '0.8rem' }}
              >
                <FiClock size={13} />
                <span>{readTime} read</span>
              </Stack>
            </Stack>

            {/* TITLE — the visual focus of the page */}

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.125rem', sm: '2.75rem', md: '3.375rem' },
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                fontWeight: 800,
                color: '#172554',
                maxWidth: READING_WIDTH + 60,
                mb: 2,
              }}
            >
              {post.title}
            </Typography>

            {/* AUTHOR — subtle, compact, never a card */}

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: { xs: 3.5, md: 4 } }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  bgcolor: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {(post.author || 'Praksha Academy').trim().charAt(0).toUpperCase()}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: '#334155',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                }}
              >
                By {post.author || 'Praksha Academy'}
              </Typography>
            </Stack>
          </Box>

          {/* Header → reading area break. A line that fades at both
              edges reads as more considered than a hard-edged rule,
              and the generous space around it is what creates the
              actual sense of division. */}
          <Box sx={{ px: { xs: 2.5, sm: 4, md: 5 } }}>
            <Box
              sx={{
                height: '1px',
                background:
                  'linear-gradient(to right, rgba(226,232,240,0) 0%, rgba(226,232,240,1) 15%, rgba(226,232,240,1) 85%, rgba(226,232,240,0) 100%)',
              }}
            />
          </Box>

          {/* =================================================
              READING AREA — clearly its own section: dedicated
              vertical rhythm, narrower text column
          ================================================= */}

          <Box
            sx={{
              px: { xs: 2.5, sm: 4, md: 5 },
              pt: { xs: 5, md: 6.5 },
              pb: { xs: 3, md: 3.5 },
            }}
          >
            <Box
              sx={{
                maxWidth: READING_WIDTH,
                mx: 'auto',
                color: '#334155',
                fontSize: { xs: '1rem', md: '1.0625rem' },
                lineHeight: 1.85,
              }}
            >
              {contentBlocks.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <Typography
                      key={idx}
                      component={block.level === 2 ? 'h2' : 'h3'}
                      sx={{
                        fontWeight: 750,
                        color: '#172554',
                        fontSize: block.level === 2 ? '1.75rem' : '1.4rem',
                        lineHeight: 1.3,
                        mt: idx === 0 ? 0 : { xs: 4.5, md: 5 },
                        mb: 2,
                      }}
                    >
                      {block.text}
                    </Typography>
                  )
                }

                const isLead = idx === firstParagraphIndex

                if (isLead) {
                  return (
                    <Typography
                      key={idx}
                      component="p"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        fontSize: '1.15rem',
                        lineHeight: 1.75,
                        color: '#1E293B',
                        fontWeight: 500,
                        pl: 2.25,
                        borderLeft: '3px solid #DBEAFE',
                        mb:
                          idx === contentBlocks.length - 1
                            ? 0
                            : { xs: 3.5, md: 4 },
                      }}
                    >
                      {block.text}
                    </Typography>
                  )
                }

                return (
                  <Typography
                    key={idx}
                    component="p"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      mb:
                        idx === contentBlocks.length - 1
                          ? 0
                          : { xs: 2.75, md: 3.25 },
                    }}
                  >
                    {block.text}
                  </Typography>
                )
              })}
            </Box>
          </Box>

          {/* End-of-article marker — a short centered accent bar reads
              more clearly as "you've finished reading" than a plain
              full-width line, without being decorative or loud. */}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: { xs: tags.length > 0 ? 2.5 : 3.5, md: tags.length > 0 ? 3 : 4 },
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 3,
                borderRadius: 4,
                bgcolor: '#2563EB',
                opacity: 0.28,
              }}
            />
          </Box>

          {/* =================================================
              TAGS — clear "article finished" section
          ================================================= */}

          {tags.length > 0 && (
            <>
              <Divider sx={{ borderColor: '#E2E8F0' }} />

              <Box
                sx={{
                  px: { xs: 2.5, sm: 4, md: 5 },
                  pt: { xs: 2.5, md: 3 },
                  pb: { xs: 3, md: 3.5 },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  sx={{ gap: 0.75 }}
                >
                  <Typography
                    sx={{
                      color: '#475569',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      mr: 0.5,
                    }}
                  >
                    Tags
                  </Typography>

                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      size="small"
                      sx={{
                        bgcolor: 'transparent',
                        border: '1px solid #E2E8F0',
                        color: '#64748B',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        borderRadius: '6px',
                        height: 24,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default BlogDetail