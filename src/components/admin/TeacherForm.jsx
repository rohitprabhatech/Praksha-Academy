import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Stack, Avatar, Typography, Paper, Grid } from '@mui/material';

const TeacherForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    specialization: '',
    subject: '',
    bio: '',
    status: 'Active',
    ...initialData
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.profileImage || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, profileImageFile: imageFile });
  };

  return (
    <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0', borderRadius: '16px' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Image Upload Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
            <Avatar src={imagePreview} sx={{ width: 80, height: 80 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Profile Image</Typography>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Box>
          </Box>

          {/* Form Fields */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Status" name="status" value={formData.status} onChange={handleChange} required>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            variant="outlined"
            value={formData.subject || ''}
            onChange={handleChange}
            placeholder="e.g. Mathematics, Physics"
            required
          />
        </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} label="Bio" name="bio" value={formData.bio} onChange={handleChange} />
            </Grid>
          </Grid>

          {/* Actions */}
          {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: '1px solid #E2E8F0' }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 3,
            py: 1.2,
            borderColor: '#E2E8F0',
            color: '#64748B',
            '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' }
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#2563EB',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 4,
            py: 1.2,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' }
          }}
        >
          Save Teacher
        </Button>
      </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default TeacherForm;