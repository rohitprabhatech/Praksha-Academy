import { useMemo, useState } from 'react';
import { Box, Button, Chip, IconButton, InputAdornment, MenuItem, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { FiEdit2, FiEye, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../../../components/admin/common/PageHeader';
import AdminModal from '../../../components/admin/common/AdminModal';
import { StudentEmptyState, StudentErrorState, StudentLoader } from '../../../components/admin/common/StudentStates';
import { STUDENT_CLASSES } from '../../../data/students';
import { useStudents } from '../../../context/StudentsContext';

const StudentList = () => {
  const navigate = useNavigate(); const { students, loading, error, retry, deleteStudent } = useStudents();
  const [search, setSearch] = useState(''); const [status, setStatus] = useState('All'); const [studentClass, setStudentClass] = useState('All'); const [target, setTarget] = useState(null);
  const rows = useMemo(() => students.filter((student) => {
    const needle = search.trim().toLowerCase(); const matchesSearch = !needle || [student.id, student.firstName, student.lastName, student.email, student.phone].join(' ').toLowerCase().includes(needle);
    return matchesSearch && (status === 'All' || student.status === status) && (studentClass === 'All' || student.class === studentClass);
  }), [students, search, status, studentClass]);
  const clear = () => { setSearch(''); setStatus('All'); setStudentClass('All'); };
  const remove = () => { deleteStudent(target.id); toast.success(`${target.firstName} ${target.lastName} was deleted.`); setTarget(null); };
  return <Box><PageHeader title="Student Management" subtitle="Manage student profiles, enrolment information and status." breadcrumbs={[{ label: 'Admin' }, { label: 'Students' }]} action={<Button variant="contained" startIcon={<FiPlus />} onClick={() => navigate('/admin/students/add')}>Add Student</Button>} />
    {loading ? <StudentLoader /> : error ? <StudentErrorState onRetry={retry} /> : <Box sx={{ bgcolor: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ p: 2 }}><TextField size="small" placeholder="Search by name, ID, email or phone" value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><FiSearch color="#94A3B8" /></InputAdornment> }} sx={{ flex: 1 }} /><TextField select size="small" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ minWidth: 140 }}><MenuItem value="All">All statuses</MenuItem><MenuItem value="Active">Active</MenuItem><MenuItem value="Inactive">Inactive</MenuItem></TextField><TextField select size="small" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} sx={{ minWidth: 140 }}><MenuItem value="All">All classes</MenuItem>{STUDENT_CLASSES.map((item) => <MenuItem key={item} value={item}>Class {item}</MenuItem>)}</TextField></Stack>
      {rows.length === 0 ? <StudentEmptyState filtered={students.length > 0} onAdd={() => navigate('/admin/students/add')} onClear={clear} /> : <Box sx={{ overflowX: 'auto' }}><Table sx={{ minWidth: 880 }}><TableHead><TableRow sx={{ bgcolor: '#F8FAFC' }}>{['Student ID', 'Student Name', 'Email', 'Phone', 'Class', 'Parent / Guardian', 'Status', 'Actions'].map((label) => <TableCell key={label} sx={{ fontWeight: 700, fontSize: '.73rem', color: '#64748B', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</TableCell>)}</TableRow></TableHead><TableBody>{rows.map((student) => <TableRow key={student.id} hover><TableCell>{student.id}</TableCell><TableCell sx={{ fontWeight: 600 }}>{student.firstName} {student.lastName}</TableCell><TableCell>{student.email}</TableCell><TableCell>{student.phone}</TableCell><TableCell>{student.class}-{student.section}</TableCell><TableCell>{student.parentName}</TableCell><TableCell><Chip label={student.status} size="small" color={student.status === 'Active' ? 'success' : 'default'} /></TableCell><TableCell><Stack direction="row"><IconButton aria-label={`View ${student.firstName}`} onClick={() => navigate(`/admin/students/${student.id}`)}><FiEye size={17} /></IconButton><IconButton aria-label={`Edit ${student.firstName}`} onClick={() => navigate(`/admin/students/${student.id}/edit`)}><FiEdit2 size={16} /></IconButton><IconButton aria-label={`Delete ${student.firstName}`} onClick={() => setTarget(student)} color="error"><FiTrash2 size={16} /></IconButton></Stack></TableCell></TableRow>)}</TableBody></Table></Box>}
    </Box>}<AdminModal open={!!target} onClose={() => setTarget(null)} onConfirm={remove} title="Delete student" message={target ? `Are you sure you want to delete ${target.firstName} ${target.lastName}? This cannot be undone.` : ''} confirmLabel="Delete" /></Box>;
};
export default StudentList;
