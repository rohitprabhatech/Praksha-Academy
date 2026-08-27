import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import NotFound from '../pages/NotFound';
import RequireRole from '../components/auth/RequireRole';

// ── Core pages ────────────────────────────────────────────────────────────────
import AdminLogin from '../pages/admin/Login/AdminLogin';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import AdminProfile from '../pages/admin/Profile/AdminProfile';
import AdminSettings from '../pages/admin/Settings/AdminSettings';

// ── Blog ─────────────────────────────────────────────────────────────────────
import BlogList from '../pages/admin/Blog/BlogList';
import CreateBlog from '../pages/admin/Blog/CreateBlog';
import EditBlog from '../pages/admin/Blog/EditBlog';
import BlogDetails from '../pages/admin/Blog/BlogDetails';

// ── Courses ──────────────────────────────────────────────────────────────────
import CourseList from '../pages/admin/Courses/CourseList'
import AddCourse from '../pages/admin/Courses/AddCourse'
import EditCourse from '../pages/admin/Courses/EditCourse'
import CourseDetails from '../pages/admin/Courses/CourseDetails'

// ── Gallery ───────────────────────────────────────────────────────────────────
import GalleryList from '../pages/admin/Gallery/GalleryList';
import AddImage from '../pages/admin/Gallery/AddImage';
import AddVideo from '../pages/admin/Gallery/AddVideo';

// ── FAQ ───────────────────────────────────────────────────────────────────────
import FAQList from '../pages/admin/FAQ/FAQList';
import AddFAQ from '../pages/admin/FAQ/AddFAQ';
import EditFAQ from '../pages/admin/FAQ/EditFAQ';

// ── Testimonials ──────────────────────────────────────────────────────────────
import TestimonialsList from '../pages/admin/Testimonials/TestimonialsList';
import AddTestimonial from '../pages/admin/Testimonials/AddTestimonial';
import EditTestimonial from '../pages/admin/Testimonials/EditTestimonial';

// ── Notifications ─────────────────────────────────────────────────────────────
import NotificationList from '../pages/admin/Notifications/NotificationList';
import CreateNotification from '../pages/admin/Notifications/CreateNotification';

// ── Contact Messages ──────────────────────────────────────────────────────────
import ContactMessagesList from '../pages/admin/ContactMessages/ContactMessagesList';
import MessageDetails from '../pages/admin/ContactMessages/MessageDetails';

// ── Reports ───────────────────────────────────────────────────────────────────
import StudentReports from '../pages/admin/Reports/StudentReports';
import CourseReports from '../pages/admin/Reports/CourseReports';
import RevenueReports from '../pages/admin/Reports/RevenueReports';
import PerformanceReports from '../pages/admin/Reports/PerformanceReports';

//teacher routes
import TeacherList from "../components/admin/Teachers/TeacherList";
import AddTeacher from "../components/admin/Teachers/AddTeacher";
import EditTeacher from "../components/admin/Teachers/EditTeacher";
import TeacherDetails from "../components/admin/Teachers/TeacherDetails";

import Curriculum from '../pages/admin/Curriculum/Curriculum';
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
            path="courses/:id/curriculum"
            element={<Curriculum />}
          />

          <Route
            path="courses/:id"
            element={<CourseDetails />}
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
