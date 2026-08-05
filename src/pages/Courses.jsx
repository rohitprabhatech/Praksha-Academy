import { Typography, List, ListItem, ListItemText } from '@mui/material'
import SectionHeader from '../components/common/SectionHeader'

const courseGroups = [
 {
  title: 'School Learning',
  items: ['Class 8 to Class 10', 'Class 11 to Class 12', 'Science & Mathematics'],
 },
 {
  title: 'English Skills',
  items: ['English Grammar', 'Spoken English', 'Writing Practice'],
 },
 {
  title: 'Coding & Career',
  items: ['Python', 'Java', 'C / C++', 'JavaScript', 'React', 'Web Development'],
 },
]

function Courses() {
 return (
  <section className="section-wrapper">
   <SectionHeader title="Courses" subtitle="Structured course catalogs designed for classroom excellence and professional growth." />
   <div className="section-grid">
    {courseGroups.map((group) => (
     <div className="card-surface p-4" key={group.title} data-aos="fade-up">
      <Typography variant="h5" gutterBottom>
       {group.title}
      </Typography>
      <List>
       {group.items.map((item) => (
        <ListItem key={item} disableGutters>
         <ListItemText primary={item} />
        </ListItem>
       ))}
      </List>
     </div>
    ))}
   </div>
  </section>
 )
}

export default Courses
