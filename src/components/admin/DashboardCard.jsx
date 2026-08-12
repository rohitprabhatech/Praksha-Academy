import { Box, Stack, Typography } from '@mui/material'
import { FiMoreVertical, FiTrendingUp } from 'react-icons/fi'
import AdminSurface from './common/AdminSurface'

function DashboardCard({ title, value, change, detail, trend = 'up' }) {
 const trendColor = trend === 'up' ? 'success.main' : 'text.secondary'

 return (
  <AdminSurface sx={{ p: 2.25, height: '100%', boxShadow: 'none' }}>
   <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography color="text.secondary" sx={{ fontSize: '0.82rem', fontWeight: 700 }}>
      {title}
    </Typography>
    <Box sx={{ color: 'text.secondary', opacity: 0.75 }}>
     <FiMoreVertical size={16} aria-hidden="true" />
    </Box>
   </Stack>
   <Typography
    component="strong"
    sx={{ display: 'block', mt: 1.2, fontSize: { xs: '1.65rem', md: '1.8rem' }, fontWeight: 800, lineHeight: 1.15 }}
   >
    {value}
   </Typography>
   <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mt: 1.5, color: trendColor }}>
    {trend === 'up' && <FiTrendingUp size={14} aria-hidden="true" />}
    <Typography sx={{ color: trendColor, fontSize: '0.8125rem', fontWeight: 800 }}>{change}</Typography>
    <Typography color="text.secondary" sx={{ fontSize: '0.8125rem' }}>
     {detail}
    </Typography>
   </Stack>
  </AdminSurface>
 )
}

export default DashboardCard
