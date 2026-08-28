import React from 'react';
import { Box, Button, TextField, MenuItem, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { mockCourses } from '../../../constants/mockSprint10';
import { mockTeachers } from '../../../constants/mockTeachers';

// 1. Define the Validation Rules
const schema = yup.object().shape({
  name: yup.string().required('Class name is required'),
  status: yup.string().required('Status is required'),
  courseId: yup.string().required('Please select a course'),
  teacherId: yup.string().required('Please select a teacher'),
  date: yup.string().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string()
    .required('End time is required')
    .test('is-greater', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      return startTime < value;
    }),
  meetingLink: yup.string().url('Must be a valid URL (e.g., https://zoom.us/...)').nullable(),
});

const LiveClassForm = ({ initialData, onSubmit, onCancel }) => {
  // 2. Initialize React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: '', teacherId: '', courseId: '', date: '', 
      startTime: '', endTime: '', meetingLink: '', status: 'Scheduled'
    }
  });

  return (
    // handleSubmit automatically blocks submission for errors
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <TextField 
            fullWidth label="Class Name" 
            {...register('name')} 
            error={!!errors.name} 
            helperText={errors.name?.message} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField 
            select fullWidth label="Status" 
            defaultValue={initialData?.status || "Scheduled"}
            inputProps={register('status')} 
            error={!!errors.status} helperText={errors.status?.message}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField 
            select fullWidth label="Course" 
            defaultValue={initialData?.courseId || ""}
            inputProps={register('courseId')} 
            error={!!errors.courseId} helperText={errors.courseId?.message}
          >
            {mockCourses.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField 
            select fullWidth label="Assigned Teacher" 
            defaultValue={initialData?.teacherId || ""}
            inputProps={register('teacherId')} 
            error={!!errors.teacherId} helperText={errors.teacherId?.message}
          >
            {mockTeachers?.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField 
            fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} 
            {...register('date')} error={!!errors.date} helperText={errors.date?.message} 
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField 
            fullWidth type="time" label="Start Time" InputLabelProps={{ shrink: true }} 
            {...register('startTime')} error={!!errors.startTime} helperText={errors.startTime?.message} 
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField 
            fullWidth type="time" label="End Time" InputLabelProps={{ shrink: true }} 
            {...register('endTime')} error={!!errors.endTime} helperText={errors.endTime?.message} 
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            fullWidth type="url" label="Meeting Link (Zoom, Meet, Teams)" 
            {...register('meetingLink')} error={!!errors.meetingLink} helperText={errors.meetingLink?.message} 
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: '1px solid #E2E8F0' }}>
        <Button variant="outlined" onClick={onCancel} sx={{ borderRadius: '8px', textTransform: 'none', px: 3 }}>Cancel</Button>
        <Button type="submit" variant="contained" sx={{ borderRadius: '8px', bgcolor: '#2563EB', textTransform: 'none', px: 3, boxShadow: 'none' }}>Save Class</Button>
      </Box>
    </form>
  );
};
export default LiveClassForm;