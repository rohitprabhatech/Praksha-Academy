import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
import Programs from '../pages/Programs'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

function AppRoutes() {
 return (
  <Routes>
   <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/:slug" element={<CourseDetails />} />
    <Route path="/programs" element={<Programs />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
   </Route>
   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}

export default AppRoutes
