import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../../../components/admin/common/PageHeader';
import StudentForm from './StudentForm';
import { useStudents } from '../../../context/StudentsContext';
const AddStudent = () => { const navigate = useNavigate(); const { addStudent } = useStudents(); return <Box><PageHeader title="Add Student" subtitle="Create a student profile and enrolment record." breadcrumbs={[{ label: 'Admin' }, { label: 'Students', to: '/admin/students' }, { label: 'Add Student' }]} /><Box sx={{ maxWidth: 850, p: { xs: 2, sm: 3 }, bgcolor: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px' }}><StudentForm submitLabel="Save Student" onCancel={() => navigate('/admin/students')} onSubmit={(data) => { addStudent(data); toast.success('Student added successfully.'); navigate('/admin/students'); }} /></Box></Box>; };
export default AddStudent;
