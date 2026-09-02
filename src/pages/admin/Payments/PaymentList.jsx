import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography, TablePagination } from '@mui/material';
import { FiCreditCard } from 'react-icons/fi';
import PageHeader from '../../../components/common/PageHeader';
import { mockPayments } from '../../../constants/mockSprint12';

const PaymentList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getStatusColor = (status) => {
    if (status === 'Success') return { bgcolor: '#e6f4ea', color: '#1e8e3e' };
    if (status === 'Failed') return { bgcolor: '#FEF2F2', color: '#EF4444' };
    return { bgcolor: '#FEF3C7', color: '#D97706' }; // Pending
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <PageHeader moduleName="Sales" title="Payments" subtitle="Review student transaction records." />

      <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>DATE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>STUDENT</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>COURSE / PRODUCT</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>AMOUNT</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ color: '#475569' }}>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{row.studentName}</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{row.courseName}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>₹{row.amount}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" sx={{ ...getStatusColor(row.status), fontWeight: 600, borderRadius: '6px' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25]} component="div" count={mockPayments.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(e, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} />
      </Paper>
    </Box>
  );
};
export default PaymentList;