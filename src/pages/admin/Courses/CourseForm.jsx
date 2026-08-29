import { Box, Button, CircularProgress, Stack, Typography, Grid, TextField, MenuItem, InputLabel, FormControl, Select, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminSurface from '../../../components/admin/common/AdminSurface';

const CourseForm = ({ defaultValues, onSubmit, isLoading, options }) => {
  const navigate = useNavigate();
  const { teachers = [], classes = [], subjects = [] } = options || {};
  const [thumbnailPreview, setThumbnailPreview] = useState(defaultValues?.thumbnail || null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      classId: '',
      subjectId: '',
      teacherId: '',
      description: '',
      price: '',
      discountPrice: '',
      duration: '',
      language: '',
      courseType: '',
      status: 'Draft',
      ...defaultValues,
    },
  });

  const price = watch('price');

  const onThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (data) => {
    // Inject the thumbnail preview/file string if needed
    const submissionData = { ...data, thumbnail: thumbnailPreview };
    
    // Parse numeric fields
    if (submissionData.price) submissionData.price = Number(submissionData.price);
    if (submissionData.discountPrice) submissionData.discountPrice = Number(submissionData.discountPrice);

    onSubmit(submissionData);
  };

  // If no teachers exist, show empty state
  if (options && teachers.length === 0) {
    return (
      <AdminSurface sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>No Teachers Available</Typography>
        <Typography sx={{ color: '#64748B', mb: 3 }}>You must add a teacher before creating a course.</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/admin/teachers/add')}
          sx={{
            bgcolor: '#2563EB',
            '&:hover': { bgcolor: '#1D4ED8' },
          }}
        >
          Add a teacher first
        </Button>
      </AdminSurface>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Basic Info */}
            <AdminSurface sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}>Basic Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Course Name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Course Name"
                        fullWidth
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Category"
                        fullWidth
                        size="small"
                        error={!!errors.category}
                        helperText={errors.category?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="courseType"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth size="small">
                        <InputLabel>Course Type</InputLabel>
                        <Select {...field} label="Course Type">
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="Recorded">Recorded</MenuItem>
                          <MenuItem value="Live">Live</MenuItem>
                          <MenuItem value="Hybrid">Hybrid</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Language"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Duration (e.g. 3 Months)"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </AdminSurface>

            {/* Pricing */}
            <AdminSurface sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}>Pricing</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="price"
                    control={control}
                    rules={{ 
                      min: { value: 0, message: 'Price cannot be negative' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Regular Price (₹)"
                        fullWidth
                        size="small"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="discountPrice"
                    control={control}
                    rules={{ 
                      min: { value: 0, message: 'Discount cannot be negative' },
                      validate: (value) => {
                        if (!value || !price) return true;
                        return Number(value) <= Number(price) || 'Discount price must be less than or equal to regular price';
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Discount Price (₹)"
                        fullWidth
                        size="small"
                        error={!!errors.discountPrice}
                        helperText={errors.discountPrice?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </AdminSurface>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Teacher & Academic */}
            <AdminSurface sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}>Assignment</Typography>
              <Stack spacing={2}>
                <Controller
                  name="teacherId"
                  control={control}
                  rules={{ required: 'Teacher is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" error={!!errors.teacherId}>
                      <InputLabel>Teacher *</InputLabel>
                      <Select {...field} label="Teacher *">
                        <MenuItem value="" disabled>Select Teacher</MenuItem>
                        {teachers.map(t => (
                          <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                        ))}
                      </Select>
                      {errors.teacherId && <FormHelperText>{errors.teacherId.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
                
                <Controller
                  name="classId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel>Class</InputLabel>
                      <Select {...field} label="Class">
                        <MenuItem value="">None</MenuItem>
                        {classes.map(c => (
                          <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="subjectId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel>Subject</InputLabel>
                      <Select {...field} label="Subject">
                        <MenuItem value="">None</MenuItem>
                        {subjects.map(s => (
                          <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Stack>
            </AdminSurface>

            {/* Status */}
            <AdminSurface sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}>Status</Typography>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <FormControl fullWidth size="small" error={!!errors.status}>
                    <InputLabel>Status *</InputLabel>
                    <Select {...field} label="Status *">
                      <MenuItem value="Draft">Draft</MenuItem>
                      <MenuItem value="Published">Published</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </AdminSurface>

            {/* Media */}
            <AdminSurface sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}>Media</Typography>
              <Stack spacing={2}>
                {thumbnailPreview && (
                  <Box
                    component="img"
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 1 }}
                  />
                )}
                <Button variant="outlined" component="label" fullWidth sx={{ textTransform: 'none' }}>
                  {thumbnailPreview ? 'Change Thumbnail' : 'Upload Thumbnail'}
                  <input type="file" hidden accept="image/*" onChange={onThumbnailChange} />
                </Button>
              </Stack>
            </AdminSurface>
          </Stack>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/admin/courses')}
              disabled={isLoading}
              sx={{ borderColor: '#E2E8F0', color: '#64748B', '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' } }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isLoading}
              sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
              startIcon={isLoading && <CircularProgress size={16} color="inherit" />}
            >
              {isLoading ? 'Saving...' : 'Save Course'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseForm;
