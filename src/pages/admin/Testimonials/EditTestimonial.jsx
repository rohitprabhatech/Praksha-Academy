import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'

import AddTestimonial from './AddTestimonial'

import {
  getTestimonialById,
} from '../../../services/testimonialService'

import ErrorState from '../../../components/admin/common/ErrorState'

const EditTestimonial = () => {
  const { id } = useParams()

  const [testimonial, setTestimonial] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  const loadTestimonial = async () => {
    try {
      setLoading(true)
      setError(null)

      const data =
        await getTestimonialById(id)

      if (!data) {
        throw new Error(
          'Testimonial not found.'
        )
      }

      setTestimonial(data)
    } catch (err) {
      console.error(
        'Failed to load testimonial:',
        err
      )

      setError(
        err.message ||
          'Unable to load testimonial.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonial()
  }, [id])

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack
          alignItems="center"
          spacing={2}
        >
          <CircularProgress
            size={32}
            sx={{
              color: '#2563EB',
            }}
          />

          <Typography
            sx={{
              fontFamily:
                'Inter, sans-serif',
              fontSize: '0.875rem',
              color: '#64748B',
            }}
          >
            Loading testimonial...
          </Typography>
        </Stack>
      </Box>
    )
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <ErrorState
        title="Unable to load testimonial"
        message={error}
        onRetry={loadTestimonial}
      />
    )
  }

  // =========================================================
  // FORM
  // =========================================================

  return (
    <AddTestimonial
      prefill={testimonial}
      editMode
    />
  )
}

export default EditTestimonial