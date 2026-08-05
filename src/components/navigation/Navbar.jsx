import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { Button } from '@mui/material'
import { navItems } from '../../constants/siteData'
import './Navbar.css'

function Navbar() {
 const [isOpen, setIsOpen] = useState(false)

 return (
  <header className="site-navbar shadow-sm">
   <div className="navbar-inner section-wrapper">
    <Link to="/" className="brand-logo">
     <div className="logo-mark">PA</div>
     <div>
      <h1>Praksha Academy</h1>
      <p>Advance learning for every learner.</p>
     </div>
    </Link>

    <button className="menu-toggle" onClick={() => setIsOpen((prev) => !prev)}>
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
       {item.label}
      </NavLink>
     ))}
    </nav>

    <div className="nav-actions">
     <Button variant="contained" color="secondary" size="large" component={Link} to="/contact">
      Enroll Now
     </Button>
    </div>
   </div>
  </header>
 )
}

export default Navbar
