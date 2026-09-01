import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  FiUsers,
  FiTrendingUp,
  FiUserCheck,
  FiUserX,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import StatCard from '../../../components/admin/common/StatCard';
import DataTable from '../../../components/admin/common/DataTable';
import { getStudentReport } from '../../../services/reportService';

const PIE_COLORS = [
  '#2563EB',
  '#F59E0B',
  '#22C55E',
  '#8B5CF6',
  '#EF4444',
];

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
      textAlign: 'center',
      px: 2,
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        color: '#94A3B8',
      }}
    >
      {message}
    </Typography>
  </Box>
);

const StudentReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadReport = async () => {
      try {
        setLoading(true);

        const data = await getStudentReport();

        if (mounted) {
          setReport(data);
        }
      } catch (error) {
        console.error('Failed to load student report:', error);

        if (mounted) {
          toast.error('Failed to load student report.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadReport();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Box>
        <PageHeader
          title="Student Reports"
          subtitle="Overview of student enrollment, activity, and distribution."
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Reports' },
            { label: 'Students' },
          ]}
        />

        <Box
          sx={{
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  const stats = report?.stats || {
    totalStudents: 0,
    newThisMonth: 0,
    activeStudents: 0,
    inactiveStudents: 0,
  };

  const monthlySignups = report?.monthlySignups || [];
  const categoryDistribution = report?.categoryDistribution || [];
  const recentStudents = report?.recentStudents || [];

  const hasMonthlyData = monthlySignups.some(
    (item) => Number(item.students) > 0
  );

  const hasCategoryData = categoryDistribution.some(
    (item) => Number(item.value) > 0
  );

  const statCards = [
    {
      label: 'Total Students',
      value: stats.totalStudents.toLocaleString('en-IN'),
      icon: FiUsers,
      color: '#2563EB',
      bg: 'rgba(37,99,235,0.1)',
      trend:
        stats.totalStudents > 0
          ? 'Current total'
          : 'No student data yet',
      trendUp: stats.totalStudents > 0,
    },
    {
      label: 'New This Month',
      value: stats.newThisMonth.toLocaleString('en-IN'),
      icon: FiTrendingUp,
      color: '#22C55E',
      bg: 'rgba(34,197,94,0.1)',
      trend:
        stats.newThisMonth > 0
          ? 'Based on available records'
          : 'No new students yet',
      trendUp: stats.newThisMonth > 0,
    },
    {
      label: 'Active Students',
      value: stats.activeStudents.toLocaleString('en-IN'),
      icon: FiUserCheck,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      trend:
        stats.activeStudents > 0
          ? `${Math.round(
              (stats.activeStudents / Math.max(stats.totalStudents, 1)) *
                100
            )}% of available records`
          : 'No active students',
      trendUp: stats.activeStudents > 0,
    },
    {
      label: 'Inactive',
      value: stats.inactiveStudents.toLocaleString('en-IN'),
      icon: FiUserX,
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.1)',
      trend:
        stats.inactiveStudents > 0
          ? `${Math.round(
              (stats.inactiveStudents / Math.max(stats.totalStudents, 1)) *
                100
            )}% of available records`
          : 'No inactive students',
      trendUp: false,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Student Reports"
        subtitle="Overview of student enrollment, activity, and distribution."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Reports' },
          { label: 'Students' },
        ]}
      />

      {/* Stats */}
      <div className="row g-3 mb-4">
        {statCards.map((stat, index) => (
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
        <div className="col-12 col-lg-8">
          <ChartCard title="Monthly New Enrollments">
            {hasMonthlyData ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={monthlySignups}
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
                    allowDecimals={false}
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
                      value,
                      'Students',
                    ]}
                  />

                  <Bar
                    dataKey="students"
                    name="Students"
                    fill="#2563EB"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No enrollment history available yet." />
            )}
          </ChartCard>
        </div>

        <div className="col-12 col-lg-4">
          <ChartCard title="Students by Category">
            {hasCategoryData ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {categoryDistribution.map((item, index) => (
                      <Cell
                        key={`${item.name}-${index}`}
                        fill={
                          PIE_COLORS[
                            index % PIE_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={tooltipStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No category distribution data available yet." />
            )}
          </ChartCard>
        </div>
      </div>

      {/* Recent Students */}
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
          Recent Signups
        </Typography>

        <DataTable
          columns={[
            {
              id: 'name',
              label: 'Name',
              minWidth: 150,
            },
            {
              id: 'email',
              label: 'Email',
              minWidth: 180,
            },
            {
              id: 'course',
              label: 'Course',
              minWidth: 160,
            },
            {
              id: 'enrolledOn',
              label: 'Enrolled',
              minWidth: 120,
            },
          ]}
          rows={recentStudents}
          searchKey="name"
          emptyText="No student records available yet."
        />

        {recentStudents.length === 0 && (
          <Typography
            sx={{
              mt: 1.5,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: '#94A3B8',
            }}
          >
            Student information will appear here when
            student records become available.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StudentReports;