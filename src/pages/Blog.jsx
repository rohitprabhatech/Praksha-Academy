import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  FiArrowRight,
  FiBookOpen,
  FiFilter,
  FiRefreshCw,
  FiSearch,
} from 'react-icons/fi'

import { getBlogs } from '../services/blogService'

/* ------------------------------------------------------------------ */
/*  Design tokens — one color system, one type system, used everywhere */
/* ------------------------------------------------------------------ */
const color = {
  heading: '#172554', // headings
  body: '#475569', // body copy
  muted: '#64748B', // secondary/meta text
  faint: '#94A3B8', // placeholders, disabled
  accent: '#2563EB', // links, active states, CTAs
  accentDark: '#1D4ED8', // hover
  accentDeep: '#1E3A8A', // hero gradient stop
  page: '#F8FAFC', // page background
  surface: '#FFFFFF', // card/section surfaces
  border: '#E2E8F0', // hairline dividers/borders
  numberMuted: '#5B8DEF', // decorative rank numerals (sidebar)
}

const font =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

/* ------------------------------------------------------------------ */
/*  Small shared pieces                                               */
/* ------------------------------------------------------------------ */

// Small uppercase label used above structural sections (not content headings).
function Eyebrow({ children, color: c = color.accent, sx = {} }) {
  return (
    <Typography
      sx={{
        fontFamily: font,
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: c,
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

function Dot() {
  return (
    <Box
      component="span"
      sx={{
        width: 3,
        height: 3,
        borderRadius: '50%',
        backgroundColor: color.faint,
        display: 'inline-block',
      }}
    />
  )
}

function MetaRow({ post, size = '0.8rem' }) {
  const date = post.date || post.createdAt
  const read = post.readTime || '5 min'
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      flexWrap="wrap"
      sx={{ fontFamily: font, fontSize: size, color: color.muted }}
    >
      {post.category && (
        <>
          <Box
            component="span"
            sx={{ color: color.accent, fontWeight: 700, letterSpacing: '0.04em' }}
          >
            {post.category.toUpperCase()}
          </Box>
          <Dot />
        </>
      )}
      <span>{date || 'Undated'}</span>
      <Dot />
      <span>{read} read</span>
    </Stack>
  )
}

// Consistent fallback so posts without a thumbnail never look broken.
function ThumbFallback({ height, radius = 2 }) {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${color.accentDeep} 0%, ${color.accent} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FiBookOpen size={24} color="#2563EB" />
    </Box>
  )
}

/* ------------------------------------------------------------------ */

function Blog() {
  const navigate = useNavigate()

  const [blogPosts, setBlogPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const loadBlogs = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getBlogs()

      // Public website should only show published posts.
      const publishedPosts = (Array.isArray(data) ? data : []).filter(
        (post) => post.status === 'Published'
      )

      setBlogPosts(publishedPosts)
    } catch (err) {
      console.error('Failed to load public blogs:', err)
      setError(
        err?.message || 'Unable to load articles. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categories = useMemo(
    () => [
      'All',
      ...new Set(blogPosts.map((post) => post.category).filter(Boolean)),
    ],
    [blogPosts]
  )

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const tags = Array.isArray(post.tags) ? post.tags : []

      const matchesSearch =
        !normalizedSearch ||
        post.title?.toLowerCase().includes(normalizedSearch) ||
        post.excerpt?.toLowerCase().includes(normalizedSearch) ||
        post.author?.toLowerCase().includes(normalizedSearch) ||
        tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))

      return matchesCategory && matchesSearch
    })
  }, [blogPosts, searchTerm, selectedCategory])

  const [featured, ...rest] = filteredPosts
  const popularReads = blogPosts.slice(0, 3)

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      backgroundColor: color.surface,
      fontFamily: font,
      '& fieldset': { borderColor: color.border },
      '&:hover fieldset': { borderColor: color.accent },
      '&.Mui-focused fieldset': { borderColor: color.accent },
    },
  }

  return (
    <Box sx={{ backgroundColor: color.page, minHeight: '100vh' }}>
      {/* ============================================================ */}
      {/* 1. HERO — simplified, subtle gradient, guaranteed white text  */}
      {/* ============================================================ */}
      <Box
        sx={{
          background: `linear-gradient(120deg, ${color.accentDeep} 0%, ${color.accent} 100%)`,
          py: { xs: 6, md: 0 },
          minHeight: { md: 280 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: '1160px !important' }}>
          <Typography
            sx={{
              fontFamily: font,
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              opacity: 0.85,
              mb: 2,
            }}
          >
            Praksha Academy · Blog
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: font,
              fontWeight: 800,
              fontSize: { xs: '2.1rem', md: '2.85rem' },
              lineHeight: 1.15,
              color: '#FFFFFF',
              mb: 2,
            }}
          >
            Learning explained
            <br />
            a little better.
          </Typography>

          <Typography
            sx={{
              fontFamily: font,
              color: 'rgba(255,255,255,0.88)',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            Guides and lessons on programming, spoken English, exam
            strategy, and the study habits that actually work.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ maxWidth: '1160px !important', pb: { xs: 8, md: 9 } }}>
        {/* ============================================================ */}
        {/* 2. ARTICLE DISCOVERY                                          */}
        {/* ============================================================ */}
        <Box sx={{ mt: { xs: 5, md: 6 } }}>
          <Eyebrow sx={{ mb: 1.5 }}>Article discovery</Eyebrow>

          <Box
            sx={{
              backgroundColor: color.surface,
              border: `1px solid ${color.border}`,
              borderRadius: '14px',
              boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
              p: { xs: 2, md: 2 },
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                fullWidth
                placeholder="Search articles, topics or authors"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <FiSearch color={color.faint} style={{ marginRight: 10 }} />
                  ),
                }}
                sx={fieldSx}
              />
              <TextField
                select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <FiFilter color={color.faint} style={{ marginRight: 10 }} />
                  ),
                }}
                sx={{ ...fieldSx, minWidth: { xs: '100%', sm: 200 } }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'All' ? 'All categories' : category}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>
        </Box>

        {/* ============================================================ */}
        {/* Loading                                                       */}
        {/* ============================================================ */}
        {loading && (
          <Box sx={{ mt: { xs: 5, md: 6 } }}>
            <Skeleton
              variant="rectangular"
              height={320}
              sx={{ borderRadius: '18px', mb: 6 }}
            />
            <Stack spacing={4}>
              {[0, 1, 2].map((i) => (
                <Stack key={i} direction="row" spacing={3}>
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={130}
                    sx={{ borderRadius: '10px', flexShrink: 0 }}
                  />
                  <Stack spacing={1.2} sx={{ flex: 1, pt: 0.5 }}>
                    <Skeleton width="30%" height={16} />
                    <Skeleton width="85%" height={26} />
                    <Skeleton width="95%" height={16} />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Error */}
        {!loading && error && (
          <Box sx={{ mt: { xs: 5, md: 6 } }}>
            <Alert
              severity="error"
              sx={{
                borderRadius: '10px',
                border: `1px solid ${color.border}`,
                alignItems: 'center',
              }}
              action={
                <Button
                  size="small"
                  startIcon={<FiRefreshCw size={14} />}
                  onClick={loadBlogs}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* ============================================================ */}
        {/* 3. FEATURED ARTICLE                                          */}
        {/* ============================================================ */}
        {!loading && !error && featured && (
          <Box sx={{ mt: { xs: 5, md: 6 } }}>
            <Eyebrow sx={{ mb: 1.5 }}>Featured article</Eyebrow>

            <Box
              onClick={() => navigate(`/blog/${featured.id}`)}
              sx={{
                cursor: 'pointer',
                backgroundColor: color.surface,
                border: `1px solid ${color.border}`,
                borderRadius: '18px',
                boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
                overflow: 'hidden',
              }}
            >
              {featured.thumbnail ? (
                <Box
                  component="img"
                  src={featured.thumbnail}
                  alt={featured.title}
                  sx={{
                    width: '100%',
                    aspectRatio: '16 / 6.3',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <Box sx={{ aspectRatio: '16 / 6.3' }}>
                  <ThumbFallback height="100%" radius={0} />
                </Box>
              )}

              <Box sx={{ p: { xs: 3, md: 4.5 } }}>
                <MetaRow post={featured} size="0.82rem" />

                <Typography
                  sx={{
                    fontFamily: font,
                    fontWeight: 800,
                    fontSize: { xs: '1.6rem', md: '2.35rem' },
                    lineHeight: 1.18,
                    color: color.heading,
                    mt: 1.5,
                    mb: 1.5,
                  }}
                >
                  {featured.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: font,
                    color: color.body,
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    mb: 3,
                    maxWidth: 720,
                  }}
                >
                  {featured.excerpt ||
                    featured.content ||
                    'Read this article to learn more.'}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  rowGap={1.5}
                >
                  <Typography
                    sx={{
                      fontFamily: font,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: color.heading,
                    }}
                  >
                    {featured.author || 'Praksha Academy'}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.7}
                    sx={{
                      fontFamily: font,
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      color: color.accent,
                    }}
                  >
                    <span>Read article</span>
                    <FiArrowRight size={15} />
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        )}

        {/* ============================================================ */}
        {/* 4 & 5. CONTENT + SIDEBAR                                     */}
        {/* ============================================================ */}
        {!loading && !error && (
          <Box
            sx={{
              mt: { xs: 7, md: 8 },
              pt: { xs: 6, md: 7 },
              borderTop: `1px solid ${color.border}`,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 280px' },
              gap: { xs: 5, md: 7 },
              alignItems: 'start',
            }}
          >
            {/* -------------------------------------------------- */}
            {/* Latest articles                                     */}
            {/* -------------------------------------------------- */}
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontFamily: font,
                  fontWeight: 800,
                  fontSize: '1.45rem',
                  color: color.heading,
                  mb: 0.75,
                }}
              >
                Latest articles
              </Typography>
              <Typography
                sx={{
                  fontFamily: font,
                  color: color.muted,
                  fontSize: '0.92rem',
                  mb: 3,
                }}
              >
                Fresh guides, ideas, and learning resources.
              </Typography>

              <Box
                sx={{
                  width: 42,
                  height: 2,
                  backgroundColor: color.accent,
                  borderRadius: 99,
                  mb: 1,
                }}
              />

              {rest.length > 0 && (
                <Stack spacing={0}>
                  {rest.map((post, idx) => (
                    <Box key={post.id}>
                      <Box
                        onClick={() => navigate(`/blog/${post.id}`)}
                        sx={{
                          cursor: 'pointer',
                          py: { xs: 3, md: 3.25 },
                          display: 'flex',
                          gap: { xs: 2, sm: 3 },
                          flexDirection: { xs: 'column', sm: 'row' },
                          '&:hover .article-title': { color: color.accent },
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: '100%', sm: 190 },
                            height: { xs: 145, sm: 118 },
                            flexShrink: 0,
                          }}
                        >
                          {post.thumbnail ? (
                            <Box
                              component="img"
                              src={post.thumbnail}
                              alt={post.title}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                display: 'block',
                                transition: 'transform 180ms ease',
                              }}
                            />
                          ) : (
                            <ThumbFallback height="100%" radius="10px" />
                          )}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack spacing={0.8}>
                            <MetaRow post={post} />

                            <Typography
                              className="article-title"
                              sx={{
                                fontFamily: font,
                                fontWeight: 700,
                                fontSize: { xs: '1.2rem', md: '1.4rem' },
                                lineHeight: 1.3,
                                color: color.heading,
                                transition: 'color 0.15s ease',
                              }}
                            >
                              {post.title}
                            </Typography>

                            <Typography
                              sx={{
                                fontFamily: font,
                                color: color.body,
                                fontSize: '0.94rem',
                                lineHeight: 1.65,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {post.excerpt || post.content}
                            </Typography>

                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.7}
                              sx={{ pt: 0.4 }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: font,
                                  fontWeight: 600,
                                  fontSize: '0.82rem',
                                  color: color.muted,
                                }}
                              >
                                {post.author || 'Praksha Academy'}
                              </Typography>
                              <Box
                                component="span"
                                sx={{
                                  fontFamily: font,
                                  fontWeight: 700,
                                  fontSize: '0.82rem',
                                  color: color.accent,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 0.4,
                                }}
                              >
                                · Read article <FiArrowRight size={12} />
                              </Box>
                            </Stack>
                          </Stack>
                        </Box>
                      </Box>
                      {idx < rest.length - 1 && (
                        <Divider sx={{ borderColor: color.border }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Empty */}
              {filteredPosts.length === 0 && (
                <Box
                  sx={{
                    backgroundColor: color.surface,
                    border: `1px solid ${color.border}`,
                    borderRadius: '14px',
                    p: { xs: 4, md: 6 },
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: font,
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: color.heading,
                      mb: 1,
                    }}
                  >
                    No articles found
                  </Typography>
                  <Typography sx={{ fontFamily: font, color: color.muted }}>
                    {blogPosts.length === 0
                      ? 'No articles have been published yet — check back soon.'
                      : 'Try a different keyword or category.'}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* -------------------------------------------------- */}
            {/* Sidebar                                             */}
            {/* -------------------------------------------------- */}
            <Box
              sx={{
                position: { md: 'sticky' },
                top: { md: 24 },
                alignSelf: 'flex-start',
              }}
            >
              <Stack spacing={4}>
                {/* Trending topics */}
                <Box>
                  <Eyebrow sx={{ mb: 1.75 }}>Trending topics</Eyebrow>
                  <Stack spacing={0}>
                    {categories
                      .filter((category) => category !== 'All')
                      .map((category, i, arr) => (
                        <Box key={category}>
                          <Box
                            onClick={() => setSelectedCategory(category)}
                            sx={{
                              py: 1.3,
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontFamily: font,
                              fontSize: '0.92rem',
                              fontWeight: 500,
                              color:
                                selectedCategory === category
                                  ? color.accent
                                  : color.heading,
                              '&:hover': { color: color.accent },
                              transition: 'color 0.15s ease',
                            }}
                          >
                            <span>{category}</span>
                            <FiArrowRight size={13} color={color.faint} />
                          </Box>
                          {i < arr.length - 1 && (
                            <Divider sx={{ borderColor: color.border }} />
                          )}
                        </Box>
                      ))}
                    {categories.length <= 1 && (
                      <Typography
                        sx={{ fontFamily: font, color: color.faint, fontSize: '0.88rem' }}
                      >
                        No topics available yet.
                      </Typography>
                    )}
                  </Stack>
                </Box>

                {/* Popular reads */}
                {popularReads.length > 0 && (
                  <>
                    <Divider sx={{ borderColor: color.border }} />
                    <Box>
                      <Eyebrow sx={{ mb: 1.75 }}>Popular reads</Eyebrow>
                      <Stack spacing={2.2}>
                        {popularReads.map((post, i) => (
                          <Stack
                            key={post.id}
                            direction="row"
                            spacing={1.5}
                            onClick={() => navigate(`/blog/${post.id}`)}
                            sx={{
                              cursor: 'pointer',
                              '&:hover .rank-title': { color: color.accent },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: font,
                                fontWeight: 800,
                                fontSize: '1.05rem',
                                color: color.numberMuted,
                                lineHeight: 1.5,
                                minWidth: 22,
                              }}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </Typography>
                            <Stack spacing={0.3}>
                              <Typography
                                className="rank-title"
                                sx={{
                                  fontFamily: font,
                                  fontWeight: 600,
                                  fontSize: '0.9rem',
                                  lineHeight: 1.4,
                                  color: color.heading,
                                  transition: 'color 0.15s ease',
                                }}
                              >
                                {post.title}
                              </Typography>
                              <Typography
                                sx={{ fontFamily: font, color: color.faint, fontSize: '0.76rem' }}
                              >
                                {post.date || post.createdAt || 'Undated'}
                              </Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                  </>
                )}

                {/* Newsletter — the one CTA surface allowed to carry color */}
                <Box
                  sx={{
                    background: `linear-gradient(145deg, ${color.accentDeep} 0%, ${color.accent} 100%)`,
                    borderRadius: '16px',
                    p: { xs: 3, md: 3.25 },
                    boxShadow: '0 12px 28px rgba(37,99,235,0.16)',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: 110,
                      height: 110,
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.12)',
                      right: -45,
                      top: -45,
                    },
                  }}
                >
                  <Stack spacing={1.5} sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: font,
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        color: '#FFFFFF',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      Join the newsletter
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily: font,
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.6,
                        fontSize: '0.86rem',
                      }}
                    >
                      Get new blog posts, learning tips, and program
                      updates.
                    </Typography>

                    {subscribed ? (
                      <Typography
                        sx={{
                          fontFamily: font,
                          color: '#FFFFFF',
                          fontSize: '0.86rem',
                          fontWeight: 700,
                        }}
                      >
                        You're on the list — thank you.
                      </Typography>
                    ) : (
                      <Stack
                        component="form"
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (email.trim()) setSubscribed(true)
                        }}
                      >
                        <TextField
                          required
                          type="email"
                          size="small"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          sx={{
                            mb: 1.5,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#FFFFFF',
                              fontFamily: font,
                              '& fieldset': { borderColor: 'transparent' },
                            },
                          }}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          endIcon={<FiArrowRight />}
                          sx={{
                            backgroundColor: '#FFFFFF',
                            color: color.accent,
                            fontFamily: font,
                            fontWeight: 700,
                            textTransform: 'none',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: '#F1F5F9',
                              boxShadow: 'none',
                            },
                          }}
                        >
                          Subscribe
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Blog