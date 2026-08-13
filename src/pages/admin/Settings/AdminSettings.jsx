import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Switch, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Divider
} from '@mui/material';

const AdminSettings = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Settings
      </Typography>
      <Card sx={{ mt: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <List>
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText 
                primary={<Typography variant="h6">Email Notifications</Typography>}
                secondary="Receive daily summary emails."
              />
              <ListItemSecondaryAction sx={{ pr: 2 }}>
                <Switch defaultChecked color="primary" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText 
                primary={<Typography variant="h6">New Student Alerts</Typography>}
                secondary="Get notified when a new student enrolls."
              />
              <ListItemSecondaryAction sx={{ pr: 2 }}>
                <Switch defaultChecked color="primary" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText 
                primary={<Typography variant="h6">System Maintenance Mode</Typography>}
                secondary="Disable access to the platform for all non-admin users."
              />
              <ListItemSecondaryAction sx={{ pr: 2 }}>
                <Switch color="error" />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminSettings;
