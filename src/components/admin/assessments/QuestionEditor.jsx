import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiX,
} from 'react-icons/fi'

const QuestionEditor = ({
  questions = [],
  onChange,
  saving = false,
}) => {
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    prompt: '',
    type: 'MCQ',
    options: ['', ''],
    answer: '',
  })

  const [error, setError] = useState('')

  const resetForm = () => {
    setForm({
      prompt: '',
      type: 'MCQ',
      options: ['', ''],
      answer: '',
    })
    setEditingId(null)
    setError('')
  }

  const handleTypeChange = (event) => {
    const type = event.target.value

    setForm((current) => ({
      ...current,
      type,
      options: type === 'MCQ' ? ['', ''] : [],
      answer: '',
    }))

    setError('')
  }

  const handleOptionChange = (index, value) => {
    setForm((current) => {
      const options = [...current.options]
      options[index] = value

      return {
        ...current,
        options,
      }
    })
  }

  const addOption = () => {
    setForm((current) => ({
      ...current,
      options: [...current.options, ''],
    }))
  }

  const removeOption = (index) => {
    setForm((current) => ({
      ...current,
      options: current.options.filter((_, i) => i !== index),
      answer:
        current.answer === current.options[index]
          ? ''
          : current.answer,
    }))
  }

  const validate = () => {
    if (!form.prompt.trim()) {
      setError('Question prompt is required.')
      return false
    }

    if (form.type === 'MCQ') {
      const options = form.options
        .map((option) => option.trim())
        .filter(Boolean)

      if (options.length < 2) {
        setError('MCQ must have at least 2 options.')
        return false
      }

      if (!form.answer.trim()) {
        setError('Please select the correct answer.')
        return false
      }
    }

    return true
  }

  const handleSave = () => {
    if (!validate()) return

    const question = {
      id:
        editingId ||
        `question-${Math.random().toString(36).substring(2, 9)}`,
      prompt: form.prompt.trim(),
      type: form.type,
      options:
        form.type === 'MCQ'
          ? form.options
              .map((option) => option.trim())
              .filter(Boolean)
          : [],
      answer:
        form.type === 'MCQ'
          ? form.answer.trim()
          : '',
    }

    if (editingId) {
      onChange(
        questions.map((item) =>
          item.id === editingId ? question : item
        )
      )
    } else {
      onChange([...questions, question])
    }

    resetForm()
  }

  const handleEdit = (question) => {
    setEditingId(question.id)

    setForm({
      prompt: question.prompt || '',
      type: question.type || 'MCQ',
      options:
        question.type === 'MCQ'
          ? question.options?.length >= 2
            ? question.options
            : ['', '']
          : [],
      answer: question.answer || '',
    })

    setError('')
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question?'
    )

    if (!confirmed) return

    onChange(
      questions.filter((question) => question.id !== id)
    )

    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          border: '1px solid #E2E8F0',
          borderRadius: 3,
          p: { xs: 2, md: 3 },
          bgcolor: '#F8FAFC',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: '#1E293B',
            mb: 2.5,
          }}
        >
          {editingId ? 'Edit Question' : 'Add Question'}
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            multiline
            minRows={2}
            label="Question"
            value={form.prompt}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                prompt: event.target.value,
              }))
            }
            placeholder="Enter your question"
          />

          <FormControl fullWidth>
            <InputLabel>Question Type</InputLabel>

            <Select
              value={form.type}
              label="Question Type"
              onChange={handleTypeChange}
            >
              <MenuItem value="MCQ">MCQ</MenuItem>
              <MenuItem value="short">Short Text</MenuItem>
            </Select>
          </FormControl>

          {form.type === 'MCQ' && (
            <Stack spacing={1.5}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#475569',
                }}
              >
                Options
              </Typography>

              {form.options.map((option, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <TextField
                    fullWidth
                    size="small"
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(
                        index,
                        event.target.value
                      )
                    }
                  />

                  {form.options.length > 2 && (
                    <IconButton
                      color="error"
                      onClick={() => removeOption(index)}
                    >
                      <FiX size={18} />
                    </IconButton>
                  )}
                </Stack>
              ))}

              <Button
                type="button"
                size="small"
                startIcon={<FiPlus />}
                onClick={addOption}
                sx={{
                  alignSelf: 'flex-start',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Add Option
              </Button>

              <FormControl fullWidth>
                <InputLabel>Correct Answer</InputLabel>

                <Select
                  value={form.answer}
                  label="Correct Answer"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      answer: event.target.value,
                    }))
                  }
                >
                  {form.options
                    .filter((option) => option.trim())
                    .map((option, index) => (
                      <MenuItem
                        key={`${option}-${index}`}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
          )}

          {error && (
            <Typography
              sx={{
                color: '#DC2626',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {error}
            </Typography>
          )}

          <Stack direction="row" spacing={1.5}>
            {editingId && (
              <Button
                variant="outlined"
                startIcon={<FiX />}
                onClick={resetForm}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
            )}

            <Button
              variant="contained"
              startIcon={
                editingId ? <FiEdit2 /> : <FiPlus />
              }
              onClick={handleSave}
              disabled={saving}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {editingId ? 'Update Question' : 'Add Question'}
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={1.5}>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#1E293B',
          }}
        >
          Questions ({questions.length})
        </Typography>

        {questions.length === 0 ? (
          <Box
            sx={{
              border: '1px dashed #CBD5E1',
              borderRadius: 3,
              p: 5,
              textAlign: 'center',
              bgcolor: '#F8FAFC',
            }}
          >
            <Typography
              sx={{
                color: '#64748B',
                fontWeight: 500,
              }}
            >
              No questions added yet.
            </Typography>
          </Box>
        ) : (
          questions.map((question, index) => (
            <Box
              key={question.id}
              sx={{
                border: '1px solid #E2E8F0',
                borderRadius: 2.5,
                p: 2.5,
                bgcolor: '#FFFFFF',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: '#1E293B',
                    }}
                  >
                    {index + 1}. {question.prompt}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.75,
                      fontSize: '0.8rem',
                      color: '#64748B',
                    }}
                  >
                    {question.type === 'MCQ'
                      ? `MCQ · ${question.options?.length || 0} options`
                      : 'Short Text'}
                  </Typography>

                  {question.type === 'MCQ' &&
                    question.options?.length > 0 && (
                      <Stack spacing={0.5} sx={{ mt: 1.5 }}>
                        {question.options.map(
                          (option, optionIndex) => (
                            <Typography
                              key={`${question.id}-${optionIndex}`}
                              sx={{
                                fontSize: '0.875rem',
                                color:
                                  option === question.answer
                                    ? '#059669'
                                    : '#475569',
                                fontWeight:
                                  option === question.answer
                                    ? 600
                                    : 400,
                              }}
                            >
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                              . {option}
                              {option === question.answer
                                ? ' ✓'
                                : ''}
                            </Typography>
                          )
                        )}
                      </Stack>
                    )}
                </Box>

                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(question)}
                  >
                    <FiEdit2 size={17} />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDelete(question.id)
                    }
                  >
                    <FiTrash2 size={17} />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          ))
        )}
      </Stack>
    </Stack>
  )
}

export default QuestionEditor
