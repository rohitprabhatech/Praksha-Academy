import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Divider,
  useTheme
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import PaymentIcon from '@mui/icons-material/Payment';
import SchoolIcon from '@mui/icons-material/School';

const activities = [
  { id: 1, text: 'New student enrolled in React Basics', time: '5 mins ago', icon: <PersonAddIcon />, color: 'primary' },
  { id: 2, text: 'Payment received for Advanced Node.js', time: '1 hour ago', icon: <PaymentIcon />, color: 'success' },
  { id: 3, text: 'New course "UI/UX Design" published', time: '3 hours ago', icon: <PlayLessonIcon />, color: 'info' },
  { id: 4, text: '5 students completed Python Mastery', time: '1 day ago', icon: <SchoolIcon />, color: 'warning' },
];

const RecentActivities = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2], borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Activities
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: `${activity.color}.light`, color: `${activity.color}.main` }}>
                    {activity.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight={500} color="text.primary">
                      {activity.text}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {activity.time}
                    </Typography>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
