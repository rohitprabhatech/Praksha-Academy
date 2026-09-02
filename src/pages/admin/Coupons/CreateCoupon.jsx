import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Grid, TextField, MenuItem, Button, Snackbar, Alert, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageHeader from '../../../components/common/PageHeader';

// Validation requirements based on Sprint 12 specs
const schema = yup.object().shape({
  code: yup.string().required('Coupon code is required').uppercase(),
  discount: yup.number()
    .typeError('Discount must be a number')
    .required('Discount value is required')
    .min(0, 'Discount cannot be negative'),
  expiry: yup.string().nullable(),
  status: yup.string().required('Status is required'),
});

const CreateCoupons = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ open: false, message: '' });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { code: '', discount: '', expiry: '', status: 'Active' }
  });

  const onSubmit = (data) => {
    // Mock save operation
    setToast({ open: true, message: 'Coupon created successfully!' });
    setTimeout(() => navigate('/admin/coupons'), 1500);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}>
      <PageHeader 
        moduleName="Sales" 
        title="Create Coupon" 
        subtitle="Generate a new discount code for your students." 
      />

      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0', borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth label="Coupon Code" placeholder="e.g. SUMMER20"
                inputProps={{ style: { textTransform: 'uppercase' }, ...register('code') }} 
                error={!!errors.code} helperText={errors.code?.message} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth type="number" label="Discount Value" placeholder="20"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                {...register('discount')} error={!!errors.discount} helperText={errors.discount?.message} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth type="date" label="Expiry Date (Optional)" InputLabelProps={{ shrink: true }}
                {...register('expiry')} error={!!errors.expiry} helperText={errors.expiry?.message} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                select fullWidth label="Status" defaultValue="Active"
                inputProps={register('status')} error={!!errors.status} helperText={errors.status?.message}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
              </TextField>
            </Grid>

          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/admin/coupons')} sx={{ borderRadius: '8px' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#2563EB', borderRadius: '8px' }}>
              Save Coupon
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ open: false, message: '' })}>
        <Alert severity="success" sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateCoupons;