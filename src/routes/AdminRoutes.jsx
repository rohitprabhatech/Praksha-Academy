import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import AdminLogin from '../pages/admin/Login/AdminLogin'
import AdminProfile from '../pages/admin/Profile/AdminProfile'
import AdminSettings from '../pages/admin/Settings/AdminSettings'
import NotFound from '../pages/NotFound'

// Blog
import BlogList from '../pages/admin/Blog/BlogList'
import CreateBlog from '../pages/admin/Blog/CreateBlog'
import EditBlog from '../pages/admin/Blog/EditBlog'
import BlogDetails from '../pages/admin/Blog/BlogDetails'

// Gallery
import GalleryList from '../pages/admin/Gallery/GalleryList'
import AddImage from '../pages/admin/Gallery/AddImage'
import AddVideo from '../pages/admin/Gallery/AddVideo'

// FAQ
import FAQList from '../pages/admin/FAQ/FAQList'
import AddFAQ from '../pages/admin/FAQ/AddFAQ'
import EditFAQ from '../pages/admin/FAQ/EditFAQ'

// Testimonials
import TestimonialsList from '../pages/admin/Testimonials/TestimonialsList'
import AddTestimonial from '../pages/admin/Testimonials/AddTestimonial'
import EditTestimonial from '../pages/admin/Testimonials/EditTestimonial'

// Notifications
import NotificationList from '../pages/admin/Notifications/NotificationList'
import CreateNotification from '../pages/admin/Notifications/CreateNotification'

// Contact Messages
import ContactMessagesList from '../pages/admin/ContactMessages/ContactMessagesList'
import MessageDetails from '../pages/admin/ContactMessages/MessageDetails'

// Reports
import StudentReports from '../pages/admin/Reports/StudentReports'
import CourseReports from '../pages/admin/Reports/CourseReports'
import RevenueReports from '../pages/admin/Reports/RevenueReports'
import PerformanceReports from '../pages/admin/Reports/PerformanceReports'

/**
 * Sprint 01: this used to only define login/dashboard/profile/settings.
 * Every other /admin/* page (Blog, Gallery, FAQ, Testimonials,
 * Notifications, Contact Messages, Reports) was instead defined in a
 * SECOND, separate <Route element={<AdminLayout />}> block directly
 * inside AppRoutes.jsx — a different mounted instance of AdminLayout
 * from the one used here. Since AppRoutes.jsx also had
 * `<Route path="/admin/*" element={<AdminRoutes />} />` defined earlier
 * in its tree, and this file's own catch-all below only knew about
 * dashboard/profile/settings, a path like `/admin/blog` was at risk of
 * being swallowed by *this* file's `<Route path="*" element={<NotFound />} />`
 * instead of ever reaching BlogList — depending on how the router
 * resolved the two overlapping trees. Either way, admin pages were
 * rendering inside two different AdminLayout mounts, causing the
 * sidebar/header to fully remount when navigating between e.g.
 * Dashboard and Blog. Everything now lives in this one route tree.
 */
function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />

        {/* Blog */}
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/create" element={<CreateBlog />} />
        <Route path="blog/:id/edit" element={<EditBlog />} />
        <Route path="blog/:id" element={<BlogDetails />} />

        {/* Gallery */}
        <Route path="gallery" element={<GalleryList />} />
        <Route path="gallery/add-image" element={<AddImage />} />
        <Route path="gallery/add-video" element={<AddVideo />} />

        {/* FAQ */}
        <Route path="faq" element={<FAQList />} />
        <Route path="faq/add" element={<AddFAQ />} />
        <Route path="faq/:id/edit" element={<EditFAQ />} />

        {/* Testimonials */}
        <Route path="testimonials" element={<TestimonialsList />} />
        <Route path="testimonials/add" element={<AddTestimonial />} />
        <Route path="testimonials/:id/edit" element={<EditTestimonial />} />

        {/* Notifications */}
        <Route path="notifications" element={<NotificationList />} />
        <Route path="notifications/create" element={<CreateNotification />} />

        {/* Contact Messages */}
        <Route path="contact-messages" element={<ContactMessagesList />} />
        <Route path="contact-messages/:id" element={<MessageDetails />} />

        {/* Reports */}
        <Route path="reports/students" element={<StudentReports />} />
        <Route path="reports/courses" element={<CourseReports />} />
        <Route path="reports/revenue" element={<RevenueReports />} />
        <Route path="reports/performance" element={<PerformanceReports />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AdminRoutes