<<<<<<< HEAD
import { Routes, Route, Navigate} from 'react-router-dom'
=======
import { Routes, Route, Navigate } from 'react-router-dom'
>>>>>>> 860170639db5a7566eb092f7a7a04be510df2a4f
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
import Programs from '../pages/Programs'
import About from '../pages/About'
import Blog from '../pages/Blog'
import BlogDetail from '../pages/BlogDetail'
import Contact from '../pages/Contact'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import Terms from '../pages/Terms'
import RefundPolicy from '../pages/RefundPolicy'
import NotFound from '../pages/NotFound'

// Auth
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import VerifyOtp from '../pages/auth/VerifyOtp'

// Student
import StudentLayout from '../layouts/StudentLayout'
import StudentDashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'
import Wishlist from '../pages/student/Wishlist'
import Certificates from '../pages/student/Certificates'
import StudentNotifications from '../pages/student/Notifications'
import StudentProfile from '../pages/student/Profile'

// Admin — all /admin/* routes delegated to AdminRoutes
import AdminRoutes from './AdminRoutes'

function AppRoutes() {
<<<<<<< HEAD
 return (
  <Routes>
   <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/:slug" element={<CourseDetails />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/refund-policy" element={<RefundPolicy />} />
  </Route>

   
    
   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Signup />} />
   <Route path="/forgot-password" element={<ForgotPassword />} />
   <Route path="/verify-otp" element={<VerifyOtp />} />
=======
    return (
        <Routes>
            {/* ── Public / Marketing ───────────────────────────────── */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetails />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Route>

            {/* ── Auth ─────────────────────────────────────────────── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
>>>>>>> 860170639db5a7566eb092f7a7a04be510df2a4f

            {/* ── Student ──────────────────────────────────────────── */}
            <Route element={<StudentLayout />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/courses" element={<MyCourses />} />
                <Route path="/student/wishlist" element={<Wishlist />} />
                <Route path="/student/certificates" element={<Certificates />} />
                <Route path="/student/notifications" element={<StudentNotifications />} />
                <Route path="/student/profile" element={<StudentProfile />} />
            </Route>

            {/* ── Admin — all /admin/* delegated to AdminRoutes ────── */}
            <Route path="/admin/*" element={<AdminRoutes />} />

<<<<<<< HEAD
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
   {/* Sprint 03(public-website) Routes */}
      //<Route path="/programs" element={<Programs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      
      {/* Legal Routes */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />

   <Route path="*" element={<NotFound />} />
  </Routes>
 )
=======
            {/* ── 404 ──────────────────────────────────────────────── */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
>>>>>>> 860170639db5a7566eb092f7a7a04be510df2a4f
}

export default AppRoutes
