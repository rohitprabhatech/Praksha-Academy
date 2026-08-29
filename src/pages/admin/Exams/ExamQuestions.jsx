import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material'
import {
  FiArrowLeft,
  FiSave,
} from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../../components/admin/common/PageHeader'
import QuestionEditor from '../../../components/admin/assessments/QuestionEditor'
import {
  getExamById,
  updateExamQuestions,
} from '../../../services/assessmentService'

const ExamQuestions = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [exam, setExam] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadExam = async () => {
      try {
        setLoading(true)

        const data = await getExamById(id)

        setExam(data)
        setQuestions(data.questions || [])
      } catch (err) {
        setError(err.message || 'Failed to load exam.')
      } finally {
        setLoading(false)
      }
    }

    loadExam()
  }, [id])

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')

      await updateExamQuestions(id, questions)

      alert('Exam questions saved successfully.')
    } catch (err) {
      setError(
        err.message || 'Failed to save exam questions.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading exam...</Typography>
      </Box>
    )
  }

  if (!exam) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          {error || 'Exam not found.'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <PageHeader
        title="Exam Questions"
        subtitle={`${exam.title} · ${exam.courseName}`}
        breadcrumbs={[
          { label: 'Admin', to: '/admin' },
          { label: 'Exams', to: '/admin/exams' },
          { label: exam.title },
          { label: 'Questions' },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={() =>
              navigate('/admin/exams')
            }
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
            }}
          >
            Back
          </Button>
        }
      />

      {error && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: '#FEF2F2',
            color: '#DC2626',
          }}
        >
          {error}
        </Box>
      )}

      <Box
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '18px',
          p: { xs: 2, md: 3 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ sm: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1E293B',
              }}
            >
              Question Editor
            </Typography>

            <Typography
              sx={{
                color: '#64748B',
                fontSize: '0.875rem',
                mt: 0.35,
              }}
            >
              Add MCQ or short-text questions to this
              exam.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<FiSave />}
            disabled={saving}
            onClick={handleSave}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
            }}
          >
            {saving ? 'Saving...' : 'Save Questions'}
          </Button>
        </Stack>

        <QuestionEditor
          questions={questions}
          onChange={setQuestions}
        />
      </Box>
    </Box>
  )
}

export default ExamQuestions