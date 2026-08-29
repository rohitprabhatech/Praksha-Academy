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

// =========================================================
// AUTH
// =========================================================

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import VerifyOtp from '../pages/auth/VerifyOtp'
import AccessDenied from '../pages/auth/AccessDenied'

// =========================================================
// AUTH GUARDS
// =========================================================

import RequireAuth from '../components/auth/RequireAuth'
import RequireRole from '../components/auth/RequireRole'

// =========================================================
// STUDENT
// =========================================================

import StudentLayout from '../layouts/StudentLayout'
import StudentDashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'
import Wishlist from '../pages/student/Wishlist'
import Certificates from '../pages/student/Certificates'
import StudentNotifications from '../pages/student/Notifications'
import StudentProfile from '../pages/student/Profile'

// =========================================================
// ADMIN
// =========================================================

import AdminRoutes from './AdminRoutes'


function AppRoutes() {
  return (
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
  )
}


export default AppRoutes