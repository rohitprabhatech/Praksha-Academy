import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi'
import { Button } from '@mui/material'
import { navItems } from '../../constants/siteData'
import './Navbar.css'

function Navbar() {
 const [isOpen, setIsOpen] = useState(false)

 return (
  <header className="site-navbar">
   <div className="navbar-inner section-wrapper">
    <Link to="/" className="brand-logo" onClick={() => setIsOpen(false)}>
     <div className="logo-mark" aria-hidden="true">PA</div>
     <div>
      <h1>Praksha Academy</h1>
      <p>Advance learning for every learner.</p>
     </div>
    </Link>

    <button
     className="menu-toggle"
     type="button"
     aria-label="Toggle navigation menu"
     aria-expanded={isOpen}
     onClick={() => setIsOpen((prev) => !prev)}
    >
     {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>

    <nav className={isOpen ? 'site-nav open' : 'site-nav'}>
     {navItems.map((item) => (
      <NavLink
       key={item.path}
       to={item.path}
       className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
       onClick={() => setIsOpen(false)}
      >
       <strong className="nav-link-label">{item.label}</strong>
      </NavLink>
     ))}
     <Button
      className="mobile-enroll"
      variant="contained"
      color="secondary"
      component={Link}
      to="/contact"
      endIcon={<FiArrowRight />}
      onClick={() => setIsOpen(false)}
      sx={{
       borderRadius: '10px',
       backgroundColor: '#F59E0B',
       color: '#FFFFFF',
       boxShadow: 'none',
       mt: 1,
       '&:hover': {
        backgroundColor: '#D97706',
       },
      }}
     >
      Enroll Now
     </Button>
    </nav>

    <div className="nav-actions">
     <Button
      variant="contained"
      color="secondary"
      size="medium"
      component={Link}
      to="/contact"
      endIcon={<FiArrowRight />}
      sx={{
       borderRadius: '10px',
       backgroundColor: '#F59E0B',
       color: '#FFFFFF',
       boxShadow: 'none',
       px: 2.5,
       py: 1,
       '&:hover': {
        backgroundColor: '#D97706',
        boxShadow: '0 10px 24px rgba(245, 158, 11, 0.24)',
       },
      }}
     >
      Enroll Now
     </Button>
    </div>
   </div>
  </header>
 )
}

export default Navbar
