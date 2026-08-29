import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Chip, Avatar, CircularProgress, Typography } from '@mui/material';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';

import PageHeader from '../../../components/admin/common/PageHeader';
import DataTable from '../../../components/admin/common/DataTable';
import AdminModal from '../../../components/admin/common/AdminModal';
import { getCourses, deleteCourse } from '../../../services/courseService';

const STATUS_COLORS = {
  Published: { bgcolor: 'rgba(34,197,94,0.1)', color: '#16A34A' },
  Draft: { bgcolor: 'rgba(245,158,11,0.1)', color: '#D97706' },
  Inactive: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
};

const CourseList = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourses();
      setRows(data);
    } catch (err) {
      console.error('Failed to load courses:', err);
      setError('Failed to load courses. Please try again.');
      toast.error('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCourse(deleteTarget.id);
      setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      toast.success('Course deleted successfully.');
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete course:', err);
      toast.error('Failed to delete course.');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      id: 'name',
      label: 'Course Name',
      minWidth: 200,
      render: (val, row) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            variant="rounded"
            src={row.thumbnail}
            sx={{ width: 40, height: 40, bgcolor: 'rgba(37,99,235,0.08)', borderRadius: '8px', fontSize: '0.9rem', color: '#2563EB', fontWeight: 700 }}
          >
            {val.charAt(0)}
          </Avatar>
          <Box>
            <Box sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1E293B' }}>{val}</Box>
            <Box sx={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#94A3B8' }}>{row.category}</Box>
          </Box>
        </Stack>
      ),
    },
    { id: 'className', label: 'Class', minWidth: 100 },
    { 
      id: 'teacher', 
      label: 'Teacher', 
      minWidth: 130,
      render: (val) => val?.name || 'Unassigned'
    },
    { 
      id: 'price', 
      label: 'Price', 
      minWidth: 100,
      render: (val, row) => (
        <Box>
          {row.discountPrice && row.discountPrice < val ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>₹{row.discountPrice}</Typography>
              <Typography sx={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.75rem' }}>₹{val}</Typography>
            </Stack>
          ) : (
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>₹{val}</Typography>
          )}
        </Box>
      )
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
      minWidth: 130,
      render: (_, row) => (
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Button size="small" variant="text" onClick={() => navigate(`/admin/courses/${row.id}`)}
            sx={{ minWidth: 32, p: 0.75, color: '#64748B', '&:hover': { color: '#2563EB', bgcolor: 'rgba(37,99,235,0.06)' }, borderRadius: '8px' }}>
            <FiEye size={15} />
          </Button>
          <Button size="small" variant="text" onClick={() => navigate(`/admin/courses/${row.id}/edit`)}
            sx={{ minWidth: 32, p: 0.75, color: '#64748B', '&:hover': { color: '#F59E0B', bgcolor: 'rgba(245,158,11,0.06)' }, borderRadius: '8px' }}>
            <FiEdit2 size={15} />
          </Button>
          <Button size="small" variant="text" onClick={() => setDeleteTarget(row)}
            sx={{ minWidth: 32, p: 0.75, color: '#64748B', '&:hover': { color: '#EF4444', bgcolor: 'rgba(239,68,68,0.06)' }, borderRadius: '8px' }}>
            <FiTrash2 size={15} />
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Courses"
        subtitle="Manage all educational courses for the academy."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Courses' }]}
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus size={16} />}
            onClick={() => navigate('/admin/courses/add')}
            sx={{
              bgcolor: '#2563EB',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              borderRadius: '10px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' },
            }}
          >
            Add Course
          </Button>
        }
      />
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={32} />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
          <Button variant="outlined" onClick={fetchCourses}>Retry</Button>
        </Box>
      ) : (
        <DataTable columns={columns} rows={rows} searchKey="name" emptyText="No courses yet." />
      )}

      <AdminModal
        open={!!deleteTarget}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        variant="danger"
        disabled={isDeleting}
      />
    </Box>
  );
};

export default CourseList;
