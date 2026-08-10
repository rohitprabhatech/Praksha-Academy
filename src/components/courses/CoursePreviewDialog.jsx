import { Button, Dialog, DialogContent, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiClock, FiStar, FiTrendingUp, FiUser, FiX } from 'react-icons/fi'
import './CoursePreviewDialog.css'

function formatPrice(price) {
 return `₹${price.toLocaleString()}`
}

function getPreviewText(course) {
 return (
  course.preview ||
  course.overview?.summary ||
  `Get a quick look at ${course.title.toLowerCase()} with structured lessons, practical examples and guided practice from ${course.instructor}.`
 )
}

function CoursePreviewDialog({ course, open, onClose }) {
 if (!course) {
  return null
 }

 return (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className="course-preview-dialog">
   <div className="course-preview-header">
    <div>
     <span>{course.category}</span>
     <h2>{course.title}</h2>
    </div>

    <IconButton onClick={onClose} aria-label="Close course preview" className="course-preview-close">
     <FiX aria-hidden="true" />
    </IconButton>
   </div>

   <DialogContent className="course-preview-content">
    <div className="row g-4">
     <div className="col-12 col-md-5">
      <div className="course-preview-image-wrap">
       <img src={course.image} alt={course.title} className="course-preview-image" />
       {course.badge && <span className="course-preview-badge">{course.badge}</span>}
      </div>
     </div>

     <div className="col-12 col-md-7">
      <p className="course-preview-description">{course.description}</p>
      <p className="course-preview-summary">{getPreviewText(course)}</p>

      <div className="course-preview-meta" aria-label="Course preview information">
       <span>
        <FiUser aria-hidden="true" />
        {course.instructor}
       </span>
       <span>
        <FiStar aria-hidden="true" />
        {course.rating} ({course.reviews.toLocaleString()})
       </span>
       <span>
        <FiClock aria-hidden="true" />
        {course.duration}
       </span>
       <span>
        <FiTrendingUp aria-hidden="true" />
        {course.level}
       </span>
       <span>
        <FiBookOpen aria-hidden="true" />
        {course.lessons} lessons
       </span>
      </div>

      <div className="course-preview-footer">
       <div className="course-preview-price">
        <strong>{formatPrice(course.price)}</strong>
        <span>{formatPrice(course.originalPrice)}</span>
       </div>

       <Button component={Link} to={`/courses/${course.slug}`} variant="contained" className="course-preview-view">
        View Course
       </Button>
      </div>
     </div>
    </div>
   </DialogContent>
  </Dialog>
 )
}

export default CoursePreviewDialog
