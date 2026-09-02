import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, IconButton, Typography, TablePagination 
} from '@mui/material';
import { FiPlus, FiTrash2, FiTag } from 'react-icons/fi';
import PageHeader from '../../../components/common/PageHeader';
import { mockCoupons } from '../../../constants/mockSprint12';

const CouponList = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState(mockCoupons);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <PageHeader 
        moduleName="Sales" 
        title="Discount Coupons" 
        subtitle="Manage promotional codes and discounts."
        actionButton={{ label: 'Create Coupon', icon: <FiPlus />, onClick: () => navigate('/admin/coupons/create') }}
      />

      <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>COUPON CODE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>DISCOUNT VALUE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>EXPIRY DATE</TableCell>
                <TableCell sx={{ color: '#64748B', fontWeight: 700 }}>STATUS</TableCell>
                <TableCell align="right" sx={{ color: '#64748B', fontWeight: 700 }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 800, color: '#1E293B', letterSpacing: 1 }}>{row.code}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2563EB' }}>{row.discount}%</TableCell>
                  <TableCell sx={{ color: '#475569' }}>{row.expiry || 'No Expiry'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.status} size="small" 
                      sx={{ 
                        bgcolor: row.status === 'Active' ? '#e6f4ea' : '#FEF2F2', 
                        color: row.status === 'Active' ? '#1e8e3e' : '#EF4444', 
                        fontWeight: 600, borderRadius: '6px' 
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', bgcolor: '#FEF2F2' } }}>
                      <FiTrash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {coupons.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <FiTag size={48} color="#CBD5E1" />
                    <Typography sx={{ mt: 2, color: '#64748B' }}>No coupons created yet.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          rowsPerPageOptions={[10, 25]} component="div" count={coupons.length} 
          rowsPerPage={rowsPerPage} page={page} 
          onPageChange={(e, newPage) => setPage(newPage)} 
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} 
        />
      </Paper>
    </Box>
  );
};

export default CouponList;