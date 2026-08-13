import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, expected: 2400 },
  { name: 'Feb', revenue: 3000, expected: 1398 },
  { name: 'Mar', revenue: 2000, expected: 9800 },
  { name: 'Apr', revenue: 2780, expected: 3908 },
  { name: 'May', revenue: 1890, expected: 4800 },
  { name: 'Jun', revenue: 2390, expected: 3800 },
  { name: 'Jul', revenue: 3490, expected: 4300 },
];

const RevenueChart = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2], borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Revenue Overview
        </Typography>
        <Box sx={{ width: '100%', height: 300, mt: 3 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke={theme.palette.text.secondary} 
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke={theme.palette.text.secondary} 
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Actual Revenue"
                stroke={theme.palette.primary.main} 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="expected" 
                name="Expected Revenue"
                stroke={theme.palette.secondary.main} 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
