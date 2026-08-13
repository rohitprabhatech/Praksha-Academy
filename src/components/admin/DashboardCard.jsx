import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

const DashboardCard = ({ title, value, icon, trend, trendValue, color }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        boxShadow: theme.shadows[2],
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="text.secondary" variant="subtitle2" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {value}
            </Typography>
            
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography 
                  variant="body2" 
                  color={trend === 'up' ? 'success.main' : 'error.main'}
                  sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                >
                  {trend === 'up' ? '↑' : '↓'} {trendValue}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  vs last month
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: '12px', 
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
