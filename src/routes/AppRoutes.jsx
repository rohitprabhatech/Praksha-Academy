import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
import Programs from '../pages/Programs'
import About from '../pages/About'
import Blog from '../pages/Blog'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Register";
import ForgotPassword from '../pages/auth/ForgotPassword'
import VerifyOtp from '../pages/auth/VerifyOtp'

import StudentLayout from '../layouts/StudentLayout'
import Dashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'
import Wishlist from '../pages/student/Wishlist'
import Certificates from '../pages/student/Certificates'
import Notifications from '../pages/student/Notifications'
import Profile from '../pages/student/Profile'

// Admin Layout
import AdminLayout from '../layouts/AdminLayout'

// Admin — Blog
import BlogList from '../pages/admin/Blog/BlogList'
import CreateBlog from '../pages/admin/Blog/CreateBlog'
import EditBlog from '../pages/admin/Blog/EditBlog'
import BlogDetails from '../pages/admin/Blog/BlogDetails'

// Admin — Gallery
import GalleryList from '../pages/admin/Gallery/GalleryList'
import AddImage from '../pages/admin/Gallery/AddImage'
import AddVideo from '../pages/admin/Gallery/AddVideo'

// Admin — FAQ
import FAQList from '../pages/admin/FAQ/FAQList'
import AddFAQ from '../pages/admin/FAQ/AddFAQ'
import EditFAQ from '../pages/admin/FAQ/EditFAQ'

// Admin — Testimonials
import TestimonialsList from '../pages/admin/Testimonials/TestimonialsList'
import AddTestimonial from '../pages/admin/Testimonials/AddTestimonial'
import EditTestimonial from '../pages/admin/Testimonials/EditTestimonial'

// Admin — Notifications
import NotificationList from '../pages/admin/Notifications/NotificationList'
import CreateNotification from '../pages/admin/Notifications/CreateNotification'

// Admin — Contact Messages
import ContactMessagesList from '../pages/admin/ContactMessages/ContactMessagesList'
import MessageDetails from '../pages/admin/ContactMessages/MessageDetails'

// Admin — Reports
import StudentReports from '../pages/admin/Reports/StudentReports'
import CourseReports from '../pages/admin/Reports/CourseReports'
import RevenueReports from '../pages/admin/Reports/RevenueReports'
import PerformanceReports from '../pages/admin/Reports/PerformanceReports'

function AppRoutes() {
 return (
  <Routes>
   <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/:slug" element={<CourseDetails />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
   </Route>

   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Signup />} />
   <Route path="/forgot-password" element={<ForgotPassword />} />
   <Route path="/verify-otp" element={<VerifyOtp />} />

   <Route element={<StudentLayout />}>
    <Route path="/student/dashboard" element={<Dashboard />} />
    <Route path="/student/courses" element={<MyCourses />} />
    <Route path="/student/wishlist" element={<Wishlist />} />
    <Route path="/student/certificates" element={<Certificates />} />
    <Route path="/student/notifications" element={<Notifications />} />
    <Route path="/student/profile" element={<Profile />} />
   </Route>

   {/* ── Admin Routes ────────────────────────────────────────────── */}
   <Route element={<AdminLayout />}>
    {/* Blog */}
    <Route path="/admin/blog" element={<BlogList />} />
    <Route path="/admin/blog/create" element={<CreateBlog />} />
    <Route path="/admin/blog/:id/edit" element={<EditBlog />} />
    <Route path="/admin/blog/:id" element={<BlogDetails />} />

    {/* Gallery */}
    <Route path="/admin/gallery" element={<GalleryList />} />
    <Route path="/admin/gallery/add-image" element={<AddImage />} />
    <Route path="/admin/gallery/add-video" element={<AddVideo />} />

    {/* FAQ */}
    <Route path="/admin/faq" element={<FAQList />} />
    <Route path="/admin/faq/add" element={<AddFAQ />} />
    <Route path="/admin/faq/:id/edit" element={<EditFAQ />} />

    {/* Testimonials */}
    <Route path="/admin/testimonials" element={<TestimonialsList />} />
    <Route path="/admin/testimonials/add" element={<AddTestimonial />} />
    <Route path="/admin/testimonials/:id/edit" element={<EditTestimonial />} />

    {/* Notifications */}
    <Route path="/admin/notifications" element={<NotificationList />} />
    <Route path="/admin/notifications/create" element={<CreateNotification />} />

    {/* Contact Messages */}
    <Route path="/admin/contact-messages" element={<ContactMessagesList />} />
    <Route path="/admin/contact-messages/:id" element={<MessageDetails />} />

    {/* Reports */}
    <Route path="/admin/reports/students" element={<StudentReports />} />
    <Route path="/admin/reports/courses" element={<CourseReports />} />
    <Route path="/admin/reports/revenue" element={<RevenueReports />} />
    <Route path="/admin/reports/performance" element={<PerformanceReports />} />
   </Route>

   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}

export default AppRoutes