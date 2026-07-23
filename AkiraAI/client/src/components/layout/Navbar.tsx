import { Link, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import { APP_NAME, NAV_LINKS } from '@/constants/app.constants'

export function Navbar() {
  const location = useLocation()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4 bg-black/85 backdrop-blur-md border-b border-[#222222]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link to="/" className="flex items-center">
        <span className="font-pixel text-xl sm:text-2xl font-bold tracking-tight text-white">
          {APP_NAME}
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative py-1 text-sm font-medium transition-colors ${
              location.pathname === link.path ? 'text-white' : 'text-[#888888] hover:text-white'
            }`}
          >
            {link.label}
            {location.pathname === link.path && (
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                layoutId="nav-indicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="font-pixel text-xs px-3.5 py-2 border border-[#333333] hover:border-white text-[#888888] hover:text-white transition-all"
        >
          Sign In
        </Link>
        <Link
          to="/chat"
          className="font-pixel text-xs px-4 py-2 border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all font-semibold"
        >
          Try AkiraAi
        </Link>
      </div>
    </motion.header>
  )
}
