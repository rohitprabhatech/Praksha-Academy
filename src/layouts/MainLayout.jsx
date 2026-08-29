import { useEffect, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/navigation/Footer'
import PageLoader from '../components/common/PageLoader'

function MainLayout() {
 useEffect(() => {
  AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' })
 }, [])

 return (
  <div className="app-shell">
   <Navbar />
   <main className="main-content">
    <Suspense fallback={<PageLoader minHeight={300} label="Loading page..." />}>
     <Outlet />
    </Suspense>
   </main>
   <Footer />
  </div>
 )
}

export default MainLayout
