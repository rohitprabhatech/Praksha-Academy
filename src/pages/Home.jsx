import { Button, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { heroHighlights, courseCategories, programHighlights, testimonialData } from '../constants/siteData'
import SectionHeader from '../components/common/SectionHeading'
import FeatureCard from '../components/common/FeatureCard'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'

function Home() {
 return (
  <>
   <Hero />
   <Categories />
   <WhyChooseUs />
   <Testimonials />
   {/* Popular Courses, Featured Teachers, Newsletter land in the next commit. */}
  </>
 )
}

export default Home