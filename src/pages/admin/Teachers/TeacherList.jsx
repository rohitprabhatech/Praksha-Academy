import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
import { FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { mockTeachers } from '../../../constants/mockTeachers';

const TeacherList = () => {
  const navigate = useNavigate();
  
  const [teachers, setTeachers] = useState(mockTeachers || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (isConfirmed) {
      setTeachers((prevTeachers) => prevTeachers.filter((t) => t.id !== id));
      const index = mockTeachers.findIndex((t) => t.id === id);
      if (index !== -1) mockTeachers.splice(index, 1);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Active') {
      return { bgcolor: '#e6f4ea', color: '#1e8e3e' }; // Green
    }
    return { bgcolor: '#fff3e0', color: '#e65100' }; // Orange
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      
      {/* ── Page Header ──────────────────────────────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography sx={{ color: '#64748B', fontSize: '0.875rem', mb: 1 }}>
            Admin <Box component="span" sx={{ mx: 0.5 }}>/</Box> <Box component="span" sx={{ color: '#2563EB', fontWeight: 500 }}>Teachers</Box>
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
            Teachers
          </Typography>
          <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
            Manage all educational staff for the academy.
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={() => navigate('/admin/teachers/add')}
          sx={{
            bgcolor: '#2563EB',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 3,
            py: 1.2,
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#1D4ED8', boxShadow: 'none' },
          }}
        >
          Add Teacher
        </Button>
      </Box>

      {/* ── Table Card ──────────────────────────────────────── */}
      <Paper 
        elevation={0} 
        sx={{ 
          border: '1px solid #E2E8F0', 
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #E2E8F0' }}>
          <TextField
            placeholder="Search by name..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              width: 300,
              '& .MuiOutlinedInput-root': { borderRadius: '8px' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch color="#94A3B8" />
                </InputAdornment>
              ),
            }}
          />
          
          <Chip 
            label={`${filteredTeachers.length} results`}
            sx={{ 
              bgcolor: '#EFF6FF', 
              color: '#2563EB', 
              fontWeight: 600, 
              borderRadius: '8px' 
            }} 
            size="small"
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            {/* Added Light Gray Background to TableHead */}
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', py: 2, px: 3 }}>TEACHER NAME</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', py: 2, px: 3 }}>SUBJECT</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', py: 2, px: 3 }}>PHONE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', py: 2, px: 3 }}>STATUS</TableCell>
                <TableCell align="right" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', py: 2, px: 3 }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((teacher) => (
                  <TableRow 
                    key={teacher.id} 
                    hover 
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '& td': { py: 2.5, px: 3 } // Increased horizontal padding (px) and vertical (py)
                    }}
                  >
                    
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          variant="rounded"
                          src={teacher.profileImage || undefined}
                          sx={{ 
                            width: 42, 
                            height: 42, 
                            bgcolor: '#EFF6FF', 
                            color: '#2563EB',
                            fontWeight: 600,
                            borderRadius: '8px'
                          }}
                        >
                          {teacher.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: '#1E293B', fontSize: '0.875rem' }}>
                            {teacher.name}
                          </Typography>
                          <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                            {teacher.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ color: '#475569', fontSize: '0.875rem' }}>
                      {teacher.subject || '-'}
                    </TableCell>

                    <TableCell sx={{ color: '#475569', fontSize: '0.875rem' }}>
                      {teacher.phone || '-'}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={teacher.status || 'Active'}
                        size="small"
                        sx={{
                          ...getStatusColor(teacher.status || 'Active'),
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          height: 26,
                          borderRadius: '6px',
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton size="small" onClick={() => navigate(`/admin/teachers/${teacher.id}`)} sx={{ color: '#94A3B8', '&:hover': { color: '#2563EB', bgcolor: '#EFF6FF' } }}>
                          <FiEye size={18} />
                        </IconButton>
                        <IconButton size="small" onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)} sx={{ color: '#94A3B8', '&:hover': { color: '#2563EB', bgcolor: '#EFF6FF' } }}>
                          <FiEdit2 size={18} />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(teacher.id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', bgcolor: '#FEF2F2' } }}>
                          <FiTrash2 size={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTeachers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid #E2E8F0', color: '#64748B' }}
        />
      </Paper>
    </Box>
  );
};

export default TeacherList;