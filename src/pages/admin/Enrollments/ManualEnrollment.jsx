import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, TextField, MenuItem, Button, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageHeader from '../../../components/common/PageHeader';
import { mockCourses } from '../../../constants/mockSprint10';

// Fallback dummy students if Sprint 05 data isn't imported yet
const dummyStudents = [
  { id: 'stu1', name: 'John Doe' },
  { id: 'stu2', name: 'Jane Smith' }
];

const schema = yup.object().shape({
  studentId: yup.string().required('Please select a student'),
  courseId: yup.string().required('Please select a course/product'),
  batchId: yup.string().nullable(),
});

const ManualEnrollment = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ open: false, message: '' });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // In a real app, you would check for duplicates via API here
    setToast({ open: true, message: 'Student successfully enrolled!' });
    setTimeout(() => navigate('/admin/enrollments'), 1500);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}>
      <PageHeader moduleName="Sales" title="Manual Enrollment" subtitle="Assign a student to a course directly." />

      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0', borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Select Student" defaultValue="" inputProps={register('studentId')} error={!!errors.studentId} helperText={errors.studentId?.message}>
                {dummyStudents.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Select Course (Product)" defaultValue="" inputProps={register('courseId')} error={!!errors.courseId} helperText={errors.courseId?.message}>
                {mockCourses.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Batch (Optional)" defaultValue="" inputProps={register('batchId')}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="b1">Morning Batch</MenuItem>
                <MenuItem value="b2">Evening Batch</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/admin/enrollments')} sx={{ borderRadius: '8px' }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#2563EB', borderRadius: '8px' }}>Enroll Student</Button>
          </Box>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ open: false, message: '' })}>
        <Alert severity="success" sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};
export default ManualEnrollment;