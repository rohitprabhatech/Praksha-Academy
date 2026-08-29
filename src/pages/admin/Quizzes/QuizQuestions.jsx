import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import QuestionEditor from '../../../components/admin/assessments/QuestionEditor'
import {
  getQuizById,
  updateQuizQuestions,
} from '../../../services/assessmentService'

const QuizQuestions = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const loadQuiz = async () => {
    try {
      setLoading(true)
      setError('')

      const result = await getQuizById(id)

      setQuiz(result)
      setQuestions(result.questions || [])
    } catch (err) {
      setError(err.message || 'Failed to load quiz.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuiz()
  }, [id])

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')

      await updateQuizQuestions(id, questions)

      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to save questions.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!quiz) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          Quiz not found.
        </Alert>
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
        title="Quiz Questions"
        subtitle={`${quiz.title} · ${quiz.courseName}`}
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Quizzes', to: '/admin/quizzes' },
          { label: quiz.title },
          { label: 'Questions' },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={() =>
              navigate('/admin/quizzes')
            }
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Back
          </Button>
        }
      />

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
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
                fontSize: '0.875rem',
                color: '#64748B',
                mt: 0.5,
              }}
            >
              Add MCQ or short-text questions.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<FiSave />}
            onClick={handleSave}
            disabled={saving}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {saving ? 'Saving...' : 'Save Questions'}
          </Button>
        </Stack>

        <QuestionEditor
          questions={questions}
          onChange={setQuestions}
          saving={saving}
        />
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={1800}
        onClose={() => setSuccess(false)}
        message="Questions saved successfully."
      />
    </Box>
  )
}

export default QuizQuestions