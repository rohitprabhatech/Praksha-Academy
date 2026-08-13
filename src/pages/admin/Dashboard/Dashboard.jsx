import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import DashboardCard from '../../../components/admin/DashboardCard';
import RevenueChart from '../../../components/admin/RevenueChart';
import StudentChart from '../../../components/admin/StudentChart';
import RecentActivities from '../../../components/admin/RecentActivities';
import GroupIcon from '@mui/icons-material/Group';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Welcome back, Admin!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here is what's happening with your academy today.
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Students"
            value="12,345"
            trend="up"
            trendValue="12%"
            color="primary"
            icon={<GroupIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Teachers"
            value="84"
            trend="up"
            trendValue="2%"
            color="info"
            icon={<CastForEducationIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Courses"
            value="142"
            trend="up"
            trendValue="5%"
            color="success"
            icon={<LibraryBooksIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Revenue"
            value="$45,231"
            trend="up"
            trendValue="8%"
            color="warning"
            icon={<AccountBalanceWalletIcon fontSize="large" />}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <StudentChart />
        </Grid>
      </Grid>

      {/* Recent Activities & Upcoming */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivities />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Reusing RecentActivities format for Upcoming Classes as a placeholder, can be styled separately */}
          <RecentActivities /> 
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
