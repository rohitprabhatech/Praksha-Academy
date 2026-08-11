import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiUsers } from 'react-icons/fi'
import SearchBar from '../common/SearchBar'
import './hero.css'

const HERO_STATS = [
 { value: '10K+', label: 'Learners' },
 { value: '50+', label: 'Courses' },
 { value: '20+', label: 'Expert Mentors' },
 { value: '95%', label: 'Learning Satisfaction' },
]

const learningPath = [
 { title: 'Choose a path', detail: 'Career-focused course tracks' },
 { title: 'Build projects', detail: 'Practice with mentor feedback' },
 { title: 'Show outcomes', detail: 'Portfolio-ready learning proof' },
]

function Hero() {
 return (
  <section className="hero-section" aria-labelledby="home-hero-title">
   <div className="section-wrapper hero-inner">
    <div className="hero-content" data-aos="fade-up">
     <p className="hero-eyebrow">Project stats shown as replaceable mock data</p>
     <h1 id="home-hero-title">Learn. Build. Succeed.</h1>
     <p className="hero-copy">
      Build practical skills with industry-focused courses, expert mentors, and learning paths designed
      for your career.
     </p>

     <SearchBar className="hero-search" />

     <div className="hero-actions" aria-label="Hero actions">
      <Button
       variant="contained"
       color="primary"
       size="large"
       component={Link}
       to="/courses"
       endIcon={<FiArrowRight size={18} aria-hidden="true" />}
      >
       Explore Courses
      </Button>
      <Button variant="outlined" color="primary" size="large" component={Link} to="/register">
       Get Started
      </Button>
     </div>

     <dl className="hero-stats" aria-label="Project statistics mock data">
      {HERO_STATS.map((stat) => (
       <div className="hero-stat" key={stat.label}>
        <dt>{stat.value}</dt>
        <dd>{stat.label}</dd>
       </div>
      ))}
     </dl>
    </div>

    <div className="hero-visual" data-aos="fade-left" data-aos-delay="120" aria-label="Learning path preview">
     <div className="hero-visual-header">
      <div>
       <span>Praksha Academy</span>
       <strong>Career Learning Path</strong>
      </div>
      <FiBookOpen size={24} aria-hidden="true" />
     </div>

     <div className="hero-path-list">
      {learningPath.map((item, index) => (
       <article className="hero-path-item" key={item.title}>
        <span className="hero-path-index">{index + 1}</span>
        <div>
         <h2>{item.title}</h2>
         <p>{item.detail}</p>
        </div>
        <FiCheckCircle size={20} aria-hidden="true" />
       </article>
      ))}
     </div>

     <div className="hero-mentor-panel">
      <div className="hero-mentor-icon" aria-hidden="true">
       <FiUsers size={22} />
      </div>
      <div>
       <span>Mentor support</span>
       <strong>Weekly guidance, practical reviews, and clear next steps.</strong>
      </div>
     </div>
    </div>
   </div>
  </section>
 )
}

export default Hero
