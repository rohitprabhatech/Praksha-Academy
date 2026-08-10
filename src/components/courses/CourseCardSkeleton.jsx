import { Skeleton } from '@mui/material'
import './CourseCard.css'
import './CourseCardSkeleton.css'

function CourseCardSkeleton() {
 return (
  <article className="course-card course-card-skeleton" aria-label="Loading course">
   <Skeleton variant="rectangular" className="course-card-skeleton-image" />

   <div className="course-card-content">
    <Skeleton variant="text" width="42%" height={20} />
    <Skeleton variant="text" width="86%" height={30} />
    <Skeleton variant="text" width="70%" height={26} />
    <Skeleton variant="text" width="100%" height={22} />
    <Skeleton variant="text" width="78%" height={22} />

    <div className="course-card-skeleton-meta">
     <Skeleton variant="rounded" width={82} height={28} />
     <Skeleton variant="rounded" width={96} height={28} />
     <Skeleton variant="rounded" width={72} height={28} />
    </div>

    <div className="course-card-footer">
     <div className="course-card-price">
      <Skeleton variant="text" width={70} height={28} />
      <Skeleton variant="text" width={48} height={18} />
     </div>
     <Skeleton variant="rounded" width={116} height={40} />
    </div>
   </div>
  </article>
 )
}

export default CourseCardSkeleton
