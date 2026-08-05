import { Button, TextField, Typography } from '@mui/material'
import SectionHeader from '../components/common/SectionHeader'

function Contact() {
 return (
  <section className="section-wrapper">
   <SectionHeader title="Contact" subtitle="Reach out for course guidance, admissions support, or curriculum questions." />
   <div className="card-surface p-4" data-aos="fade-up">
    <Typography variant="body1" gutterBottom>
     Fill this placeholder form to connect with our admissions team.
    </Typography>
    <form className="contact-form">
     <TextField label="Name" fullWidth margin="normal" />
     <TextField label="Email" fullWidth margin="normal" type="email" />
     <TextField label="Message" fullWidth margin="normal" multiline minRows={4} />
     <Button variant="contained" color="secondary" size="large" type="submit">
      Submit Inquiry
     </Button>
    </form>
   </div>
  </section>
 )
}

export default Contact
