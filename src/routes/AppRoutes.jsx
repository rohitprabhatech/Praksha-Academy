import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PageLoader from '../components/common/PageLoader'
import MainLayout from '../layouts/MainLayout'

// =========================================================
// LAZY-LOADED PUBLIC / MARKETING PAGES
// =========================================================
const Home = lazy(() => import('../pages/Home'))
const Courses = lazy(() => import('../pages/Courses'))
const CourseDetails = lazy(() => import('../pages/CourseDetails'))
const Programs = lazy(() => import('../pages/Programs'))
const About = lazy(() => import('../pages/About'))
const Blog = lazy(() => import('../pages/Blog'))
const BlogDetail = lazy(() => import('../pages/BlogDetail'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

// =========================================================
// LAZY-LOADED AUTH
// =========================================================
const Login = lazy(() => import('../pages/auth/Login'))
const Signup = lazy(() => import('../pages/auth/Register'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'))
const AccessDenied = lazy(() => import('../pages/auth/AccessDenied'))

// =========================================================
// AUTH GUARDS (Statically imported to avoid route check delays)
// =========================================================
import RequireAuth from '../components/auth/RequireAuth'
import RequireRole from '../components/auth/RequireRole'

// =========================================================
// LAZY-LOADED STUDENT
// =========================================================
import StudentLayout from '../layouts/StudentLayout'
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'))
const MyCourses = lazy(() => import('../pages/student/MyCourses'))
const Wishlist = lazy(() => import('../pages/student/Wishlist'))
const Certificates = lazy(() => import('../pages/student/Certificates'))
const StudentNotifications = lazy(() => import('../pages/student/Notifications'))
const StudentProfile = lazy(() => import('../pages/student/Profile'))

// =========================================================
// LAZY-LOADED TEACHER
// =========================================================
import TeacherLayout from '../layouts/TeacherLayout'
const TeacherDashboard = lazy(() => import('../pages/teacher/Dashboard'))
const TeacherCourses = lazy(() => import('../pages/teacher/Courses'))
const TeacherStudents = lazy(() => import('../pages/teacher/Students'))
const TeacherBatches = lazy(() => import('../pages/teacher/Batches'))
const TeacherClasses = lazy(() => import('../pages/teacher/Classes'))
const TeacherAssignments = lazy(() => import('../pages/teacher/Assignments'))
const TeacherQuizzes = lazy(() => import('../pages/teacher/Quizzes'))
const TeacherExams = lazy(() => import('../pages/teacher/Exams'))
const TeacherMarks = lazy(() => import('../pages/teacher/Marks'))
const TeacherAttendance = lazy(() => import('../pages/teacher/Attendance'))
const TeacherMaterials = lazy(() => import('../pages/teacher/Materials'))
const TeacherNotifications = lazy(() => import('../pages/teacher/Notifications'))
const TeacherProfile = lazy(() => import('../pages/teacher/Profile'))
const TeacherSettings = lazy(() => import('../pages/teacher/Settings'))

// =========================================================
// LAZY-LOADED ADMIN ROUTES
// =========================================================
const AdminRoutes = lazy(() => import('./AdminRoutes'))


function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader minHeight="100vh" label="Loading page..." />}>
      <Routes>

        {/* =========================================================
          PUBLIC / MARKETING
      ========================================================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/courses/:slug"
            element={<CourseDetails />}
          />

          <Route
            path="/programs"
            element={<Programs />}
          />

          <Route
            path="/blog"
            element={<Blog />}
          />

          <Route
            path="/blog/:id"
            element={<BlogDetail />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Route>


        {/* =========================================================
          AUTH
      ========================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />


        {/* =========================================================
          ACCESS DENIED
          Used when an authenticated user has the wrong role.
      ========================================================= */}

        <Route
          path="/access-denied"
          element={<AccessDenied />}
        />


        {/* =========================================================
          STUDENT ROUTES
          
          IMPORTANT:
          These routes require BOTH:
          1. User must be logged in
          2. User must have role === "student"
          
          This prevents:
          Admin  → /student/dashboard
          Teacher → /student/dashboard
          
          from opening the student dashboard.
      ========================================================= */}

        <Route element={<RequireAuth />}>

          <Route
            element={
              <RequireRole allowedRoles="student" />
            }
          >

            <Route element={<StudentLayout />}>

              {/* Student Dashboard */}

              <Route
                path="/student/dashboard"
                element={<StudentDashboard />}
              />

              {/* My Courses */}

              <Route
                path="/student/courses"
                element={<MyCourses />}
              />

              {/* Wishlist */}

              <Route
                path="/student/wishlist"
                element={<Wishlist />}
              />

              {/* Certificates */}

              <Route
                path="/student/certificates"
                element={<Certificates />}
              />

              {/* Notifications */}

              <Route
                path="/student/notifications"
                element={<StudentNotifications />}
              />

              {/* Profile */}

              <Route
                path="/student/profile"
                element={<StudentProfile />}
              />

            </Route>

          </Route>

        </Route>


        {/* =========================================================
          TEACHER ROUTES
          
          Requires BOTH:
          1. User logged in
          2. User role === "teacher"
      ========================================================= */}

        <Route element={<RequireAuth />}>

          <Route
            element={
              <RequireRole allowedRoles="teacher" />
            }
          >

            <Route element={<TeacherLayout />}>

              <Route
                path="/teacher/dashboard"
                element={<TeacherDashboard />}
              />

              <Route
                path="/teacher/courses"
                element={<TeacherCourses />}
              />

              <Route
                path="/teacher/students"
                element={<TeacherStudents />}
              />

              <Route
                path="/teacher/batches"
                element={<TeacherBatches />}
              />

              <Route
                path="/teacher/classes"
                element={<TeacherClasses />}
              />

              <Route
                path="/teacher/assignments"
                element={<TeacherAssignments />}
              />

              <Route
                path="/teacher/quizzes"
                element={<TeacherQuizzes />}
              />

              <Route
                path="/teacher/exams"
                element={<TeacherExams />}
              />

              <Route
                path="/teacher/marks"
                element={<TeacherMarks />}
              />

              <Route
                path="/teacher/attendance"
                element={<TeacherAttendance />}
              />

              <Route
                path="/teacher/materials"
                element={<TeacherMaterials />}
              />

              <Route
                path="/teacher/notifications"
                element={<TeacherNotifications />}
              />

              <Route
                path="/teacher/profile"
                element={<TeacherProfile />}
              />

              <Route
                path="/teacher/settings"
                element={<TeacherSettings />}
              />

            </Route>

          </Route>

        </Route>


        {/* =========================================================
          ADMIN ROUTES
          
          All /admin/* routes are handled by AdminRoutes.
          
          AdminRoutes already uses:
          
          <RequireRole allowedRoles="admin" />
          
          Therefore:
          
          Student → /admin/dashboard → Access Denied
          Teacher → /admin/dashboard → Access Denied
          Admin   → /admin/dashboard → Admin Dashboard
      ========================================================= */}

        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />


        {/* =========================================================
          404
      ========================================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Suspense>
  )
}


export default AppRoutes