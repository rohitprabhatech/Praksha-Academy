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

   <Route path="/admin/*" element={<AdminRoutes />} />

   <Route element={<StudentLayout />}>
    <Route path="/student/dashboard" element={<Dashboard />} />
    <Route path="/student/courses" element={<MyCourses />} />
    <Route path="/student/wishlist" element={<Wishlist />} />
    <Route path="/student/certificates" element={<Certificates />} />
    <Route path="/student/notifications" element={<Notifications />} />
    <Route path="/student/profile" element={<Profile />} />
   </Route>

   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}

export default AppRoutes
