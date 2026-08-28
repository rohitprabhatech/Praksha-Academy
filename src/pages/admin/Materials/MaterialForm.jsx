import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Grid, Typography } from '@mui/material';
import { FiUploadCloud } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { mockCourses } from '../../../constants/mockSprint10';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  courseId: yup.string().required('Please select a course'),
  type: yup.string().required('Material type is required'),
  status: yup.string().required('Status is required'),
  url: yup.string().when('type', {
    is: 'Videos',
    then: () => yup.string().url('Must be a valid video URL').required('Video URL is required'),
    otherwise: () => yup.string().nullable()
  })
});

const MaterialForm = ({ initialData, onSubmit, onCancel }) => {
  const [fileName, setFileName] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || { title: '', type: 'PDF', courseId: '', url: '', status: 'Published' }
  });

  // Watch the "type" field to dynamically change the UI
  const selectedType = watch('type');
  const isVideo = selectedType === 'Videos';

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      
      //  Create a temporary local URL for the uploaded file!
      const localPreviewUrl = URL.createObjectURL(file);
      
      // Save this (temporary) URL in form
      setValue('url', localPreviewUrl, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            fullWidth label="Title" 
            {...register('title')} error={!!errors.title} helperText={errors.title?.message} 
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField 
            select fullWidth label="Course" 
            defaultValue={initialData?.courseId || ""}
            inputProps={register('courseId')} error={!!errors.courseId} helperText={errors.courseId?.message}
          >
            {mockCourses.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField 
            select fullWidth label="Type" 
            defaultValue={initialData?.type || "PDF"}
            inputProps={register('type')} error={!!errors.type} helperText={errors.type?.message}
          >
            {['PDF', 'Notes', 'PPT', 'Videos', 'Documents'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField 
            select fullWidth label="Status" 
            defaultValue={initialData?.status || "Published"}
            inputProps={register('status')} error={!!errors.status} helperText={errors.status?.message}
          >
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          {isVideo ? (
            <TextField 
              fullWidth label="Video Link URL" placeholder="https://youtube.com/..." 
              {...register('url')} error={!!errors.url} helperText={errors.url?.message} 
            />
          ) : (
            <Box sx={{ border: '2px dashed #CBD5E1', borderRadius: '8px', p: 4, textAlign: 'center', bgcolor: '#F8FAFC' }}>
              <input accept=".pdf,.doc,.docx,.ppt,.pptx" style={{ display: 'none' }} id="file-upload" type="file" onChange={handleFileUpload} />
              <label htmlFor="file-upload">
                <Button component="span" variant="outlined" startIcon={<FiUploadCloud />} sx={{ borderRadius: '8px', textTransform: 'none', mb: 1 }}>
                  Upload File
                </Button>
              </label>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                {fileName ? `Selected: ${fileName}` : "Supported formats: PDF, DOC, PPT (Max 10MB)"}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button variant="outlined" onClick={onCancel} sx={{ borderRadius: '8px', textTransform: 'none' }}>Cancel</Button>
        <Button type="submit" variant="contained" sx={{ borderRadius: '8px', bgcolor: '#2563EB', textTransform: 'none' }}>Save Material</Button>
      </Box>
    </form>
  );
};
export default MaterialForm;