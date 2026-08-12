import { Box, Stack, Typography } from '@mui/material'
import DashboardCard from '../../../components/admin/DashboardCard'
import RecentActivities from '../../../components/admin/RecentActivities'
import UpcomingClasses from '../../../components/admin/UpcomingClasses'
import CourseEnrollmentChart from '../../../components/admin/charts/CourseEnrollmentChart'
import RevenueChart from '../../../components/admin/charts/RevenueChart'
import StudentChart from '../../../components/admin/charts/StudentChart'
import { dashboardStats } from '../../../constants/adminDashboard'

function Dashboard() {
 return (
  <Stack spacing={3}>
   <Stack
    direction={{ xs: 'column', sm: 'row' }}
    spacing={1.5}
    sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
   >
    <Box>
     <Typography variant="h1" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 850 }}>
      Welcome to Praksha Academy!
     </Typography>
     <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: '0.925rem' }}>
      Here's what's happening with your platform today.
     </Typography>
    </Box>
    <Typography
     color="text.secondary"
     sx={{
      px: 1.5,
      py: 0.75,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1.5,
      bgcolor: 'background.paper',
      fontSize: '0.8125rem',
      fontWeight: 700,
     }}
    >
     Aug 12, 2026
    </Typography>
   </Stack>

   <Box
    className="row g-3"
    sx={{
     display: 'grid',
     gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' },
     gap: 2,
    }}
   >
    {dashboardStats.map((stat) => (
     <DashboardCard key={stat.title} {...stat} />
    ))}
   </Box>

   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.35fr) minmax(320px, 0.65fr)' },
     gap: 2,
    }}
   >
    <RevenueChart />
    <CourseEnrollmentChart />
   </Box>

   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.2fr) minmax(300px, 0.8fr)' },
     gap: 2,
    }}
   >
    <StudentChart />
    <Box sx={{ display: 'grid', gap: 2 }}>
     <RecentActivities />
     <UpcomingClasses />
    </Box>
   </Box>
  </Stack>
 )
}

export default Dashboard
