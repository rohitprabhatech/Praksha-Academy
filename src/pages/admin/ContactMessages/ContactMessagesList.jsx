import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  Chip,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { FiEye, FiMail, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import DataTable from '../../../components/admin/common/DataTable';
import EmptyState from '../../../components/admin/common/EmptyState';
import ErrorState from '../../../components/admin/common/ErrorState';

import { getContactMessages } from '../../../services/contactMessageService';

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

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const AVATAR_COLORS = [
  '#2563EB',
  '#7C3AED',
  '#16A34A',
  '#D97706',
  '#DC2626',
];

const ContactMessagesList = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const loadMessages = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const data = await getContactMessages();

      setRows(Array.isArray(data) ? data : []);
      setStatus('success');
    } catch (err) {
      console.error('Failed to load contact messages:', err);

      setError(
        err?.message ||
          'We could not load the contact messages.'
      );

      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const newCount = useMemo(
    () => rows.filter((message) => message.status === 'New').length,
    [rows]
  );

  const repliedCount = useMemo(
    () =>
      rows.filter(
        (message) => message.status === 'Replied'
      ).length,
    [rows]
  );

  const readCount = useMemo(
    () =>
      rows.filter(
        (message) => message.status === 'Read'
      ).length,
    [rows]
  );

  const columns = [
    {
      id: 'name',
      label: 'Sender',
      minWidth: 180,
      render: (val, row) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor:
                AVATAR_COLORS[
                  typeof row.id === 'number'
                    ? row.id % AVATAR_COLORS.length
                    : 0
                ],
              fontSize: '0.8rem',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(val)}
          </Avatar>

          <Stack>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#1E293B',
              }}
            >
              {val}
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: '#94A3B8',
              }}
            >
              {row.email}
            </Typography>
          </Stack>
        </Stack>
      ),
    },

    {
      id: 'subject',
      label: 'Subject',
      minWidth: 220,
      render: (val) => (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#1E293B',
            maxWidth: 260,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {val || 'General Contact Inquiry'}
        </Typography>
      ),
    },

    {
      id: 'date',
      label: 'Date',
      minWidth: 110,
      render: (val) => (
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: val ? '#475569' : '#94A3B8',
          }}
        >
          {val || '—'}
        </Typography>
      ),
    },

    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: (val) => (
        <Chip
          label={val || 'New'}
          size="small"
          sx={{
            ...(STATUS_COLORS[val] || STATUS_COLORS.New),
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
          }}
        />
      ),
    },

    {
      id: 'actions',
      label: 'Actions',
      align: 'right',
      minWidth: 80,
      render: (_, row) => (
        <Button
          size="small"
          variant="text"
          onClick={() =>
            navigate(
              `/admin/contact-messages/${row.id}`
            )
          }
          sx={{
            minWidth: 32,
            p: 0.75,
            color: '#64748B',
            '&:hover': {
              color: '#2563EB',
              bgcolor: 'rgba(37,99,235,0.06)',
            },
            borderRadius: '8px',
          }}
        >
          <FiEye size={15} />
        </Button>
      ),
    },
  ];

  if (status === 'loading') {
    return (
      <Box>
        <PageHeader
          title="Contact Messages"
          subtitle="Loading contact messages..."
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Contact Messages' },
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
              Loading messages...
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
          title="Contact Messages"
          subtitle="Unable to load contact messages."
          breadcrumbs={[
            { label: 'Admin' },
            { label: 'Contact Messages' },
          ]}
        />

        <ErrorState
          title="Unable to load messages"
          message={
            error ||
            'We could not load the contact messages. Please try again.'
          }
          onRetry={loadMessages}
        />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Contact Messages"
        subtitle={`${newCount} new message${
          newCount !== 1 ? 's' : ''
        } awaiting response.`}
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Contact Messages' },
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<FiRefreshCw size={15} />}
            onClick={loadMessages}
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              borderColor: '#E2E8F0',
              color: '#64748B',
              '&:hover': {
                borderColor: '#2563EB',
                color: '#2563EB',
              },
            }}
          >
            Refresh
          </Button>
        }
      />

      {rows.length === 0 ? (
        <EmptyState
          title="No contact messages"
          description="Messages submitted through the public contact form will appear here."
        />
      ) : (
        <>
          {/* Stats */}
          <div className="row g-3 mb-4">
            {[
              {
                label: 'Total Messages',
                value: rows.length,
                color: '#2563EB',
                bg: 'rgba(37,99,235,0.08)',
              },
              {
                label: 'New',
                value: newCount,
                color: '#DC2626',
                bg: 'rgba(239,68,68,0.08)',
              },
              {
                label: 'Read',
                value: readCount,
                color: '#64748B',
                bg: 'rgba(100,116,139,0.08)',
              },
              {
                label: 'Replied',
                value: repliedCount,
                color: '#16A34A',
                bg: 'rgba(34,197,94,0.08)',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="col-12 col-sm-6 col-lg-3"
              >
                <Box
                  sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      bgcolor: stat.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FiMail
                      size={18}
                      color={stat.color}
                    />
                  </Box>

                  <Stack>
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        color: '#1E293B',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8rem',
                        color: '#64748B',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Stack>
                </Box>
              </div>
            ))}
          </div>

          <DataTable
            columns={columns}
            rows={rows}
            searchKey="subject"
            emptyText="No messages found."
          />
        </>
      )}
    </Box>
  );
};

export default ContactMessagesList;