import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography, TablePagination } from '@mui/material';
import { FiUserPlus, FiLayers } from 'react-icons/fi';
import PageHeader from '../../../components/common/PageHeader';
import { mockEnrollments } from '../../../constants/mockSprint12';

const EnrollmentList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <PageHeader 
        moduleName="Sales" 
        title="Enrollments" 
        subtitle="Manage student course registrations."
        actionButton={{ label: 'Manual Enroll', icon: <FiUserPlus />, onClick: () => navigate('/admin/enrollments/manual') }}
      />

      <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>DATE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>STUDENT</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>COURSE / PRODUCT</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockEnrollments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ color: '#475569' }}>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{row.studentName}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{row.courseName}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" sx={{ bgcolor: row.status === 'Active' ? '#e6f4ea' : '#F1F5F9', color: row.status === 'Active' ? '#1e8e3e' : '#475569', fontWeight: 600, borderRadius: '6px' }} />
                  </TableCell>
                </TableRow>
              ))}
              {mockEnrollments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <FiLayers size={48} color="#CBD5E1" />
                    <Typography sx={{ mt: 2, color: '#64748B' }}>No enrollments found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25]} component="div" count={mockEnrollments.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(e, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} />
      </Paper>
    </Box>
  );
};
export default EnrollmentList;