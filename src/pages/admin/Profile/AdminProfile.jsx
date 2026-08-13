import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Avatar } from '@mui/material';

const AdminProfile = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Profile
      </Typography>
      <Card sx={{ mt: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>A</Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">Super Admin</Typography>
              <Typography variant="body1" color="text.secondary">admin@prakshaacademy.com</Typography>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue="Super"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue="Admin"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="admin@prakshaacademy.com"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                defaultValue="+1 234 567 8900"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" size="large" sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminProfile;
