import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import NotFound from '../pages/NotFound';
import RequireRole from '../components/auth/RequireRole';

// ── Core pages ────────────────────────────────────────────────────────────────
const AdminLogin = lazy(() => import('../pages/admin/Login/AdminLogin'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard/Dashboard'));
const AdminProfile = lazy(() => import('../pages/admin/Profile/AdminProfile'));
const AdminSettings = lazy(() => import('../pages/admin/Settings/AdminSettings'));

// ── Blog ─────────────────────────────────────────────────────────────────────
const BlogList = lazy(() => import('../pages/admin/Blog/BlogList'));
const CreateBlog = lazy(() => import('../pages/admin/Blog/CreateBlog'));
const EditBlog = lazy(() => import('../pages/admin/Blog/EditBlog'));
const BlogDetails = lazy(() => import('../pages/admin/Blog/BlogDetails'));

// ── Courses ──────────────────────────────────────────────────────────────────
const CourseList = lazy(() => import('../pages/admin/Courses/CourseList'));
const AddCourse = lazy(() => import('../pages/admin/Courses/AddCourse'));
const EditCourse = lazy(() => import('../pages/admin/Courses/EditCourse'));
const CourseDetails = lazy(() => import('../pages/admin/Courses/CourseDetails'));

const Curriculum = lazy(() => import('../pages/admin/Curriculum/Curriculum'));


// ── Gallery ───────────────────────────────────────────────────────────────────
const GalleryList = lazy(() => import('../pages/admin/Gallery/GalleryList'));
const AddImage = lazy(() => import('../pages/admin/Gallery/AddImage'));
const AddVideo = lazy(() => import('../pages/admin/Gallery/AddVideo'));

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQList = lazy(() => import('../pages/admin/FAQ/FAQList'));
const AddFAQ = lazy(() => import('../pages/admin/FAQ/AddFAQ'));
const EditFAQ = lazy(() => import('../pages/admin/FAQ/EditFAQ'));

// ── Testimonials ──────────────────────────────────────────────────────────────
const TestimonialsList = lazy(() => import('../pages/admin/Testimonials/TestimonialsList'));
const AddTestimonial = lazy(() => import('../pages/admin/Testimonials/AddTestimonial'));
const EditTestimonial = lazy(() => import('../pages/admin/Testimonials/EditTestimonial'));

// ── Notifications ─────────────────────────────────────────────────────────────
const NotificationList = lazy(() => import('../pages/admin/Notifications/NotificationList'));
const CreateNotification = lazy(() => import('../pages/admin/Notifications/CreateNotification'));

// ── Contact Messages ──────────────────────────────────────────────────────────
const ContactMessagesList = lazy(() => import('../pages/admin/ContactMessages/ContactMessagesList'));
const MessageDetails = lazy(() => import('../pages/admin/ContactMessages/MessageDetails'));

// ── Reports ───────────────────────────────────────────────────────────────────
const StudentReports = lazy(() => import('../pages/admin/Reports/StudentReports'));
const CourseReports = lazy(() => import('../pages/admin/Reports/CourseReports'));
const RevenueReports = lazy(() => import('../pages/admin/Reports/RevenueReports'));
const PerformanceReports = lazy(() => import('../pages/admin/Reports/PerformanceReports'));

//teacher routes
const TeacherList = lazy(() => import("../pages/admin/Teachers/TeacherList"));
const AddTeacher = lazy(() => import("../pages/admin/Teachers/AddTeacher"));
const EditTeacher = lazy(() => import("../pages/admin/Teachers/EditTeacher"));
const TeacherDetails = lazy(() => import("../pages/admin/Teachers/TeacherDetails"));

//Material routes
const MaterialsList = lazy(() => import('../pages/admin/Materials/MaterialsList'));
const AddMaterial = lazy(() => import('../pages/admin/Materials/AddMaterial'));
const EditMaterial = lazy(() => import('../pages/admin/Materials/EditMaterial'));

//Live classes route
const LiveClassList = lazy(() => import('../pages/admin/LiveClasses/LiveClassList'));
const EditLiveClass = lazy(() => import('../pages/admin/LiveClasses/EditLiveClass'));
const ScheduleClass = lazy(() => import('../pages/admin/LiveClasses/ScheduleClass'));

// ── Assignments ─────────────────────────────────────────────
const AssignmentList = lazy(() => import('../pages/admin/Assignments/AssignmentList'));
const CreateAssignment = lazy(() => import('../pages/admin/Assignments/CreateAssignment'));
const AssignmentDetails = lazy(() => import('../pages/admin/Assignments/AssignmentDetails'));
const AssignmentSubmissions = lazy(() => import('../pages/admin/Assignments/AssignmentSubmissions'));

// ── Quizzes ─────────────────────────────────────────────
const QuizList = lazy(() => import('../pages/admin/Quizzes/QuizList'));
const CreateQuiz = lazy(() => import('../pages/admin/Quizzes/CreateQuiz'));
const QuizQuestions = lazy(() => import('../pages/admin/Quizzes/QuizQuestions'));
const QuizResults = lazy(() => import('../pages/admin/Quizzes/QuizResults'));

// ── Exams ─────────────────────────────────────────────
const ExamList = lazy(() => import('../pages/admin/Exams/ExamList'));
const CreateExam = lazy(() => import('../pages/admin/Exams/CreateExam'));
const ExamQuestions = lazy(() => import('../pages/admin/Exams/ExamQuestions'));
const ExamResults = lazy(() => import('../pages/admin/Exams/ExamResults'));

/**
 * AdminRoutes
 *
 * All /admin/* routes share the AdminLayout shell.
 *
 * Access control:
 * - Admin login is public.
 * - All other /admin/* pages require an authenticated admin user.
 * - Students/teachers are redirected to /access-denied.
 */
function AdminRoutes() {
  return (
    <Routes>
      {/* ─────────────────────────────────────────────────────────────
          Admin Login
          Kept outside authentication/role protection.
      ───────────────────────────────────────────────────────────── */}
      <Route path="login" element={<AdminLogin />} />

      {/* ─────────────────────────────────────────────────────────────
          Protected Admin Routes
          Only users with role === "admin" can access these routes.
      ───────────────────────────────────────────────────────────── */}
      <Route element={<RequireRole allowedRoles="admin" />}>
        <Route element={<AdminLayout />}>
          {/* /admin → /admin/dashboard */}
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          {/* ── Overview ───────────────────────────────────────────── */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* ── Settings ──────────────────────────────────────────── */}
          <Route
            path="profile"
            element={<AdminProfile />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

          {/* ── Blog ──────────────────────────────────────────────── */}
          <Route
            path="blog"
            element={<BlogList />}
          />

          <Route
            path="blog/create"
            element={<CreateBlog />}
          />

          <Route
            path="blog/:id/edit"
            element={<EditBlog />}
          />

          <Route
            path="blog/:id"
            element={<BlogDetails />}
          />
          <Route
            path="teachers"
            element={<TeacherList />}
          />
          <Route
            path="teachers/add"
            element={<AddTeacher />}
          />
          <Route
            path="teachers/:id/edit"
            element={<EditTeacher />}
          />
          <Route
            path="teachers/:id"
            element={<TeacherDetails />}
          />

          {/* ── Assignments ─────────────────────────────────────────── */}
          <Route
            path="assignments"
            element={<AssignmentList />}
          />

          <Route
            path="assignments/create"
            element={<CreateAssignment />}
          />

          <Route
            path="assignments/:id"
            element={<AssignmentDetails />}
          />

          <Route
            path="assignments/:id/submissions"
            element={<AssignmentSubmissions />}
          />

          {/* ── Quizzes ───────────────────────────────────────────── */}
          <Route
            path="quizzes"
            element={<QuizList />}
          />

          <Route
            path="quizzes/create"
            element={<CreateQuiz />}
          />

          <Route
            path="quizzes/:id/questions"
            element={<QuizQuestions />}
          />

          <Route
            path="quizzes/:id/results"
            element={<QuizResults />}
          />

          {/* ── Exams ───────────────────────────────────────────── */}
          <Route
            path="exams"
            element={<ExamList />}
          />

          <Route
            path="exams/create"
            element={<CreateExam />}
          />

          <Route
            path="exams/:id/questions"
            element={<ExamQuestions />}
          />

          <Route
            path="exams/:id/results"
            element={<ExamResults />}
          />

          {/* ── Courses ───────────────────────────────────────────── */}
          <Route
            path="courses"
            element={<CourseList />}
          />

          <Route
            path="courses/add"
            element={<AddCourse />}
          />

          <Route
            path="courses/:id/edit"
            element={<EditCourse />}
          />

          <Route
            path="courses/:id"
            element={<CourseDetails />}
          />

          <Route
            path="courses/:id/curriculum"
            element={<Curriculum />}
          />

          {/* ── Gallery ───────────────────────────────────────────── */}
          <Route
            path="gallery"
            element={<GalleryList />}
          />

          <Route
            path="gallery/add-image"
            element={<AddImage />}
          />

          <Route
            path="gallery/add-video"
            element={<AddVideo />}
          />

          {/* ── FAQ ───────────────────────────────────────────────── */}
          <Route
            path="faq"
            element={<FAQList />}
          />

          <Route
            path="faq/add"
            element={<AddFAQ />}
          />

          <Route
            path="faq/:id/edit"
            element={<EditFAQ />}
          />

          {/* ── Testimonials ─────────────────────────────────────── */}
          <Route
            path="testimonials"
            element={<TestimonialsList />}
          />

          <Route
            path="testimonials/add"
            element={<AddTestimonial />}
          />

          <Route
            path="testimonials/:id/edit"
            element={<EditTestimonial />}
          />

          {/* ── Notifications ────────────────────────────────────── */}
          <Route
            path="notifications"
            element={<NotificationList />}
          />

          <Route
            path="notifications/create"
            element={<CreateNotification />}
          />

          {/* ── Contact Messages ─────────────────────────────────── */}
          <Route
            path="contact-messages"
            element={<ContactMessagesList />}
          />

          <Route
            path="contact-messages/:id"
            element={<MessageDetails />}
          />

          {/* ── Reports ───────────────────────────────────────────── */}
          <Route
            path="reports/students"
            element={<StudentReports />}
          />

          <Route
            path="reports/courses"
            element={<CourseReports />}
          />

          <Route
            path="reports/revenue"
            element={<RevenueReports />}
          />

          <Route
            path="reports/performance"
            element={<PerformanceReports />}
          />
       

        {/* ── Materials ───────────────────────────────────────── */}
<Route path="materials"element={<MaterialsList />}/>
<Route path="materials/add" element={<AddMaterial />}/>
<Route path="materials/:id/edit" element={<EditMaterial />} />

{/* ── Live Classes ────────────────────────────────────── */}
<Route path="live-classes" element={<LiveClassList />} />
<Route path="live-classes/schedule" element={<ScheduleClass />} />
<Route path="live-classes/:id/edit" element={<EditLiveClass />} />
      </Route>
       </Route>

      {/* ─────────────────────────────────────────────────────────────
          Unknown /admin/* route
          This stays OUTSIDE RequireRole.
      ───────────────────────────────────────────────────────────── */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AdminRoutes;
