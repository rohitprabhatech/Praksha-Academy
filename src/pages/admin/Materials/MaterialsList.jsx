import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, Typography, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton,
  TextField, MenuItem, TablePagination, Stack, InputAdornment, Snackbar, Alert
} from '@mui/material';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, FiFolderMinus } from 'react-icons/fi';
import { mockMaterials, mockCourses } from '../../../constants/mockSprint10';

const MaterialsList = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState(mockMaterials || []);
  
  // Table Features State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCourse, setFilterCourse] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Snackbar State
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Filtering Logic
  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || m.type === filterType;
    const matchesCourse = filterCourse === 'All' || m.courseId === filterCourse;
    return matchesSearch && matchesType && matchesCourse;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setMaterials((prev) => prev.filter((m) => m.id !== id));
      setToast({ open: true, message: 'Material deleted successfully', severity: 'success' });
    }
  };

  const getStatusColor = (status) => 
    status === 'Published' ? { bgcolor: '#e6f4ea', color: '#1e8e3e' } : { bgcolor: '#F1F5F9', color: '#475569' };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* ── Header ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
            Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Study Materials</Box>
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>Study Materials</Typography>
        </Box>
        <Button variant="contained" startIcon={<FiPlus />} onClick={() => navigate('/admin/materials/add')} sx={{ bgcolor: '#2563EB', borderRadius: '8px', textTransform: 'none', px: 3, py: 1.2, fontWeight: 600, boxShadow: 'none' }}>
          Add Material
        </Button>
      </Box>

      {/* ── Table Card ── */}
      <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
        
        {/* Filters Toolbar */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ p: 2, borderBottom: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
          <TextField
            size="small"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><FiSearch color="#94A3B8" /></InputAdornment> }}
            sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField select size="small" value={filterType} onChange={(e) => setFilterType(e.target.value)} sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <MenuItem value="All">All Types</MenuItem>
            {['PDF', 'Notes', 'PPT', 'Videos', 'Documents'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField select size="small" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <MenuItem value="All">All Courses</MenuItem>
            {mockCourses.map(c => <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>)}
          </TextField>
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>TITLE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>COURSE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>TYPE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>STATUS</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>DATE</TableCell>
                <TableCell align="right" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', py: 2, px: 3 }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMaterials.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                <TableRow key={item.id} hover sx={{ '& td': { py: 2.5, px: 3 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{item.title}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{mockCourses?.find(c => c.id === item.courseId)?.title}</TableCell>
                  <TableCell><Chip label={item.type} size="small" sx={{ borderRadius: '6px', bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600 }} /></TableCell>
                  <TableCell><Chip label={item.status} size="small" sx={{ ...getStatusColor(item.status), borderRadius: '6px', fontWeight: 600 }} /></TableCell>
                  <TableCell sx={{ color: '#475569', fontSize: '0.875rem' }}>{item.date}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => item.url ? window.open(item.url, '_blank') : alert("No URL attached.")} sx={{ color: '#94A3B8', mr: 0.5, '&:hover': { color: '#2563EB', bgcolor: '#EFF6FF' } }}><FiEye size={18} /></IconButton>
                    <IconButton size="small" onClick={() => navigate(`/admin/materials/${item.id}/edit`)} sx={{ color: '#94A3B8', mr: 0.5, '&:hover': { color: '#2563EB', bgcolor: '#EFF6FF' } }}><FiEdit2 size={18} /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item.id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', bgcolor: '#FEF2F2' } }}><FiTrash2 size={18} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
              {/* ── Empty State ── */}
              {filteredMaterials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <FiFolderMinus size={48} color="#CBD5E1" />
                    <Typography sx={{ mt: 2, color: '#64748B', fontWeight: 500 }}>No materials found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMaterials.length}
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

export default MaterialsList;