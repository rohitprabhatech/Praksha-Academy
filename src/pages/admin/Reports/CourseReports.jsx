import { useEffect, useState } from 'react';
import { Box, Typography, Alert, Button, CircularProgress } from '@mui/material';
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
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiRefreshCw,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

import PageHeader from '../../../components/admin/common/PageHeader';
import StatCard from '../../../components/admin/common/StatCard';
import DataTable from '../../../components/admin/common/DataTable';
import { getCourseReport } from '../../../services/reportService';

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

const LoadingState = () => (
  <Box
    sx={{
      minHeight: 420,
      bgcolor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <CircularProgress size={32} sx={{ color: '#2563EB' }} />

      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          color: '#64748B',
        }}
      >
        Loading course reports...
      </Typography>
    </Box>
  </Box>
);

const ErrorState = ({ message, onRetry }) => (
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #FECACA',
      borderRadius: '16px',
      p: 3,
    }}
  >
    <Alert
      severity="error"
      action={
        <Button
          size="small"
          startIcon={<FiRefreshCw size={14} />}
          onClick={onRetry}
          sx={{
            textTransform: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
          }}
        >
          Retry
        </Button>
      }
      sx={{
        borderRadius: '10px',
        alignItems: 'center',
      }}
    >
      {message}
    </Alert>
  </Box>
);

const CourseReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReport = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getCourseReport();

      setReport(data);
    } catch (err) {
      console.error('Failed to load course report:', err);

      setError(
        err?.message ||
          'Unable to load course reports. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Course Reports"
        subtitle="Track enrollment numbers, completion rates, and top-performing courses."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Reports' },
          { label: 'Courses' },
        ]}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadReport} />
      ) : !report ? (
        <ErrorState
          message="No course report data is available."
          onRetry={loadReport}
        />
      ) : (
        <>
          {/* Stats */}
          <div className="row g-3 mb-4">
            {[
              {
                label: 'Total Courses',
                value: report.stats.totalCourses,
                icon: FiBookOpen,
                color: '#2563EB',
                bg: 'rgba(37,99,235,0.1)',
                trend: 'All courses',
                trendUp: true,
              },
              {
                label: 'Published',
                value: report.stats.published,
                icon: FiCheckCircle,
                color: '#22C55E',
                bg: 'rgba(34,197,94,0.1)',
                trend:
                  report.stats.totalCourses > 0
                    ? `${Math.round(
                        (report.stats.published /
                          report.stats.totalCourses) *
                          100
                      )}% of total`
                    : '0% of total',
                trendUp: true,
              },
              {
                label: 'Draft',
                value: report.stats.draft,
                icon: FiClock,
                color: '#F59E0B',
                bg: 'rgba(245,158,11,0.1)',
                trend: 'Pending review',
                trendUp: false,
              },
              {
                label: 'Avg Completion',
                value: `${report.stats.averageCompletion}%`,
                icon: FiTrendingUp,
                color: '#8B5CF6',
                bg: 'rgba(139,92,246,0.1)',
                trend: 'Based on available data',
                trendUp: true,
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="col-12 col-sm-6 col-xl-3"
              >
                <StatCard {...stat} index={index} />
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-7">
              <ChartCard title="Enrollments by Course">
                {report.enrollmentData?.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                      data={report.enrollmentData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 20,
                        left: 40,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#F1F5F9"
                        horizontal={false}
                      />

                      <XAxis
                        type="number"
                        tick={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 12,
                          fill: '#64748B',
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        dataKey="course"
                        type="category"
                        tick={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 12,
                          fill: '#64748B',
                        }}
                        axisLine={false}
                        tickLine={false}
                        width={90}
                      />

                      <Tooltip
                        contentStyle={tooltipStyle}
                      />

                      <Bar
                        dataKey="enrollments"
                        name="Enrollments"
                        fill="#2563EB"
                        radius={[0, 6, 6, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box
                    sx={{
                      height: 260,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#94A3B8',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      No enrollment data available yet.
                    </Typography>
                  </Box>
                )}
              </ChartCard>
            </div>

            <div className="col-12 col-lg-5">
              <ChartCard title="Completion Rate Trend">
                {report.completionTrend?.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart
                      data={report.completionTrend}
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
                          fontFamily: 'Inter, sans-serif',
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
                          fontFamily: 'Inter, sans-serif',
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
                          'Completion',
                        ]}
                      />

                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#22C55E"
                        strokeWidth={2.5}
                        dot={{
                          fill: '#22C55E',
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box
                    sx={{
                      height: 260,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#94A3B8',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                      }}
                    >
                      No completion trend data available yet.
                    </Typography>
                  </Box>
                )}
              </ChartCard>
            </div>
          </div>

          {/* Table */}
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
              Top Courses by Enrollment
            </Typography>

            <DataTable
              columns={[
                {
                  id: 'title',
                  label: 'Course',
                  minWidth: 200,
                },
                {
                  id: 'category',
                  label: 'Category',
                  minWidth: 120,
                },
                {
                  id: 'enrolled',
                  label: 'Enrolled',
                  minWidth: 100,
                },
                {
                  id: 'completion',
                  label: 'Completion',
                  minWidth: 110,
                },
                {
                  id: 'rating',
                  label: 'Rating',
                  minWidth: 90,
                },
              ]}
              rows={report.topCourses || []}
              searchKey="title"
              emptyText="No courses found."
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CourseReports;