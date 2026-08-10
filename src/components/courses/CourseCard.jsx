import { useState } from 'react'
import { FiArrowRight, FiBookOpen, FiClock, FiHeart, FiStar, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useWishlist from '../../hooks/useWishlist'
import './CourseCard.css'
import CoursePreviewDialog from './CoursePreviewDialog'

function CourseCard({ course }) {
 const [isPreviewOpen, setIsPreviewOpen] = useState(false)
 const { isWishlisted, toggleWishlist } = useWishlist()
 const courseIdentifier = course.slug || String(course.id)
 const isSaved = isWishlisted(courseIdentifier)

 const handleWishlistClick = () => {
  toggleWishlist(courseIdentifier)
 }

 return (
  <>
   <article className="course-card">
    <div className="course-card-image-wrapper">
     <img src={course.image} alt={course.title} className="course-card-image" loading="lazy" />

     {course.badge && <span className="course-card-badge">{course.badge}</span>}

     <button
      type="button"
      className={`course-save-button${isSaved ? ' is-saved' : ''}`}
      onClick={handleWishlistClick}
      aria-label={isSaved ? `Remove ${course.title} from wishlist` : `Save ${course.title} to wishlist`}
      aria-pressed={isSaved}
     >
      <FiHeart aria-hidden="true" />
     </button>
    </div>

    <div className="course-card-content">
     <span className="course-card-category">{course.category}</span>

     <h3 className="course-card-title">{course.title}</h3>

     <p className="course-card-description">{course.description}</p>

     <div className="course-card-rating" aria-label={`${course.rating} rating from ${course.reviews} reviews`}>
      <span className="course-rating-value">{course.rating}</span>
      <FiStar className="course-rating-star" aria-hidden="true" />
      <span className="course-rating-count">({course.reviews.toLocaleString()})</span>
     </div>

     <div className="course-card-instructor">
      <FiUser aria-hidden="true" />
      <span>{course.instructor}</span>
     </div>

     <div className="course-card-meta">
      <span>
       <FiBookOpen aria-hidden="true" />
       {course.lessons} Lessons
      </span>
      <span>
       <FiClock aria-hidden="true" />
       {course.duration}
      </span>
      <span>{course.level}</span>
     </div>

     <div className="course-card-footer">
      <div className="course-card-price">
       <strong>₹{course.price.toLocaleString()}</strong>
       <span>₹{course.originalPrice.toLocaleString()}</span>
      </div>

      <div className="course-card-actions">
       <button type="button" className="course-preview-button" onClick={() => setIsPreviewOpen(true)}>
        Preview
       </button>

       <Link to={`/courses/${course.slug}`} className="course-view-button" aria-label={`View ${course.title} course`}>
        View
        <FiArrowRight aria-hidden="true" />
       </Link>
      </div>
     </div>
    </div>
   </article>

   <CoursePreviewDialog course={course} open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
  </>
 )
}

export default CourseCard
