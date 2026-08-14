import { Box, Button, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { FiRefreshCw } from 'react-icons/fi'
import DashboardCard from '../../../components/admin/DashboardCard'
import RecentActivities from '../../../components/admin/RecentActivities'
import UpcomingClasses from '../../../components/admin/UpcomingClasses'
import CourseEnrollmentChart from '../../../components/admin/charts/CourseEnrollmentChart'
import RevenueChart from '../../../components/admin/charts/RevenueChart'
import StudentChart from '../../../components/admin/charts/StudentChart'
import { dashboardStats } from '../../../constants/adminDashboard'

function Dashboard() {
 return (
  <Stack spacing={2.5}>
   <Stack
    direction={{ xs: 'column', sm: 'row' }}
    spacing={1.75}
    sx={{
     alignItems: { xs: 'flex-start', sm: 'center' },
     justifyContent: 'space-between',
    }}
   >
    <Box>
     <Typography
      variant="h1"
      sx={{
       color: 'text.primary',
       fontSize: { xs: '1.48rem', md: '1.72rem' },
       fontWeight: 800,
       lineHeight: 1.25,
       letterSpacing: 0,
      }}
     >
      Admin Dashboard
     </Typography>
     <Typography
      color="text.secondary"
      sx={{
       mt: 0.45,
       fontSize: '0.86rem',
       lineHeight: 1.55,
      }}
     >
      Welcome back. Here is what is happening across Praksha Academy today.
     </Typography>
    </Box>

    <Stack
     direction="row"
     spacing={1}
     sx={{
      alignItems: 'center',
      flexWrap: 'wrap',
      rowGap: 1,
     }}
    >
     <Button
      variant="outlined"
      size="small"
      startIcon={<FiRefreshCw size={14} />}
      sx={{
       minHeight: 34,
       borderRadius: 1,
       px: 1.25,
       color: 'text.secondary',
       borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.95)',
       bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1B2A3A' : '#FFFFFF'),
       fontSize: '0.76rem',
       fontWeight: 800,
       textTransform: 'none',
       '&:hover': {
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.4),
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.14 : 0.05),
       },
      }}
     >
      Refresh
     </Button>
     <Typography
      color="primary.contrastText"
      sx={{
       px: 1.25,
       py: 0.7,
       borderRadius: 1,
       bgcolor: 'primary.main',
       fontSize: '0.76rem',
       fontWeight: 800,
       lineHeight: 1.4,
      }}
     >
      Today: Aug 14
     </Typography>
    </Stack>
   </Stack>

   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, minmax(0, 1fr))',
      xl: 'repeat(3, minmax(0, 1fr))',
     },
     gap: 1.75,
    }}
   >
    {dashboardStats.map((stat) => (
     <DashboardCard key={stat.title} {...stat} />
    ))}
   </Box>

   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.38fr) minmax(320px, 0.62fr)' },
     gap: 1.75,
    }}
   >
    <RevenueChart />
    <CourseEnrollmentChart />
   </Box>

   <Box
    sx={{
     display: 'grid',
     gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.12fr) minmax(320px, 0.88fr)' },
     gap: 1.75,
    }}
   >
    <StudentChart />
    <Box sx={{ display: 'grid', gap: 1.75 }}>
     <RecentActivities />
     <UpcomingClasses />
    </Box>
   </Box>
  </Stack>
 )
}

export default Dashboard
