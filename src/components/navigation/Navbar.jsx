import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useThemeMode } from '../../context/ThemeModeContext'
import SearchBar from '../common/SearchBar'
import logoDark from '../../assets/praksha-logo-dark.png'
import logoLight from '../../assets/praksha-logo-light.png'
import './Navbar.css'

const navItems = [
  { label: 'Explore', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Programs', path: '/programs' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
 const [scrolled, setScrolled] = useState(false)
 const [mobileOpen, setMobileOpen] = useState(false)
 const { mode, toggleMode } = useThemeMode()
 const isDarkMode = mode === 'dark'

 useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 8)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
 }, [])

 useEffect(() => {
  document.body.style.overflow = mobileOpen ? 'hidden' : ''
  return () => {
   document.body.style.overflow = ''
  }
 }, [mobileOpen])

 return (
  <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
   <div className="section-wrapper navbar-inner">
    <Link to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
     <img src={isDarkMode ? logoDark : logoLight} alt="Praksha Academy home" className="navbar-logo" />
    </Link>

    <nav className="navbar-menu" aria-label="Primary navigation">
     {navItems.map((item) => (
     <NavLink
       key={item.label}
       to={item.path}
       end={item.path === '/'}
       className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}
      >
       {item.label}
      </NavLink>
     ))}
    </nav>

    <div className="navbar-search-wrap">
     <SearchBar placeholder="Search courses..." buttonLabel="Search" compact />
    </div>

    <div className="navbar-actions">
     <IconButton
      className="navbar-theme-toggle"
      onClick={toggleMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
     >
      {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
     </IconButton>
     <Button variant="outlined" color="primary" component={Link} to="/login">
      Login
     </Button>
     <Button variant="contained" color="primary" component={Link} to="/register">
      Register
     </Button>
    </div>

    <IconButton
     className="navbar-toggle"
     onClick={() => setMobileOpen((prev) => !prev)}
     aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
     aria-expanded={mobileOpen}
    >
     {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
    </IconButton>
   </div>

   <div className={`navbar-mobile${mobileOpen ? ' navbar-mobile--open' : ''}`} hidden={!mobileOpen}>
    <SearchBar
     placeholder="Search courses..."
     buttonLabel="Search"
     compact
     className="navbar-search-mobile"
    />

    <nav className="navbar-mobile-menu" aria-label="Mobile navigation">
     {navItems.map((item) => (
     <NavLink
       key={item.label}
       to={item.path}
       end={item.path === '/'}
       onClick={() => setMobileOpen(false)}
       className={({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`}
      >
       {item.label}
      </NavLink>
     ))}
    </nav>

    <div className="navbar-mobile-actions">
     <IconButton
      className="navbar-theme-toggle navbar-theme-toggle--mobile"
      onClick={toggleMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
     >
      {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
     </IconButton>
     <Button
      variant="outlined"
      color="primary"
      fullWidth
      component={Link}
      to="/login"
      onClick={() => setMobileOpen(false)}
     >
      Login
     </Button>
     <Button
      variant="contained"
      color="primary"
      fullWidth
      component={Link}
      to="/register"
      onClick={() => setMobileOpen(false)}
     >
     Register
     </Button>
    </div>
   </div>
  </header>
 )
}

export default Navbar
