import { Typography } from '@mui/material'
import SectionHeader from '../components/common/SectionHeader'

function About() {
 return (
  <section className="section-wrapper">
   <SectionHeader title="About Praksha Academy" subtitle="A professional learning platform built for students, learners, and career explorers." />
   <div className="card-surface p-4" data-aos="fade-up">
    <Typography variant="h5" gutterBottom>
     Our mission
    </Typography>
    <Typography paragraph>
     Praksha Academy offers guided learning experiences that blend academic rigor with practical skill development. We build courses and programs for learners from class 8 through professional growth paths.
    </Typography>
    <Typography paragraph>
     Our curriculum is designed by educators and technology mentors so learners can improve grades, language confidence, and programming fluency.
    </Typography>
   </div>
  </section>
 )
}

export default About
