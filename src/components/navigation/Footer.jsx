import { Link } from 'react-router-dom'
import {
 FiArrowRight,
 FiAward,
 FiBookOpen,
 FiGithub,
 FiHeart,
 FiHelpCircle,
 FiInstagram,
 FiLinkedin,
 FiMail,
 FiMapPin,
 FiPhone,
 FiYoutube,
} from 'react-icons/fi'
import logoFull from "../../assets/praksha-logo-light.png";
import './Footer.css'

const SOCIAL_LINKS = [
 { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
 { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
 { icon: FiYoutube, label: 'YouTube', href: 'https://youtube.com' },
 { icon: FiGithub, label: 'GitHub', href: 'https://github.com' },
]

const FOOTER_COLUMNS = [
 {
  title: 'Explore',
  links: [
   { label: 'Home', path: '/' },
   { label: 'Courses', path: '/courses' },
   { label: 'Programs', path: '/programs' },
   { label: 'About', path: '/about' },
   { label: 'Contact', path: '/contact' },
  ],
 },
 {
  title: 'Popular Categories',
  links: [
   { label: 'Web Development', path: '/courses' },
   { label: 'Programming', path: '/courses' },
   { label: 'Data Science', path: '/courses' },
   { label: 'AI & Machine Learning', path: '/courses' },
   { label: 'Cloud Computing', path: '/courses' },
   { label: 'Cyber Security', path: '/courses' },
  ],
 },
 {
  title: 'Learning',
  links: [
   { label: 'My Courses', path: '/student/courses', icon: FiBookOpen },
   { label: 'Certificates', path: '/student/certificates', icon: FiAward },
   { label: 'Wishlist', path: '/student/wishlist', icon: FiHeart },
   { label: 'Learning Paths', path: '/programs' },
   { label: 'Student Dashboard', path: '/student/dashboard' },
  ],
 },
 {
  title: 'Support',
  links: [
   { label: 'Help Center', path: '/contact', icon: FiHelpCircle },
   { label: 'FAQs', path: '/contact' },
   { label: 'Contact Support', href: 'mailto:support@prakshaacademy.com' },
   { label: 'Terms & Conditions', href: 'mailto:support@prakshaacademy.com?subject=Terms%20%26%20Conditions' },
   { label: 'Privacy Policy', href: 'mailto:support@prakshaacademy.com?subject=Privacy%20Policy' },
   { label: 'Refund Policy', href: 'mailto:support@prakshaacademy.com?subject=Refund%20Policy' },
  ],
 },
]

const LEGAL_LINKS = [
 { label: 'Privacy Policy', href: 'mailto:support@prakshaacademy.com?subject=Privacy%20Policy' },
 { label: 'Terms & Conditions', href: 'mailto:support@prakshaacademy.com?subject=Terms%20%26%20Conditions' },
 { label: 'Refund Policy', href: 'mailto:support@prakshaacademy.com?subject=Refund%20Policy' },
]

function FooterLink({ link }) {
 const content = (
  <>
   {link.icon && <link.icon size={14} aria-hidden="true" />}
   <span>{link.label}</span>
  </>
 )

 if (link.href) {
  return <a href={link.href}>{content}</a>
 }

 return <Link to={link.path}>{content}</Link>
}

function Footer() {
 return (
  <footer className="site-footer" id="site-footer">
   <div className="section-wrapper footer-wrapper">
    <div className="footer-cta">
     <div>
      <span>Ready to build your next skill?</span>
      <p>Start learning with Praksha Academy and move closer to your career goals.</p>
     </div>
     <Link to="/courses" className="footer-cta-link">
      Explore Courses
      <FiArrowRight size={17} aria-hidden="true" />
     </Link>
    </div>

    <div className="footer-main">
     <div className="footer-brand">
      <Link to="/" className="footer-logo" aria-label="Praksha Academy home">
       <img src={logoFull} alt="Praksha Academy" />
      </Link>
      <h3>Praksha Academy</h3>
      <p>
       Live mentor-led learning in Web Development, AI, Cloud Computing, and
       Cyber Security - built for learners who want outcomes, not just content.
      </p>
      <div className="footer-socials" aria-label="Social links">
       {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
        <a
         key={label}
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         aria-label={label}
         className="footer-social-link"
        >
         <Icon size={16} aria-hidden="true" />
        </a>
       ))}
      </div>
     </div>

     <div className="footer-links-grid">
      {FOOTER_COLUMNS.map((column) => (
       <nav className="footer-column" aria-label={column.title} key={column.title}>
        <h4>{column.title}</h4>
        <ul>
         {column.links.map((link) => (
          <li key={`${column.title}-${link.label}`}>
           <FooterLink link={link} />
          </li>
         ))}
        </ul>
       </nav>
      ))}

      <div className="footer-column footer-touch">
       <h4>Get in Touch</h4>
       <ul className="footer-contact">
        <li>
         <FiMail size={15} aria-hidden="true" />
         <a href="mailto:support@prakshaacademy.com">support@prakshaacademy.com</a>
        </li>
        <li>
         <FiPhone size={15} aria-hidden="true" />
         <a href="tel:+919876543210">+91 98765 43210</a>
        </li>
        <li>
         <FiMapPin size={15} aria-hidden="true" />
         <span>Nashik, Maharashtra, India</span>
        </li>
       </ul>
      </div>
     </div>
    </div>
   </div>

   <div className="footer-bottom">
    <div className="section-wrapper footer-bottom-inner">
     <p>&copy; {new Date().getFullYear()} Praksha Academy. All rights reserved.</p>
     <div className="footer-legal">
      {LEGAL_LINKS.map((link) => (
       <a key={link.label} href={link.href}>
        {link.label}
       </a>
      ))}
     </div>
    </div>
   </div>
  </footer>
 )
}

export default Footer
