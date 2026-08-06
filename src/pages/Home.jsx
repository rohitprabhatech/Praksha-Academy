import { Button, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { courseCategories, programHighlights, testimonialData } from '../constants/siteData'
import SectionHeader from '../components/common/SectionHeader'
import FeatureCard from '../components/common/FeatureCard'

function Home() {
 return (
  <section>
   <div className="section-wrapper">
    <div className="hero-surface" data-aos="fade-up">
     <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} lg={6}>
       <Typography variant="h1" component="h1" gutterBottom>
        Learn with confidence, skill, and career focus.
       </Typography>
       <Typography variant="body1" className="section-subtitle" gutterBottom>
        Praksha Academy helps students and professionals build strong academic foundations, fluent English, and modern programming capabilities.
       </Typography>
       <Button variant="contained" color="primary" size="large" endIcon={<FiArrowRight />}>
        Explore Courses
       </Button>
       <Button
        variant="outlined"
        color="primary"
        size="large"
        component={Link}
        to="/blog"
        endIcon={<FiArrowRight />}
        sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}
       >
        Read Blog
       </Button>
      </Grid>
      <Grid item xs={12} lg={6}>
       <div className="cta-card">
        <Typography variant="subtitle1" gutterBottom>
         Trusted by learners across India
        </Typography>
        <Typography variant="h4" gutterBottom>
         10,000+ learners onboarded
        </Typography>
        <Typography>
         Structured learning, expert mentors, and project-based assessments for real progress.
        </Typography>
       </div>
      </Grid>
     </Grid>
    </div>

    <SectionHeader title="Learning paths for every ambition" subtitle="Choose from school coaching, English fluency, programming bootcamps, competitive exam readiness, and workplace skills." badge="What we offer" />

    <div className="section-grid section-grid-3">
     {courseCategories.map((course) => (
      <motion.div key={course.title} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
       <FeatureCard title={course.title} description={course.subtitle} />
      </motion.div>
     ))}
    </div>

    <SectionHeader title="Programs designed for success" subtitle="Modular tracks that blend rigorous study with practical skills." badge="Program highlights" />

    <div className="section-grid section-grid-3">
     {programHighlights.map((item) => (
      <FeatureCard key={item.title} title={item.title} description={item.description} />
     ))}
    </div>

    <SectionHeader title="Learner stories" subtitle="Feedback from students who have built skills with our courses." badge="Testimonials" />
    <div className="section-grid">
     {testimonialData.map((item) => (
      <div key={item.name} className="card-surface p-4" data-aos="fade-up">
       <Typography variant="h6" gutterBottom>
        {item.name}
       </Typography>
       <Typography variant="subtitle2" gutterBottom>
        {item.role}
       </Typography>
       <Typography>{item.quote}</Typography>
      </div>
     ))}
    </div>
   </div>
  </section>
 )
}

export default Home
