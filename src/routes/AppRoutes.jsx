import { Routes, Route, Navigate } from 'react-router-dom'
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
import AdminRoutes from './AdminRoutes'

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
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/*
     Sprint 01: ALL /admin/* routes live inside AdminRoutes.jsx now,
     including Blog/Gallery/FAQ/Testimonials/Notifications/Contact
     Messages/Reports, which used to be duplicated here in a second,
     separately-mounted <AdminLayout /> — see the comment at the top of
     AdminRoutes.jsx for why that was a real bug, not just untidy.
     Do not add admin pages back here; add them to AdminRoutes.jsx.
   */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            <Route element={<RequireAuth />}>
                <Route element={<RequireRole allowedRoles="student" />}>
                    <Route element={<StudentLayout />}>
                        <Route path="/student/dashboard" element={<Dashboard />} />
                        <Route path="/student/courses" element={<MyCourses />} />
                        <Route path="/student/wishlist" element={<Wishlist />} />
                        <Route path="/student/certificates" element={<Certificates />} />
                        <Route path="/student/notifications" element={<Notifications />} />
                        <Route path="/student/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
