import { Box } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../../../components/admin/common/PageHeader';
import StudentForm from './StudentForm';
import { useStudents } from '../../../context/StudentsContext';
import { StudentLoader } from '../../../components/admin/common/StudentStates';
const EditStudent = () => { const { id } = useParams(); const navigate = useNavigate(); const { students, loading, updateStudent } = useStudents(); const student = students.find((item) => item.id === id); if (loading) return <StudentLoader />; if (!student) return <Navigate to="/admin/students" replace />; return <Box><PageHeader title="Edit Student" subtitle={`Update ${student.firstName} ${student.lastName}'s profile.`} breadcrumbs={[{ label: 'Admin' }, { label: 'Students', to: '/admin/students' }, { label: 'Edit Student' }]} /><Box sx={{ maxWidth: 850, p: { xs: 2, sm: 3 }, bgcolor: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px' }}><StudentForm student={student} submitLabel="Save Changes" onCancel={() => navigate(`/admin/students/${id}`)} onSubmit={(data) => { updateStudent(id, data); toast.success('Student details updated.'); navigate(`/admin/students/${id}`); }} /></Box></Box>; };
export default EditStudent;
