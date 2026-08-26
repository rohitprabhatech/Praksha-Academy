import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Stack, MenuItem, Avatar } from '@mui/material';
import { mockTeachers } from '../../../data/mockTeachers';

const TeacherList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter logic
  const filteredTeachers = mockTeachers.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Teachers</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/admin/teachers/add')}>+ Add Teacher</Button>
      </Stack>

      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" />
          <TextField select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} size="small" sx={{ minWidth: '150px' }}>
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '16px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell>Teacher</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={teacher.profileImage} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{teacher.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{teacher.email}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{teacher.specialization}</TableCell>
                <TableCell>
                  <Chip label={teacher.status} color={teacher.status === 'Active' ? 'success' : 'default'} size="small" />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/admin/teachers/${teacher.id}`)}>View</Button>
                  <Button size="small" onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredTeachers.length === 0 && (
              <TableRow><TableCell colSpan={4} align="center" sx={{ py: 4 }}>No teachers found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherList;