import { Link } from 'react-router-dom'
import { navItems } from '../../constants/siteData'
import './Footer.css'

function Footer() {
 return (
  <footer className="site-footer">
   <div className="section-wrapper footer-grid">
    <div>
     <h3>Praksha Academy</h3>
     <p>Modern learning paths for school, skill development, and career readiness.</p>
    </div>
    <div>
     <h4>Explore</h4>
     <ul>
      {navItems.map((item) => (
       <li key={item.path}>
        <Link to={item.path}>{item.label}</Link>
       </li>
      ))}
     </ul>
    </div>
    <div>
     <h4>Contact</h4>
     <p>support@prakshaacademy.com</p>
     <p>+91 98765 43210</p>
    </div>
   </div>
   <div className="footer-bottom">
    <p>© 2026 Praksha Academy. Designed for learners and educators.</p>
   </div>
  </footer>
 )
}

export default Footer
