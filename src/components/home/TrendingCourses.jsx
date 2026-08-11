import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import TrendingCourseCard from './TrendingCourseCard'
import trendingCourses, { trendingCategories } from '../../data/trendingCourses'
import './TrendingCourses.css'

function TrendingCourses() {
 const [activeCategory, setActiveCategory] = useState('All')
 const carouselRef = useRef(null)

 const visibleCourses = useMemo(() => {
  if (activeCategory === 'All') return trendingCourses
  return trendingCourses.filter((course) => course.category === activeCategory)
 }, [activeCategory])

 const scrollCourses = (direction) => {
  const carousel = carouselRef.current
  if (!carousel) return

  const distance = carousel.clientWidth * 0.88
  carousel.scrollBy({ left: direction * distance, behavior: 'smooth' })
 }

 return (
  <section className="trending-section" aria-labelledby="trending-courses-title">
   <div className="section-wrapper">
    <div className="trending-header" data-aos="fade-up">
     <div>
      <span className="trending-eyebrow">Course Marketplace</span>
      <h2 id="trending-courses-title">Trending Courses</h2>
      <p>Explore the skills students are learning right now.</p>
     </div>

     <Link className="trending-view-all" to="/courses">
      View all courses
      <FiArrowRight aria-hidden="true" />
     </Link>
    </div>

    <div className="trending-tabs" role="tablist" aria-label="Trending course categories" data-aos="fade-up">
     {trendingCategories.map((category) => (
      <button
       key={category}
       type="button"
       role="tab"
       aria-selected={activeCategory === category}
       className={`trending-tab${activeCategory === category ? ' trending-tab--active' : ''}`}
       onClick={() => setActiveCategory(category)}
      >
       {category}
      </button>
     ))}
    </div>

    <div className="trending-carousel-shell" data-aos="fade-up">
     <button
      type="button"
      className="trending-arrow trending-arrow--left"
      aria-label="Scroll trending courses left"
      onClick={() => scrollCourses(-1)}
     >
      <FiArrowLeft aria-hidden="true" />
     </button>

     <div className="trending-carousel" ref={carouselRef} tabIndex={0} aria-label="Trending courses carousel">
      {visibleCourses.map((course, index) => (
       <TrendingCourseCard key={course.id} course={course} index={index} />
      ))}
     </div>

     <button
      type="button"
      className="trending-arrow trending-arrow--right"
      aria-label="Scroll trending courses right"
      onClick={() => scrollCourses(1)}
     >
      <FiArrowRight aria-hidden="true" />
     </button>
    </div>
   </div>
  </section>
 )
}

export default TrendingCourses
