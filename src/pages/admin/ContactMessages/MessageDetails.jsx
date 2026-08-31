import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Button,
  Chip,
  Avatar,
  TextField,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  FiArrowLeft,
  FiSend,
  FiMail,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import EmptyState from '../../../components/admin/common/EmptyState';
import ErrorState from '../../../components/admin/common/ErrorState';

import {
  getContactMessageById,
  updateContactMessage,
} from '../../../services/contactMessageService';

const STATUS_COLORS = {
  New: {
    bgcolor: 'rgba(37,99,235,0.1)',
    color: '#2563EB',
  },
  Read: {
    bgcolor: 'rgba(100,116,139,0.1)',
    color: '#64748B',
  },
  Replied: {
    bgcolor: 'rgba(34,197,94,0.1)',
    color: '#16A34A',
  },
};

const MetaItem = ({ icon: Icon, label, value }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
  >
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '8px',
        bgcolor: 'rgba(37,99,235,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={13} color="#2563EB" />
    </Box>

    <Typography
      sx={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8125rem',
        color: '#64748B',
      }}
    >
      <strong style={{ color: '#1E293B' }}>
        {label}:
      </strong>{' '}
      {value || '—'}
    </Typography>
  </Stack>
);

const MessageDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  const loadMessage = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const data = await getContactMessageById(id);

      if (!data) {
        setMessage(null);
        setStatus('success');
        return;
      }

      setMessage(data);
      setStatus('success');
    } catch (err) {
      console.error(
        'Failed to load contact message:',
        err
      );

      setError(
        err?.message ||
          'We could not load this contact message.'
      );

      setStatus('error');
    }
  }, [id]);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  const handleReply = async () => {
    if (!reply.trim()) {
      toast.error('Reply cannot be empty.');
      return;
    }

    if (!message) {
      return;
    }

    setSending(true);

    try {
      const updatedMessage = await updateContactMessage(
        message.id,
        {
          status: 'Replied',
        }
      );

      setMessage(updatedMessage);
      setStatus('success');
      setReply('');

      toast.success('Reply sent successfully!');
    } catch (err) {
      console.error(
        'Failed to send reply:',
        err
      );

      toast.error(
        err?.message ||
          'Failed to send reply. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  const handleMarkRead = async () => {
    if (!message) {
      return;
    }

    try {
      const updatedMessage =
        await updateContactMessage(
          message.id,
          {
            status: 'Read',
          }
        );

      setMessage(updatedMessage);

      toast.info('Message marked as read.');
    } catch (err) {
      console.error(
        'Failed to mark message as read:',
        err
      );

      toast.error(
        err?.message ||
          'Failed to update message.'
      );
    }
  };

  if (status === 'loading') {
    return (
      <Box>
        <PageHeader
          title="Message Details"
          breadcrumbs={[
            { label: 'Admin' },
            {
              label: 'Contact Messages',
              to: '/admin/contact-messages',
            },
            { label: 'Loading...' },
          ]}
        />

        <Box
          sx={{
            minHeight: 360,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            alignItems="center"
            spacing={1.5}
          >
            <CircularProgress
              size={32}
              thickness={3}
              sx={{ color: '#2563EB' }}
            />

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                color: '#64748B',
              }}
            >
              Loading message...
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  }

  if (status === 'error') {
    return (
      <Box>
        <PageHeader
          title="Message Details"
          breadcrumbs={[
            { label: 'Admin' },
            {
              label: 'Contact Messages',
              to: '/admin/contact-messages',
            },
            { label: 'Error' },
          ]}
        />

        <ErrorState
          title="Unable to load message"
          message={
            error ||
            'We could not load this message.'
          }
          onRetry={loadMessage}
        />
      </Box>
    );
  }

  if (!message) {
    return (
      <Box>
        <PageHeader
          title="Message Details"
          breadcrumbs={[
            { label: 'Admin' },
            {
              label: 'Contact Messages',
              to: '/admin/contact-messages',
            },
            { label: 'Not Found' },
          ]}
        />

        <EmptyState
          title="Message not found"
          description="This contact message may have been removed or the link is invalid."
          action={
            <Button
              variant="contained"
              startIcon={<FiArrowLeft size={15} />}
              onClick={() =>
                navigate('/admin/contact-messages')
              }
              sx={{
                mt: 1,
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                borderRadius: '10px',
                bgcolor: '#2563EB',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1D4ED8',
                  boxShadow: 'none',
                },
              }}
            >
              Back to Messages
            </Button>
          }
        />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Message Details"
        breadcrumbs={[
          { label: 'Admin' },
          {
            label: 'Contact Messages',
            to: '/admin/contact-messages',
          },
          {
            label:
              message.subject ||
              'Message',
          },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiArrowLeft size={15} />}
            onClick={() =>
              navigate('/admin/contact-messages')
            }
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              borderColor: '#E2E8F0',
              color: '#64748B',
              '&:hover': {
                borderColor: '#CBD5E1',
              },
            }}
          >
            Back
          </Button>
        }
      />

      <div className="row g-4">
        {/* Message content */}
        <div className="col-12 col-lg-8">
          <Stack spacing={3}>
            {/* Message card */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  bgcolor: '#F8FAFC',
                  borderBottom:
                    '1px solid #E2E8F0',
                }}
              >
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row',
                  }}
                  alignItems={{
                    sm: 'center',
                  }}
                  justifyContent="space-between"
                  spacing={1.5}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#1E293B',
                    }}
                  >
                    {message.subject ||
                      'General Contact Inquiry'}
                  </Typography>

                  <Chip
                    label={
                      message.status ||
                      'New'
                    }
                    size="small"
                    sx={{
                      ...(STATUS_COLORS[
                        message.status
                      ] ||
                        STATUS_COLORS.New),
                      fontFamily:
                        'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </Stack>
              </Box>

              <Box sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ mb: 3 }}
                >
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: '#2563EB',
                      fontSize: '1rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {message.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </Avatar>

                  <Stack spacing={0.25}>
                    <Typography
                      sx={{
                        fontFamily:
                          'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize:
                          '0.9375rem',
                        color: '#1E293B',
                      }}
                    >
                      {message.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily:
                          'Inter, sans-serif',
                        fontSize:
                          '0.8125rem',
                        color: '#94A3B8',
                      }}
                    >
                      {message.email}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography
                  sx={{
                    fontFamily:
                      'Inter, sans-serif',
                    fontSize:
                      '0.9375rem',
                    color: '#334155',
                    lineHeight: 1.85,
                    whiteSpace:
                      'pre-line',
                  }}
                >
                  {message.message}
                </Typography>
              </Box>
            </Box>

            {/* Reply box */}
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border:
                  '1px solid #E2E8F0',
                borderRadius: '16px',
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize:
                    '0.9375rem',
                  color: '#1E293B',
                  mb: 2,
                }}
              >
                Reply
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={5}
                placeholder="Type your reply here…"
                value={reply}
                onChange={(e) =>
                  setReply(e.target.value)
                }
                disabled={sending}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root':
                    {
                      borderRadius:
                        '10px',
                      fontFamily:
                        'Inter, sans-serif',
                      fontSize:
                        '0.9rem',
                      '& fieldset': {
                        borderColor:
                          '#E2E8F0',
                      },
                      '&.Mui-focused fieldset':
                        {
                          borderColor:
                            '#2563EB',
                          borderWidth: 1.5,
                        },
                    },
                }}
              />

              <Button
                variant="contained"
                startIcon={
                  sending ? (
                    <CircularProgress
                      size={15}
                      color="inherit"
                    />
                  ) : (
                    <FiSend size={15} />
                  )
                }
                onClick={handleReply}
                disabled={sending}
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius:
                    '10px',
                  bgcolor: '#2563EB',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor:
                      '#1D4ED8',
                    boxShadow: 'none',
                  },
                }}
              >
                {sending
                  ? 'Sending...'
                  : 'Send Reply'}
              </Button>
            </Box>
          </Stack>
        </div>

        {/* Sidebar */}
        <div className="col-12 col-lg-4">
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border:
                '1px solid #E2E8F0',
              borderRadius: '16px',
              p: 2.5,
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#1E293B',
                mb: 2,
              }}
            >
              Message Info
            </Typography>

            <Stack spacing={1.5}>
              <MetaItem
                icon={FiUser}
                label="Sender"
                value={message.name}
              />

              <MetaItem
                icon={FiMail}
                label="Email"
                value={message.email}
              />

              <MetaItem
                icon={FiCalendar}
                label="Received"
                value={message.date}
              />

              {message.phone && (
                <MetaItem
                  icon={FiUser}
                  label="Phone"
                  value={message.phone}
                />
              )}

              {message.program && (
                <MetaItem
                  icon={FiMail}
                  label="Program"
                  value={message.program}
                />
              )}
            </Stack>

            <Divider
              sx={{
                my: 2.5,
                borderColor: '#F1F5F9',
              }}
            />

            <Typography
              sx={{
                fontFamily:
                  'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#1E293B',
                mb: 1.5,
              }}
            >
              Actions
            </Typography>

            <Stack spacing={1.5}>
              {message.status !== 'Read' &&
                message.status !==
                  'Replied' && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleMarkRead}
                    sx={{
                      fontFamily:
                        'Inter, sans-serif',
                      fontWeight: 600,
                      borderRadius:
                        '10px',
                      borderColor:
                        '#E2E8F0',
                      color: '#64748B',
                      '&:hover': {
                        borderColor:
                          '#CBD5E1',
                      },
                    }}
                  >
                    Mark as Read
                  </Button>
                )}

              <Button
                variant="outlined"
                fullWidth
                onClick={() =>
                  navigate(
                    '/admin/contact-messages'
                  )
                }
                sx={{
                  fontFamily:
                    'Inter, sans-serif',
                  fontWeight: 600,
                  borderRadius:
                    '10px',
                  borderColor:
                    '#E2E8F0',
                  color: '#64748B',
                  '&:hover': {
                    borderColor:
                      '#CBD5E1',
                  },
                }}
              >
                Back to Inbox
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default MessageDetails;