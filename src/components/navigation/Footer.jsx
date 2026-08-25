import { Link } from 'react-router-dom'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiArrowUpRight,
} from 'react-icons/fi'
import { navItems, courseCategories } from '../../constants/siteData'
import logoMark from '../../assets/praksha-mark.png'
import './Footer.css'

const SOCIAL_LINKS = [
  {
    icon: FiTwitter,
    label: 'Twitter',
    href: 'https://twitter.com',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com',
  },
  {
    icon: FiInstagram,
    label: 'Instagram',
    href: 'https://instagram.com',
  },
  {
    icon: FiYoutube,
    label: 'YouTube',
    href: 'https://youtube.com',
  },
]

const LEGAL_LINKS = [
  {
    label: 'Privacy Policy',
    path: '/privacy-policy',
  },
  {
    label: 'Terms & Conditions',
    path: '/terms',
  },
  {
    label: 'Refund Policy',
    path: '/refund-policy',
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      {/* =====================================================
          MAIN FOOTER
          ===================================================== */}
      <div className="section-wrapper footer-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">
              <img
                src={logoMark}
                alt="Praksha Academy"
              />
            </span>

            <span className="footer-logo-name">
              Praksha Academy
            </span>
          </Link>

          <p className="footer-description">
            Live mentor-led learning in Web Development,
            AI, Cloud Computing, and Cyber Security — built
            for learners who want real skills and real
            outcomes.
          </p>

          <div className="footer-socials">
            {SOCIAL_LINKS.map(
              ({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-link"
                >
                  <Icon
                    size={15}
                    aria-hidden="true"
                  />
                </a>
              )
            )}
          </div>
        </div>

        {/* EXPLORE */}
        <div className="footer-column">
          <h4>Explore</h4>

          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <span>{item.label}</span>

                  <FiArrowUpRight
                    size={12}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* POPULAR CATEGORIES */}
        <div className="footer-column">
          <h4>Popular Categories</h4>

          <ul>
            {courseCategories
              .slice(0, 5)
              .map((category) => (
                <li key={category.title}>
                  <Link to="/courses">
                    <span>{category.title}</span>

                    <FiArrowUpRight
                      size={12}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact-column">
          <h4>Get in Touch</h4>

          <ul className="footer-contact">

            {/* EMAIL */}
            <li>
              <span className="footer-contact-icon">
                <FiMail
                  size={15}
                  aria-hidden="true"
                />
              </span>

              <div>
                <span className="footer-contact-label">
                  Email
                </span>

                <a href="mailto:support@prakshaacademy.com">
                  support@prakshaacademy.com
                </a>
              </div>
            </li>

            {/* PHONE */}
            <li>
              <span className="footer-contact-icon">
                <FiPhone
                  size={15}
                  aria-hidden="true"
                />
              </span>

              <div>
                <span className="footer-contact-label">
                  Phone
                </span>

                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </div>
            </li>

            {/* LOCATION */}
            <li>
              <span className="footer-contact-icon">
                <FiMapPin
                  size={15}
                  aria-hidden="true"
                />
              </span>

              <div>
                <span className="footer-contact-label">
                  Location
                </span>

                <span>
                  Nashik, Maharashtra, India
                </span>
              </div>
            </li>

          </ul>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
          ===================================================== */}
      <div className="footer-bottom">
        <div className="section-wrapper footer-bottom-inner">

          {/* COPYRIGHT */}
          <p className="footer-copyright">
            © {new Date().getFullYear()} Praksha Academy

            <span
              className="footer-dot"
              aria-hidden="true"
            >
              •
            </span>

            All rights reserved.
          </p>

          {/* LEGAL + ADMIN */}
          <div className="footer-legal">

            {LEGAL_LINKS.map((link, index) => (
              <span
                className="footer-legal-item"
                key={link.path}
              >
                {index > 0 && (
                  <span
                    className="footer-legal-dot"
                    aria-hidden="true"
                  >
                    •
                  </span>
                )}

                <Link to={link.path}>
                  {link.label}
                </Link>
              </span>
            ))}

            {/* ADMIN ACCESS */}
            <span className="footer-legal-item">

              <span
                className="footer-legal-dot"
                aria-hidden="true"
              >
                •
              </span>

              <Link
                to="/admin/login"
                className="footer-admin-link"
              >
                Admin
              </Link>

            </span>

          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer