import { Skeleton } from '@mui/material'
import './CourseDetailsSkeleton.css'

function CourseDetailsSkeleton() {
 return (
  <div className="course-details-page course-details-skeleton-page" aria-label="Loading course details">
   <section className="course-details-hero">
    <div className="container">
     <Skeleton variant="text" width={260} height={24} className="course-details-skeleton-line" />

     <div className="row g-4 align-items-start">
      <div className="col-12 col-lg-7">
       <div className="course-hero-copy">
        <Skeleton variant="text" width={140} height={24} />
        <Skeleton variant="text" width="92%" height={64} />
        <Skeleton variant="text" width="74%" height={64} />
        <Skeleton variant="text" width="86%" height={28} />
        <Skeleton variant="text" width="48%" height={24} />
        <div className="course-details-skeleton-stats">
         <Skeleton variant="rounded" width={132} height={40} />
         <Skeleton variant="rounded" width={112} height={40} />
         <Skeleton variant="rounded" width={120} height={40} />
         <Skeleton variant="rounded" width={104} height={40} />
        </div>
       </div>
      </div>

      <div className="col-12 col-lg-5">
       <aside className="course-purchase-card">
        <Skeleton variant="rectangular" className="course-details-skeleton-image" />
        <div className="course-purchase-content">
         <Skeleton variant="text" width={160} height={42} />
         <Skeleton variant="text" width={190} height={24} />
         <Skeleton variant="rounded" width="100%" height={48} />
         <Skeleton variant="text" width="78%" height={22} className="course-details-skeleton-centered" />
        </div>
       </aside>
      </div>
     </div>
    </div>
   </section>

   <section className="course-details-content">
    <div className="container">
     {[1, 2, 3].map((sectionId) => (
      <div className="course-section course-details-skeleton-section" key={sectionId}>
       <Skeleton variant="text" width={130} height={22} />
       <Skeleton variant="text" width={260} height={34} />
       <Skeleton variant="text" width="100%" height={24} />
       <Skeleton variant="text" width="88%" height={24} />
       <Skeleton variant="rounded" width="100%" height={96} />
      </div>
     ))}
    </div>
   </section>
  </div>
 )
}

export default CourseDetailsSkeleton
