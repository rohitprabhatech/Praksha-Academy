import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  FiAward,
  FiCheckSquare,
  FiTrendingUp,
  FiStar,
} from 'react-icons/fi';

import { motion } from 'framer-motion';

import PageHeader from '../../../components/admin/common/PageHeader';
import StatCard from '../../../components/admin/common/StatCard';
import DataTable from '../../../components/admin/common/DataTable';

import { getPerformanceReport } from '../../../services/reportService';

const tooltipStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.8rem',
  borderRadius: 10,
  border: '1px solid #E2E8F0',
};

const ChartCard = ({ title, children }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      p: 3,
      height: '100%',
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '0.9375rem',
        color: '#1E293B',
        mb: 2.5,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

const EmptyChart = ({ message }) => (
  <Box
    sx={{
      height: 260,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94A3B8',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      textAlign: 'center',
      px: 2,
    }}
  >
    {message}
  </Box>
);

const LoadingState = () => (
  <Box
    sx={{
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    }}
  >
    <CircularProgress
      size={32}
      sx={{ color: '#2563EB' }}
    />

    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        color: '#64748B',
      }}
    >
      Loading performance reports...
    </Typography>
  </Box>
);

const ErrorState = ({ message, onRetry, retrying }) => (
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #FECACA',
      borderRadius: '16px',
      p: 4,
      textAlign: 'center',
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '0.9rem',
        color: '#DC2626',
        mb: 1,
      }}
    >
      Unable to load performance reports
    </Typography>

    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8125rem',
        color: '#64748B',
        mb: 2.5,
      }}
    >
      {message || 'Something went wrong while loading the report.'}
    </Typography>

    <Button
      variant="outlined"
      onClick={onRetry}
      disabled={retrying}
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        borderRadius: '10px',
        borderColor: '#E2E8F0',
        color: '#2563EB',
        textTransform: 'none',
        minWidth: 90,

        '&:hover': {
          borderColor: '#2563EB',
          bgcolor: 'rgba(37,99,235,0.04)',
        },

        '&.Mui-disabled': {
          borderColor: '#E2E8F0',
          color: '#94A3B8',
        },
      }}
    >
      {retrying ? 'Retrying...' : 'Retry'}
    </Button>
  </Box>
);

const PerformanceReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState('');

  const loadReport = useCallback(async (isRetry = false) => {
    try {
      if (isRetry) {
        setRetrying(true);
      } else {
        setLoading(true);
      }

      setError('');

      const result = await getPerformanceReport();

      setReport(result);
    } catch (err) {
      console.error(
        'Failed to load performance report:',
        err
      );

      setReport(null);

      setError(
        err?.message ||
          'Unable to load performance report.'
      );
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, []);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  return (
    <Box>
      <PageHeader
        title="Performance Reports"
        subtitle="Track quiz scores, assignment completion, and student academic performance."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Reports' },
          { label: 'Performance' },
        ]}
      />

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && <LoadingState />}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <ErrorState
          message={error}
          onRetry={() => loadReport(true)}
          retrying={retrying}
        />
      )}

      {/* =====================================================
          REPORT CONTENT
      ===================================================== */}

      {!loading && !error && report && (
        <PerformanceContent report={report} />
      )}

      {/* =====================================================
          EMPTY REPORT
      ===================================================== */}

      {!loading && !error && !report && (
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              color: '#94A3B8',
            }}
          >
            No performance report available yet.
          </Typography>

          <Button
            variant="outlined"
            onClick={() => loadReport(true)}
            disabled={retrying}
            sx={{
              mt: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              borderColor: '#E2E8F0',
              color: '#2563EB',
              textTransform: 'none',

              '&:hover': {
                borderColor: '#2563EB',
                bgcolor: 'rgba(37,99,235,0.04)',
              },
            }}
          >
            {retrying ? 'Retrying...' : 'Retry'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

/* =========================================================
   REPORT CONTENT
========================================================= */

const PerformanceContent = ({ report }) => {
  const stats = report.stats || {};
  const summary = report.summary || {};

  const coursePerformance =
    report.coursePerformance || [];

  const monthlyPerformance =
    report.monthlyPerformance || [];

  const topStudents =
    report.topStudents || [];

  const totalAttempts =
    (summary.quizAttempts || 0) +
    (summary.examAttempts || 0);

  const statCards = [
    {
      label: 'Avg Quiz Score',
      value: `${stats.averageQuizScore ?? 0}%`,
      icon: FiStar,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      trend:
        summary.quizAttempts > 0
          ? `${summary.quizAttempts} quiz attempt${
              summary.quizAttempts !== 1
                ? 's'
                : ''
            }`
          : 'No quiz attempts yet',
      trendUp: summary.quizAttempts > 0,
    },

    {
      label: 'Assignments',
      value: stats.assignmentsDone ?? 0,
      icon: FiCheckSquare,
      color: '#2563EB',
      bg: 'rgba(37,99,235,0.1)',
      trend: 'Created assignments',
      trendUp: stats.assignmentsDone > 0,
    },

    {
      label: 'Pass Rate',
      value: `${stats.passRate ?? 0}%`,
      icon: FiTrendingUp,
      color: '#22C55E',
      bg: 'rgba(34,197,94,0.1)',
      trend:
        totalAttempts > 0
          ? `${totalAttempts} assessment attempt${
              totalAttempts !== 1
                ? 's'
                : ''
            }`
          : 'No assessment attempts yet',
      trendUp: stats.passRate > 0,
    },

    {
      label: 'Certificates',
      value: stats.certificates ?? 0,
      icon: FiAward,
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.1)',
      trend: 'No certificate data yet',
      trendUp: false,
    },
  ];

  return (
    <Box>
      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="row g-3 mb-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="col-12 col-sm-6 col-xl-3"
          >
            <StatCard
              {...stat}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* =====================================================
          CHARTS
      ===================================================== */}

      <div className="row g-4 mb-4">
        {/* Course Performance */}

        <div className="col-12 col-lg-7">
          <ChartCard title="Avg Score by Course">
            {coursePerformance.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height={260}
              >
                <BarChart
                  data={coursePerformance}
                  margin={{
                    top: 5,
                    right: 10,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#F1F5F9"
                  />

                  <XAxis
                    dataKey="course"
                    tick={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: 12,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    unit="%"
                    tick={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: 12,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      `${value}%`,
                      'Avg Score',
                    ]}
                  />

                  <Bar
                    dataKey="avgScore"
                    name="Avg Score"
                    fill="#8B5CF6"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart
                message="No course performance data available yet."
              />
            )}
          </ChartCard>
        </div>

        {/* Monthly Performance */}

        <div className="col-12 col-lg-5">
          <ChartCard title="Monthly Avg Score Trend">
            {monthlyPerformance.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height={260}
              >
                <LineChart
                  data={monthlyPerformance}
                  margin={{
                    top: 5,
                    right: 10,
                    left: -15,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#F1F5F9"
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: 12,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    unit="%"
                    tick={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: 12,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      `${value}%`,
                      'Avg Score',
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    dot={{
                      fill: '#F59E0B',
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart
                message="No monthly performance data available yet."
              />
            )}
          </ChartCard>
        </div>
      </div>

      {/* =====================================================
          PERFORMANCE SUMMARY
      ===================================================== */}

      <Box
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          p: 3,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#1E293B',
            mb: 2,
          }}
        >
          Performance Summary
        </Typography>

        <div className="row g-3">
          <div className="col-12 col-sm-4">
            <SummaryItem
              label="Overall Average"
              value={`${summary.averageScore ?? 0}%`}
            />
          </div>

          <div className="col-12 col-sm-4">
            <SummaryItem
              label="Quiz Attempts"
              value={summary.quizAttempts ?? 0}
            />
          </div>

          <div className="col-12 col-sm-4">
            <SummaryItem
              label="Exam Attempts"
              value={summary.examAttempts ?? 0}
            />
          </div>
        </div>
      </Box>

      {/* =====================================================
          TOP STUDENTS
      ===================================================== */}

      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#1E293B',
            mb: 2,
          }}
        >
          Top Performing Students
        </Typography>

        {topStudents.length > 0 ? (
          <DataTable
            columns={[
              {
                id: 'rank',
                label: 'Rank',
                minWidth: 70,
              },

              {
                id: 'name',
                label: 'Student',
                minWidth: 150,
              },

              {
                id: 'course',
                label: 'Course',
                minWidth: 160,
              },

              {
                id: 'quizScore',
                label: 'Score',
                minWidth: 110,
              },

              {
                id: 'assignments',
                label: 'Assignments',
                minWidth: 110,
              },

              {
                id: 'certificates',
                label: 'Certificates',
                minWidth: 110,
              },
            ]}
            rows={topStudents}
            searchKey="name"
            emptyText="No performance data available."
          />
        ) : (
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontSize: '0.875rem',
                color: '#94A3B8',
              }}
            >
              No student performance data
              available yet.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/* =========================================================
   SUMMARY ITEM
========================================================= */

const SummaryItem = ({ label, value }) => (
  <Box
    sx={{
      bgcolor: '#F8FAFC',
      borderRadius: '10px',
      p: 2,
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.75rem',
        color: '#64748B',
        mb: 0.5,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '1.25rem',
        color: '#1E293B',
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default PerformanceReports;