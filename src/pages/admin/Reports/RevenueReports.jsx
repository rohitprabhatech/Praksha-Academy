import { useEffect, useState } from 'react';
import { Box, Typography, Chip, CircularProgress } from '@mui/material';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiRefreshCw,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import StatCard from '../../../components/admin/common/StatCard';
import DataTable from '../../../components/admin/common/DataTable';
import { getRevenueReport } from '../../../services/reportService';

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

const formatCurrency = (value) => {
  const amount = Number(value) || 0;

  return `₹${amount.toLocaleString('en-IN')}`;
};

const RevenueReports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadReport = async () => {
      try {
        setLoading(true);

        const data = await getRevenueReport();

        if (mounted) {
          setReport(data);
        }
      } catch (error) {
        console.error('Failed to load revenue report:', error);

        if (mounted) {
          toast.error('Failed to load revenue report.');
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
          title="Revenue Reports"
          subtitle="Monitor revenue trends, course earnings, and transaction history."
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Reports' },
            { label: 'Revenue' },
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
    totalRevenue: 0,
    thisMonth: 0,
    pending: 0,
    refunds: 0,
  };

  const monthlyRevenue = report?.monthlyRevenue || [];
  const revenueByCourse = report?.revenueByCourse || [];
  const transactions = report?.transactions || [];

  const hasMonthlyRevenue = monthlyRevenue.some(
    (item) => Number(item.revenue) > 0
  );

  const hasCourseRevenue = revenueByCourse.some(
    (item) => Number(item.revenue) > 0
  );

  const hasTransactions = transactions.length > 0;

  const statCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: FiDollarSign,
      color: '#2563EB',
      bg: 'rgba(37,99,235,0.1)',
      trend:
        stats.totalRevenue > 0
          ? 'Recorded revenue'
          : 'No revenue data yet',
      trendUp: stats.totalRevenue > 0,
    },
    {
      label: 'This Month',
      value: formatCurrency(stats.thisMonth),
      icon: FiTrendingUp,
      color: '#22C55E',
      bg: 'rgba(34,197,94,0.1)',
      trend:
        stats.thisMonth > 0
          ? 'Current month revenue'
          : 'No revenue data yet',
      trendUp: stats.thisMonth > 0,
    },
    {
      label: 'Pending',
      value: formatCurrency(stats.pending),
      icon: FiClock,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      trend:
        stats.pending > 0
          ? 'Pending payments'
          : 'No pending payments',
      trendUp: false,
    },
    {
      label: 'Refunds',
      value: formatCurrency(stats.refunds),
      icon: FiRefreshCw,
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.1)',
      trend:
        stats.refunds > 0
          ? 'Recorded refunds'
          : 'No refund data yet',
      trendUp: false,
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Revenue Reports"
        subtitle="Monitor revenue trends, course earnings, and transaction history."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Reports' },
          { label: 'Revenue' },
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
          <ChartCard title="Monthly Revenue Trend">
            {hasMonthlyRevenue ? (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart
                  data={monthlyRevenue}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -5,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2563EB"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="95%"
                        stopColor="#2563EB"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

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
                    tick={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      `₹${(value / 1000).toFixed(0)}k`
                    }
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      formatCurrency(value),
                      'Revenue',
                    ]}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fill="url(#revenueGrad)"
                    dot={{
                      fill: '#2563EB',
                      strokeWidth: 2,
                      r: 4,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No revenue data available yet." />
            )}
          </ChartCard>
        </div>

        <div className="col-12 col-lg-4">
          <ChartCard title="Revenue by Course">
            {hasCourseRevenue ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={revenueByCourse}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 10,
                    left: 45,
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
                      fontSize: 11,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      `₹${(value / 1000).toFixed(0)}k`
                    }
                  />

                  <YAxis
                    dataKey="course"
                    type="category"
                    tick={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      fill: '#64748B',
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={75}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      formatCurrency(value),
                      'Revenue',
                    ]}
                  />

                  <Bar
                    dataKey="revenue"
                    fill="#F59E0B"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No course revenue data available yet." />
            )}
          </ChartCard>
        </div>
      </div>

      {/* Transactions */}
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
          Recent Transactions
        </Typography>

        <DataTable
          columns={[
            {
              id: 'student',
              label: 'Student',
              minWidth: 150,
            },
            {
              id: 'course',
              label: 'Course',
              minWidth: 160,
            },
            {
              id: 'amount',
              label: 'Amount',
              minWidth: 100,
            },
            {
              id: 'date',
              label: 'Date',
              minWidth: 110,
            },
            {
              id: 'status',
              label: 'Status',
              minWidth: 110,
              render: (value) => (
                <Chip
                  label={value}
                  size="small"
                  sx={{
                    ...(value === 'Completed'
                      ? {
                          bgcolor: 'rgba(34,197,94,0.1)',
                          color: '#16A34A',
                        }
                      : value === 'Pending'
                        ? {
                            bgcolor: 'rgba(245,158,11,0.1)',
                            color: '#D97706',
                          }
                        : {
                            bgcolor: 'rgba(239,68,68,0.1)',
                            color: '#DC2626',
                          }),
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                  }}
                />
              ),
            },
          ]}
          rows={transactions}
          searchKey="student"
          emptyText="No transactions available yet."
        />

        {!hasTransactions && (
          <Typography
            sx={{
              mt: 1.5,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: '#94A3B8',
            }}
          >
            Revenue will appear here once payment and transaction
            tracking is connected.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RevenueReports;