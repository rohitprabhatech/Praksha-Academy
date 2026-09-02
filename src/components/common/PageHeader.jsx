import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PageHeader = ({ moduleName, title, subtitle, actionButton }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
      <Box>
        <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
          Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>{moduleName}</Box>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionButton && (
        <Button 
          variant="contained" 
          startIcon={actionButton.icon} 
          onClick={actionButton.onClick} 
          sx={{ bgcolor: '#2563EB', borderRadius: '8px', textTransform: 'none', px: 3, py: 1.2, fontWeight: 600, boxShadow: 'none', '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' } }}
        >
          {actionButton.label}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;