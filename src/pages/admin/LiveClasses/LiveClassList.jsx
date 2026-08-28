import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton,
  TextField, MenuItem, TablePagination, Stack, InputAdornment, Snackbar, Alert
} from '@mui/material';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiSearch, FiCalendar } from 'react-icons/fi';
import { mockLiveClasses, mockCourses } from '../../../constants/mockSprint10';

const LiveClassList = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState(mockLiveClasses || []);

  // Table Features State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Snackbar State
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Filtering Logic
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'All' || cls.courseId === filterCourse;
    const matchesStatus = filterStatus === 'All' || cls.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel and delete this live class?")) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
      setToast({ open: true, message: 'Live class deleted successfully', severity: 'success' });
    }
  };

  // Status badge styling helper
  const getStatusColor = (status) => {
    if (status === 'Completed') return { bgcolor: '#e6f4ea', color: '#1e8e3e' }; // Green
    if (status === 'Cancelled') return { bgcolor: '#FEF2F2', color: '#EF4444' }; // Red
    return { bgcolor: '#EFF6FF', color: '#2563EB' }; // Blue for Scheduled
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* ── Header ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
            Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Live Classes</Box>
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>Live Classes</Typography>
        </Box>
        <Button variant="contained" startIcon={<FiPlus />} onClick={() => navigate('/admin/live-classes/schedule')} sx={{ bgcolor: '#2563EB', borderRadius: '8px', textTransform: 'none', px: 3, py: 1.2, fontWeight: 600, boxShadow: 'none' }}>
          Schedule Class
        </Button>
      </Box>

      {/* ── Table Card ── */}
      <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
        
        {/* Filters Toolbar */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ p: 2, borderBottom: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
          <TextField
            size="small"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><FiSearch color="#94A3B8" /></InputAdornment> }}
            sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField select size="small" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <MenuItem value="All">All Courses</MenuItem>
            {mockCourses.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
          </TextField>
          <TextField select size="small" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>CLASS NAME</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>COURSE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>SCHEDULE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>STATUS</TableCell>
                <TableCell align="right" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cls) => (
                <TableRow key={cls.id} hover sx={{ '& td': { py: 2.5, px: 3 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{cls.name}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>
                    {mockCourses?.find(c => c.id === cls.courseId)?.title || 'Unknown'}
                  </TableCell>
                  <TableCell sx={{ color: '#475569' }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#1E293B' }}>{cls.date}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8' }}>{cls.startTime} - {cls.endTime}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={cls.status} size="small" sx={{ ...getStatusColor(cls.status), borderRadius: '6px', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => cls.meetingLink ? window.open(cls.meetingLink, '_blank') : alert("No meeting link provided.")} 
                      sx={{ color: '#94A3B8', mr: 0.5, '&:hover': { color: '#2563EB', bgcolor: '#EFF6FF' } }}
                    >
                      <FiExternalLink size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => navigate(`/admin/live-classes/${cls.id}/edit`)} sx={{ color: '#94A3B8', mr: 0.5, '&:hover': { color: '#2563EB', bgcolor: '#EFF6FF' } }}>
                      <FiEdit2 size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(cls.id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', bgcolor: '#FEF2F2' } }}>
                      <FiTrash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {/* ── Empty State ── */}
              {filteredClasses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <FiCalendar size={48} color="#CBD5E1" />
                    <Typography sx={{ mt: 2, color: '#64748B', fontWeight: 500 }}>No live classes found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredClasses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          sx={{ borderTop: '1px solid #E2E8F0' }}
        />
      </Paper>

      {/* ── Toast Notification ── */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%', borderRadius: '8px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LiveClassList;