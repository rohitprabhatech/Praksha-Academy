import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

import PageHeader from '../../../components/admin/common/PageHeader'
import { createQuiz } from '../../../services/assessmentService'
import { getCourses } from '../../../services/courseService'

const CreateQuiz = () => {
    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [loadingCourses, setLoadingCourses] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState({
        title: '',
        courseId: '',
        date: '',
        duration: '',
        status: 'Draft',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoadingCourses(true)
                const result = await getCourses()
                setCourses(result)
            } catch (err) {
                setError(err.message || 'Failed to load courses.')
            } finally {
                setLoadingCourses(false)
            }
        }

        loadCourses()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm((current) => ({
            ...current,
            [name]: value,
        }))

        setErrors((current) => ({
            ...current,
            [name]: '',
        }))
    }

    const validate = () => {
        const nextErrors = {}

        if (!form.title.trim()) {
            nextErrors.title = 'Quiz title is required.'
        }

        if (!form.courseId) {
            nextErrors.courseId = 'Course is required.'
        }

        if (!form.status) {
            nextErrors.status = 'Status is required.'
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!validate()) return

        try {
            setSaving(true)
            setError('')

            await createQuiz({
                title: form.title.trim(),
                courseId: form.courseId,
                date: form.date,
                duration: form.duration,
                status: form.status,
            })

            setSuccess(true)

            setTimeout(() => {
                navigate('/admin/quizzes')
            }, 700)
        } catch (err) {
            setError(err.message || 'Failed to create quiz.')
        } finally {
            setSaving(false)
        }
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
                title="Create Quiz"
                subtitle="Create a quiz for a course."
                breadcrumbs={[
                    { label: 'Admin' },
                    { label: 'Quizzes', to: '/admin/quizzes' },
                    { label: 'Create Quiz' },
                ]}
                action={
                    <Button
                        variant="outlined"
                        startIcon={<FiArrowLeft />}
                        onClick={() => navigate('/admin/quizzes')}
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
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 3,
                    p: { xs: 2.5, md: 4 },
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#1E293B',
                        mb: 0.5,
                    }}
                >
                    Quiz Information
                </Typography>

                <Typography
                    sx={{
                        fontSize: '0.875rem',
                        color: '#64748B',
                        mb: 3,
                    }}
                >
                    Enter the basic details for this quiz.
                </Typography>

                <Stack spacing={2.5}>
                    <TextField
                        fullWidth
                        required
                        label="Quiz Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        placeholder="Enter quiz title"
                    />

                    <FormControl
                        fullWidth
                        required
                        error={Boolean(errors.courseId)}
                        disabled={loadingCourses}
                    >
                        <InputLabel>Course</InputLabel>

                        <Select
                            name="courseId"
                            value={form.courseId}
                            label="Course"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Select Course</em>
                            </MenuItem>

                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                </MenuItem>
                            ))}
                        </Select>

                        {errors.courseId && (
                            <Typography
                                sx={{
                                    color: '#D32F2F',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                    ml: 1.5,
                                }}
                            >
                                {errors.courseId}
                            </Typography>
                        )}
                    </FormControl>

                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Duration"
                            name="duration"
                            type="number"
                            value={form.duration}
                            onChange={handleChange}
                            inputProps={{
                                min: 1,
                            }}
                            placeholder="e.g. 30"
                            helperText="Duration in minutes"
                        />
                    </Stack>

                    <FormControl
                        fullWidth
                        required
                        error={Boolean(errors.status)}
                    >
                        <InputLabel>Status</InputLabel>

                        <Select
                            name="status"
                            value={form.status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value="Draft">Draft</MenuItem>
                            <MenuItem value="Published">Published</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Box
                    sx={{
                        borderTop: '1px solid #E2E8F0',
                        mt: 4,
                        pt: 3,
                        display: 'flex',
                        gap: 1.5,
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => navigate('/admin/quizzes')}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            fontWeight: 600,
                            px: 3,
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={saving || loadingCourses}
                        startIcon={
                            saving ? undefined : <FiSave />
                        }
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            fontWeight: 600,
                            px: 3,
                        }}
                    >
                        {saving ? 'Creating...' : 'Create Quiz'}
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={success}
                autoHideDuration={1000}
                message="Quiz created successfully."
            />
        </Box>
    )
}

export default CreateQuiz