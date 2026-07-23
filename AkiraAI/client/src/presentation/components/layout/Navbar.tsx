import { Link, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import { APP_NAME, NAV_LINKS } from '@/constants/app.constants'
import styles from './Navbar.module.css'

export function Navbar() {
  const location = useLocation()

  return (
    <motion.header
      className={styles.navbar}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link to="/" className={styles.logo}>
        <span className={styles.logoPixel}>{APP_NAME}</span>
      </Link>

      <nav className={styles.nav}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
          >
            {link.label}
            {location.pathname === link.path && (
              <motion.span
                className={styles.indicator}
                layoutId="nav-indicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      <div className={styles.authGroup}>
        <Link to="/login" className={styles.secondaryBtn}>
          Sign In
        </Link>
        <Link to="/chat" className={styles.cta}>
          Try AkiraAi
        </Link>
      </div>
    </motion.header>
  )
}
