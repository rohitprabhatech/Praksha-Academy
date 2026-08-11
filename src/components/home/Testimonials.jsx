import { FiMessageSquare, FiStar } from 'react-icons/fi'
import './Testimonials.css'

const testimonials = [
 {
  name: 'Rahul Kulkarni',
  role: 'Frontend Developer',
  course: 'React & Web Development',
  initials: 'RK',
  quote:
   'Praksha Academy helped me move from learning React basics to building real projects. The mentor guidance gave me the confidence to start applying for frontend roles.',
 },
 {
  name: 'Anjali Deshmukh',
  role: 'Data Analyst',
  course: 'Data Science',
  initials: 'AD',
  quote:
   'The practical projects made learning much easier. I was able to build a portfolio and understand how the skills I learned are actually used in industry.',
 },
 {
  name: 'Neha Joshi',
  role: 'Cyber Security Analyst',
  course: 'Cyber Security',
  initials: 'NJ',
  quote:
   'The structured learning path and mentor support helped me stay consistent. I now feel much more confident about my cybersecurity fundamentals.',
 },
]

function Testimonials() {
 return (
  <section className="testimonials-section" aria-labelledby="testimonials-title">
   <div className="section-wrapper">
    <div className="testimonials-header" data-aos="fade-up">
     <span className="testimonials-eyebrow">Learner Stories</span>
     <h2 id="testimonials-title">Learners Who Leveled Up With Us</h2>
     <p>
      Real stories from learners who built new skills, completed courses, and moved closer to their career goals.
     </p>
    </div>

    <div className="testimonials-grid">
     {testimonials.map((testimonial, index) => (
      <article
       key={testimonial.name}
       className="card-surface testimonial-card"
       data-aos="fade-up"
       data-aos-delay={index * 80}
      >
       <div className="testimonial-quote-icon" aria-hidden="true">
        <FiMessageSquare size={22} />
       </div>

       <div className="testimonial-rating" aria-label="5 out of 5 star rating">
        {Array.from({ length: 5 }).map((_, starIndex) => (
         <FiStar key={starIndex} size={17} fill="currentColor" aria-hidden="true" />
        ))}
       </div>

       <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>

       <span className="testimonial-course">{testimonial.course}</span>

       <div className="testimonial-author">
        <div
         className="testimonial-avatar"
         role="img"
         aria-label={`${testimonial.name}, ${testimonial.role}`}
        >
         {testimonial.initials}
        </div>
        <div>
         <span className="testimonial-name">{testimonial.name}</span>
         <span className="testimonial-role">{testimonial.role}</span>
        </div>
       </div>
      </article>
     ))}
    </div>
   </div>
  </section>
 )
}

export default Testimonials
