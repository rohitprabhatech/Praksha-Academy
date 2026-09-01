import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Button, Chip, Typography, Skeleton } from '@mui/material';
import { FiPlus, FiTrash2, FiBell } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

import PageHeader from '../../../components/admin/common/PageHeader';
import DataTable from '../../../components/admin/common/DataTable';
import AdminModal from '../../../components/admin/common/AdminModal';
import EmptyState from '../../../components/admin/common/EmptyState';
import ErrorState from '../../../components/admin/common/ErrorState';

import {
  getNotifications,
  deleteNotification,
} from '../../../services/notificationService';

const TYPE_COLORS = {
  Info: {
    bgcolor: 'rgba(37,99,235,0.1)',
    color: '#2563EB',
  },
  Warning: {
    bgcolor: 'rgba(245,158,11,0.1)',
    color: '#D97706',
  },
  Success: {
    bgcolor: 'rgba(34,197,94,0.1)',
    color: '#16A34A',
  },
  Alert: {
    bgcolor: 'rgba(239,68,68,0.1)',
    color: '#DC2626',
  },
};

const STATUS_COLORS = {
  Sent: {
    bgcolor: 'rgba(34,197,94,0.1)',
    color: '#16A34A',
  },
  Scheduled: {
    bgcolor: 'rgba(37,99,235,0.1)',
    color: '#2563EB',
  },
  Draft: {
    bgcolor: 'rgba(100,116,139,0.1)',
    color: '#64748B',
  },
};

const NotificationList = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getNotifications();

      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      setError(
        err?.message || 'Unable to load notifications.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await deleteNotification(deleteTarget.id);

      setRows((prev) =>
        prev.filter(
          (row) =>
            String(row.id) !== String(deleteTarget.id)
        )
      );

      toast.success('Notification deleted.');
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete notification:', err);

      toast.error(
        err?.message || 'Failed to delete notification.'
      );
    } finally {
      setDeleting(false);
    }
  };

  const sentCount = rows.filter(
    (row) => row.status === 'Sent'
  ).length;

  const scheduledCount = rows.filter(
    (row) => row.status === 'Scheduled'
  ).length;

  const columns = [
    {
      id: 'title',
      label: 'Title',
      minWidth: 240,
      render: (val) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: 'rgba(37,99,235,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FiBell size={14} color="#2563EB" />
          </Box>

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
        </Stack>
      ),
    },

    {
      id: 'type',
      label: 'Type',
      minWidth: 100,
      render: (val) => (
        <Chip
          label={val}
          size="small"
          sx={{
            ...(TYPE_COLORS[val] ?? {}),
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
          }}
        />
      ),
    },

    {
      id: 'audience',
      label: 'Audience',
      minWidth: 120,
    },

    {
      id: 'scheduled',
      label: 'Date',
      minWidth: 110,
    },

    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: (val) => (
        <Chip
          label={val}
          size="small"
          sx={{
            ...(STATUS_COLORS[val] ?? {}),
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
          onClick={() => setDeleteTarget(row)}
          disabled={deleting}
          sx={{
            minWidth: 32,
            p: 0.75,
            color: '#64748B',
            '&:hover': {
              color: '#EF4444',
              bgcolor: 'rgba(239,68,68,0.06)',
            },
            borderRadius: '8px',
          }}
        >
          <FiTrash2 size={15} />
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Notifications"
        subtitle="Send and manage notifications to users."
        breadcrumbs={[
          { label: 'Admin' },
          { label: 'Notifications' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus size={16} />}
            onClick={() =>
              navigate('/admin/notifications/create')
            }
            sx={{
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
            New Notification
          </Button>
        }
      />

      {loading ? (
        <>
          <div className="row g-3 mb-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="col-12 col-sm-4"
              >
                <Box
                  sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    p: 2,
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    height={56}
                  />
                </Box>
              </div>
            ))}
          </div>

          <Box
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              p: 3,
            }}
          >
            <Stack spacing={2}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton
                  key={item}
                  variant="rounded"
                  height={52}
                />
              ))}
            </Stack>
          </Box>
        </>
      ) : error ? (
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
          }}
        >
          <ErrorState
            title="Unable to load notifications"
            message={error}
            onRetry={loadNotifications}
          />
        </Box>
      ) : rows.length === 0 ? (
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
          }}
        >
          <EmptyState
            title="No notifications found"
            description="Create your first notification to get started."
            action={
              <Button
                variant="contained"
                startIcon={<FiPlus size={16} />}
                onClick={() =>
                  navigate('/admin/notifications/create')
                }
                sx={{
                  mt: 1,
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
                New Notification
              </Button>
            }
          />
        </Box>
      ) : (
        <>
          {/* Quick stats */}
          <div className="row g-3 mb-4">
            {[
              {
                label: 'Total',
                value: rows.length,
                color: '#2563EB',
                bg: 'rgba(37,99,235,0.08)',
              },
              {
                label: 'Sent',
                value: sentCount,
                color: '#16A34A',
                bg: 'rgba(34,197,94,0.08)',
              },
              {
                label: 'Scheduled',
                value: scheduledCount,
                color: '#D97706',
                bg: 'rgba(245,158,11,0.08)',
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="col-12 col-sm-4"
              >
                <Box
                  component={motion.div}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
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
                    <FiBell
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
            searchKey="title"
            emptyText="No notifications found."
          />
        </>
      )}

      <AdminModal
        open={!!deleteTarget}
        onClose={() =>
          !deleting && setDeleteTarget(null)
        }
        onConfirm={handleDelete}
        title="Delete Notification"
        message={`Delete "${deleteTarget?.title}"?`}
        confirmLabel={
          deleting ? 'Deleting...' : 'Delete'
        }
        variant="danger"
      />
    </Box>
  );
};

export default NotificationList;