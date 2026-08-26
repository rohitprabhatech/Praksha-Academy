import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import RequireRole from "../components/auth/RequireRole";
// ── Core pages ────────────────────────────────────────────────────────────────
import AdminLogin from "../pages/admin/Login/AdminLogin";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminProfile from "../pages/admin/Profile/AdminProfile";
import AdminSettings from "../pages/admin/Settings/AdminSettings";

// ── Blog ─────────────────────────────────────────────────────────────────────
import BlogList from "../pages/admin/Blog/BlogList";
import CreateBlog from "../pages/admin/Blog/CreateBlog";
import EditBlog from "../pages/admin/Blog/EditBlog";
import BlogDetails from "../pages/admin/Blog/BlogDetails";

// ── Gallery ───────────────────────────────────────────────────────────────────
import GalleryList from "../pages/admin/Gallery/GalleryList";
import AddImage from "../pages/admin/Gallery/AddImage";
import AddVideo from "../pages/admin/Gallery/AddVideo";

// ── FAQ ───────────────────────────────────────────────────────────────────────
import FAQList from "../pages/admin/FAQ/FAQList";
import AddFAQ from "../pages/admin/FAQ/AddFAQ";
import EditFAQ from "../pages/admin/FAQ/EditFAQ";

// ── Testimonials ──────────────────────────────────────────────────────────────
import TestimonialsList from "../pages/admin/Testimonials/TestimonialsList";
import AddTestimonial from "../pages/admin/Testimonials/AddTestimonial";
import EditTestimonial from "../pages/admin/Testimonials/EditTestimonial";

// ── Notifications ─────────────────────────────────────────────────────────────
import NotificationList from "../pages/admin/Notifications/NotificationList";
import CreateNotification from "../pages/admin/Notifications/CreateNotification";

// ── Contact Messages ──────────────────────────────────────────────────────────
import ContactMessagesList from "../pages/admin/ContactMessages/ContactMessagesList";
import MessageDetails from "../pages/admin/ContactMessages/MessageDetails";

// ── Reports ───────────────────────────────────────────────────────────────────
import StudentReports from "../pages/admin/Reports/StudentReports";
import CourseReports from "../pages/admin/Reports/CourseReports";
import RevenueReports from "../pages/admin/Reports/RevenueReports";
import PerformanceReports from "../pages/admin/Reports/PerformanceReports";

//teacher routes
import TeacherList from "../components/admin/Teachers/TeacherList";
import AddTeacher from "../components/admin/Teachers/AddTeacher";
import EditTeacher from "../components/admin/Teachers/EditTeacher";
import TeacherDetails from "../components/admin/Teachers/TeacherDetails";
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

          {/* ── Gallery ───────────────────────────────────────────── */}
          <Route
            path="gallery"
            element={<GalleryList />}
          />

        {/* ── Reports ───────────────────────────────────────── */}
        <Route path="reports/students" element={<StudentReports />} />
        <Route path="reports/courses" element={<CourseReports />} />
        <Route path="reports/revenue" element={<RevenueReports />} />
        <Route path="reports/performance" element={<PerformanceReports />} />

        {/* Teacher routes */}

      <Route path="teachers" element={<RequireRole allowedRoles={['admin', 'owner']}><TeacherList /></RequireRole>} />
      <Route path="teachers/add" element={<RequireRole allowedRoles={['admin', 'owner']}><AddTeacher /></RequireRole>} />
      <Route path="teachers/:id/edit" element={<RequireRole allowedRoles={['admin', 'owner']}><EditTeacher /></RequireRole>} />
      <Route path="teachers/:id" element={<RequireRole allowedRoles={['admin', 'owner']}><TeacherDetails /></RequireRole>} />
        </Route>
      </Route>
      {/* Catch-all — prevents 404 for unknown /admin/* paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
