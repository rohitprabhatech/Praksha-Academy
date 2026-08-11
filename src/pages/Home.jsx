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