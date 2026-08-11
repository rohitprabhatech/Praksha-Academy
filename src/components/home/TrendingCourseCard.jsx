import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiHeart, FiLayers, FiStar } from 'react-icons/fi'

function formatPrice(price) {
 return `Rs. ${price.toLocaleString('en-IN')}`
}

function TrendingCourseCard({ course, index }) {
 const [wishlisted, setWishlisted] = useState(false)

 return (
  <article className="trending-course-card">
   <div
    className={`trending-course-thumb trending-course-thumb--${index % 5}`}
    role="img"
    aria-label={course.thumbnailLabel}
   >
    <span>{course.category}</span>
    <strong>{course.title.split(' ').slice(0, 2).join(' ')}</strong>
   </div>

   <button
    type="button"
    className={`trending-wishlist${wishlisted ? ' trending-wishlist--active' : ''}`}
    aria-label={`${wishlisted ? 'Remove' : 'Add'} ${course.title} ${wishlisted ? 'from' : 'to'} wishlist`}
    aria-pressed={wishlisted}
    onClick={() => setWishlisted((current) => !current)}
   >
    <FiHeart aria-hidden="true" />
   </button>

   <div className="trending-course-body">
    <div className="trending-course-topline">
     <span className="trending-course-category">{course.category}</span>
     {course.badge && <span className="trending-course-badge">{course.badge}</span>}
    </div>

    <h3>
     <Link to={course.slug ? `/courses/${course.slug}` : '/courses'}>{course.title}</Link>
    </h3>

    <p className="trending-course-instructor">{course.instructor}</p>

    <div
     className="trending-course-rating"
     aria-label={`${course.rating} out of 5 rating from ${course.reviews.toLocaleString('en-IN')} reviews`}
    >
     <strong>{course.rating}</strong>
     <FiStar aria-hidden="true" />
     <span>({course.reviews.toLocaleString('en-IN')})</span>
    </div>

    <div className="trending-course-meta">
     <span>
      <FiLayers aria-hidden="true" />
      {course.level}
     </span>
     <span>
      <FiClock aria-hidden="true" />
      {course.duration}
     </span>
    </div>

    <div className="trending-course-price">
     <strong>{formatPrice(course.price)}</strong>
     <span>{formatPrice(course.originalPrice)}</span>
    </div>
   </div>
  </article>
 )
}

export default TrendingCourseCard
