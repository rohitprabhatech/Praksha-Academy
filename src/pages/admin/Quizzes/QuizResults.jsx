import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import {
  FiArrowLeft,
  FiAward,
  FiUsers,
} from 'react-icons/fi';

import PageHeader from '../../../components/admin/common/PageHeader';
import DataTable from '../../../components/admin/common/DataTable';

import {
  getQuizById,
  getQuizResults,
} from '../../../services/assessmentService';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadResults = async () => {
      try {
        setLoading(true);
        setError('');

        const [quizData, resultData] = await Promise.all([
          getQuizById(id),
          getQuizResults(id),
        ]);

        if (!mounted) return;

        setQuiz(quizData);
        setResults(resultData || []);
      } catch (err) {
        if (!mounted) return;

        setError(err?.message || 'Failed to load quiz results.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadResults();

    return () => {
      mounted = false;
    };
  }, [id]);

  const getPercentage = (score, total) => {
    if (
      score === null ||
      score === undefined ||
      total === null ||
      total === undefined ||
      Number(total) === 0
    ) {
      return null;
    }

    return Math.round((Number(score) / Number(total)) * 100);
  };

  const getResultStatus = (score, total) => {
    const percentage = getPercentage(score, total);

    if (percentage === null) {
      return (
        <Chip
          label="Not Graded"
          size="small"
          sx={{
            bgcolor: '#F8FAFC',
            color: '#64748B',
            fontWeight: 600,
          }}
        />
      );
    }

    if (percentage >= 40) {
      return (
        <Chip
          label="Passed"
          size="small"
          sx={{
            bgcolor: '#ECFDF5',
            color: '#059669',
            fontWeight: 600,
          }}
        />
      );
    }

    return (
      <Chip
        label="Needs Improvement"
        size="small"
        sx={{
          bgcolor: '#FFF7ED',
          color: '#EA580C',
          fontWeight: 600,
        }}
      />
    );
  };

  const columns = [
    {
      id: 'student',
      label: 'Student',
      minWidth: 220,
      render: (value) => (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            color: '#1E293B',
          }}
        >
          {value || 'Unknown Student'}
        </Typography>
      ),
    },
    {
      id: 'score',
      label: 'Score',
      minWidth: 120,
      render: (value, row) => (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            color: '#1E293B',
          }}
        >
          {value ?? '—'} / {row.total ?? '—'}
        </Typography>
      ),
    },
    {
      id: 'percentage',
      label: 'Percentage',
      minWidth: 130,
      render: (_, row) => {
        const percentage = getPercentage(row.score, row.total);

        return (
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: percentage === null ? '#94A3B8' : '#2563EB',
            }}
          >
            {percentage === null ? '—' : `${percentage}%`}
          </Typography>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      render: (_, row) => getResultStatus(row.score, row.total),
    },
  ];

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
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <PageHeader
          title="Quiz Results"
          subtitle="View student scores and results."
          breadcrumbs={[
            { label: 'Admin', to: '/admin' },
            { label: 'Quizzes', to: '/admin/quizzes' },
            { label: 'Results' },
          ]}
        />

        <Box
          sx={{
            p: 5,
            textAlign: 'center',
            bgcolor: '#FFFFFF',
            border: '1px solid #FECACA',
            borderRadius: '16px',
          }}
        >
          <Typography
            sx={{
              color: '#DC2626',
              fontWeight: 600,
              mb: 2,
            }}
          >
            {error}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={() => navigate('/admin/quizzes')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Back to Quizzes
          </Button>
        </Box>
      </Box>
    );
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
        title="Quiz Results"
        subtitle={
          quiz
            ? `${quiz.title} · ${quiz.courseName || 'Course'}`
            : 'View student scores and results.'
        }
        breadcrumbs={[
          { label: 'Admin', to: '/admin' },
          { label: 'Quizzes', to: '/admin/quizzes' },
          {
            label: quiz?.title || 'Quiz',
          },
          {
            label: 'Results',
          },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft />}
            onClick={() => navigate('/admin/quizzes')}
            sx={{
              minHeight: 44,
              px: 2.5,
              borderRadius: '12px',
              borderColor: '#93C5FD',
              color: '#2563EB',
              textTransform: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#2563EB',
                bgcolor: '#EFF6FF',
              },
            }}
          >
            Back to Quizzes
          </Button>
        }
      />

      {/* Summary cards */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            p: 2.5,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiUsers size={21} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: '#64748B',
                  fontWeight: 600,
                }}
              >
                Total Results
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#1E293B',
                }}
              >
                {results.length}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            p: 2.5,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FiAward size={21} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: '#64748B',
                  fontWeight: 600,
                }}
              >
                Graded
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#1E293B',
                }}
              >
                {
                  results.filter(
                    (result) =>
                      result.score !== null &&
                      result.score !== undefined
                  ).length
                }
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      {/* Results table */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2.25,
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#1E293B',
            }}
          >
            Student Results
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: '#64748B',
            }}
          >
            Review scores for students who completed this quiz.
          </Typography>
        </Box>

        <DataTable
          columns={columns}
          rows={results}
          searchKey="student"
          emptyText="No quiz results available yet."
        />
      </Box>
    </Box>
  );
};

export default QuizResults;