import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import { createNotification } from '../../../services/notificationService';

const TYPES = ['Info', 'Warning', 'Success', 'Alert'];

const AUDIENCES = [
  'All Users',
  'Students',
  'Teachers',
  'Specific User',
];

const STATUS_OPTIONS = [
  'Draft',
  'Scheduled',
  'Send Now',
];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',

    '& fieldset': {
      borderColor: '#E2E8F0',
    },

    '&:hover fieldset': {
      borderColor: '#CBD5E1',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#2563EB',
      borderWidth: 1.5,
    },
  },

  '& .MuiInputLabel-root': {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
  },
};

const CreateNotification = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      message: '',
      type: 'Info',
      audience: 'All Users',
      scheduledDate: '',
      status: 'Draft',
    },
  });

  const selectedStatus = watch('status');

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      await createNotification(data);

      if (data.status === 'Send Now') {
        toast.success('Notification sent successfully!');
      } else if (data.status === 'Scheduled') {
        toast.success('Notification scheduled successfully!');
      } else {
        toast.success('Notification saved successfully!');
      }

      navigate('/admin/notifications');
    } catch (error) {
      console.error(
        'Failed to create notification:',
        error
      );

      toast.error(
        error?.message ||
          'Failed to create notification.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Create Notification"
        subtitle="Compose and send or schedule a notification for users."
        breadcrumbs={[
          { label: 'Admin' },
          {
            label: 'Notifications',
            to: '/admin/notifications',
          },
          { label: 'Create' },
        ]}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack spacing={3}>
            {/* Notification Content */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  mb: 2.5,
                }}
              >
                Notification Content
              </Typography>

              <Stack spacing={2.5}>
                <TextField
                  label="Title *"
                  fullWidth
                  {...register('title', {
                    required: 'Title is required',
                    validate: (value) =>
                      value.trim().length > 0 ||
                      'Title is required',
                  })}
                  error={!!errors.title}
                  helperText={
                    errors.title?.message
                  }
                  sx={fieldSx}
                />

                <TextField
                  label="Message *"
                  fullWidth
                  multiline
                  rows={5}
                  {...register('message', {
                    required: 'Message is required',
                    validate: (value) =>
                      value.trim().length > 0 ||
                      'Message is required',
                  })}
                  error={!!errors.message}
                  helperText={
                    errors.message?.message
                  }
                  sx={fieldSx}
                />
              </Stack>
            </Box>

            {/* Delivery Settings */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#1E293B',
                  mb: 2.5,
                }}
              >
                Delivery Settings
              </Typography>

              <Stack spacing={2.5}>
                <div className="row g-3">
                  {/* Type */}
                  <div className="col-12 col-sm-6">
                    <Controller
                      name="type"
                      control={control}
                      rules={{
                        required: 'Type is required',
                      }}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.type}
                          sx={fieldSx}
                        >
                          <InputLabel>
                            Type
                          </InputLabel>

                          <Select
                            {...field}
                            label="Type"
                            input={
                              <OutlinedInput label="Type" />
                            }
                          >
                            {TYPES.map((type) => (
                              <MenuItem
                                key={type}
                                value={type}
                              >
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </div>

                  {/* Audience */}
                  <div className="col-12 col-sm-6">
                    <Controller
                      name="audience"
                      control={control}
                      rules={{
                        required:
                          'Audience is required',
                      }}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.audience}
                          sx={fieldSx}
                        >
                          <InputLabel>
                            Audience
                          </InputLabel>

                          <Select
                            {...field}
                            label="Audience"
                            input={
                              <OutlinedInput label="Audience" />
                            }
                          >
                            {AUDIENCES.map(
                              (audience) => (
                                <MenuItem
                                  key={audience}
                                  value={audience}
                                >
                                  {audience}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </div>
                </div>

                <div className="row g-3">
                  {/* Schedule */}
                  <div className="col-12 col-sm-6">
                    <TextField
                      label="Schedule Date & Time"
                      fullWidth
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register(
                        'scheduledDate'
                      )}
                      sx={fieldSx}
                    />
                  </div>

                  {/* Action */}
                  <div className="col-12 col-sm-6">
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          sx={fieldSx}
                        >
                          <InputLabel>
                            Action
                          </InputLabel>

                          <Select
                            {...field}
                            label="Action"
                            input={
                              <OutlinedInput label="Action" />
                            }
                          >
                            {STATUS_OPTIONS.map(
                              (status) => (
                                <MenuItem
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </div>
                </div>

                {/* Small helper text */}
                <Box
                  sx={{
                    bgcolor:
                      'rgba(37,99,235,0.05)',
                    border:
                      '1px solid rgba(37,99,235,0.12)',
                    borderRadius: '10px',
                    px: 2,
                    py: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize: '0.78rem',
                      color: '#64748B',
                      lineHeight: 1.5,
                    }}
                  >
                    {selectedStatus ===
                    'Send Now'
                      ? 'This notification will be saved as Sent immediately.'
                      : selectedStatus ===
                        'Scheduled'
                      ? 'This notification will be saved with Scheduled status.'
                      : 'This notification will be saved as a Draft.'}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Actions */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="outlined"
                disabled={saving}
                onClick={() =>
                  navigate(
                    '/admin/notifications'
                  )
                }
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  borderColor: '#E2E8F0',
                  color: '#64748B',
                  minWidth: 110,
                  '&:hover': {
                    borderColor: '#CBD5E1',
                    bgcolor: '#F8FAFC',
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={
                  <FiSend size={15} />
                }
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius: '10px',
                  bgcolor: '#2563EB',
                  boxShadow: 'none',
                  minWidth: 170,
                  '&:hover': {
                    bgcolor: '#1D4ED8',
                    boxShadow: 'none',
                  },
                }}
              >
                {saving
                  ? 'Saving...'
                  : 'Save Notification'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateNotification;