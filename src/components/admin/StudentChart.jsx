import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { name: 'Jan', enrollments: 400, completions: 240 },
  { name: 'Feb', enrollments: 300, completions: 139 },
  { name: 'Mar', enrollments: 200, completions: 980 },
  { name: 'Apr', enrollments: 278, completions: 390 },
  { name: 'May', enrollments: 189, completions: 480 },
  { name: 'Jun', enrollments: 239, completions: 380 },
  { name: 'Jul', enrollments: 349, completions: 430 },
];

const StudentChart = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2], borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Student Enrollments & Completions
        </Typography>
        <Box sx={{ width: '100%', height: 300, mt: 3 }}>
          <ResponsiveContainer>
            <BarChart
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
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  borderRadius: '8px'
                }}
                cursor={{ fill: theme.palette.action.hover }}
              />
              <Legend />
              <Bar 
                dataKey="enrollments" 
                name="New Enrollments"
                fill={theme.palette.primary.main} 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
              <Bar 
                dataKey="completions" 
                name="Course Completions"
                fill={theme.palette.info.main} 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentChart;
