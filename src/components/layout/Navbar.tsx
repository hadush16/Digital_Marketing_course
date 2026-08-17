import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiMenu, HiX, HiSearch, HiSun, HiMoon,
  HiUser, HiChevronDown, HiLogout, HiViewGrid,
  HiBell,
} from 'react-icons/hi'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/useRedux'
import { logout } from '@/redux/slices/authSlice'
import { cn } from '@/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Mobile Solutions', href: '/mobile-solutions' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Tech News', href: '/news' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Community', href: '/community' },
      { label: 'Marketing Opportunities', href: '/opportunities' },
      { label: 'Social Media Services', href: '/social-media-services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const handleLogoError = useCallback(() => setLogoError(true), [])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isDark, toggle: toggleTheme } = useTheme()
  const { isAuthenticated, user, isAdmin } = useAuth()

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close menus on route change
  const closeAll = () => {
    setMobileOpen(false)
    setDropdownOpen(null)
    setUserMenuOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    closeAll()
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          scrolled
            ? 'bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-lg shadow-card dark:shadow-dark border-b border-light-border dark:border-dark-border'
            : 'bg-transparent',
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={closeAll}
            >
              {logoError ? (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300 flex-shrink-0">
                  <span className="text-white font-black text-base leading-none">R</span>
                </div>
              ) : (
                <img
                  src="/ryoit-logo.png"
                  alt="Ryoit Logo"
                  className="w-9 h-9 rounded-xl object-cover shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300"
                  onError={handleLogoError}
                />
              )}
              <span className="font-display font-black text-xl text-light-text dark:text-dark-text group-hover:gradient-text transition-all duration-300">
                Ryoit
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        'nav-link flex items-center gap-1 px-3 py-2 rounded-lg',
                        'hover:bg-light-border/50 dark:hover:bg-dark-border/50',
                        dropdownOpen === item.label && 'text-primary-500 dark:text-primary-400',
                      )}
                    >
                      {item.label}
                      <HiChevronDown className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        dropdownOpen === item.label && 'rotate-180',
                      )} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'nav-link px-3 py-2 rounded-lg',
                          'hover:bg-light-border/50 dark:hover:bg-dark-border/50',
                          isActive && 'nav-link-active bg-primary-500/10',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {dropdownOpen === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            'absolute top-full left-0 mt-1 w-56 rounded-2xl py-2',
                            'bg-light-surface dark:bg-dark-card',
                            'border border-light-border dark:border-dark-border',
                            'shadow-card-lg dark:shadow-dark-lg',
                          )}
                        >
                          {item.children.map((child) => (
                            <NavLink
                              key={child.href}
                              to={child.href}
                              onClick={closeAll}
                              className={({ isActive }) =>
                                cn(
                                  'flex items-center px-4 py-2.5 text-sm font-medium',
                                  'text-light-muted dark:text-dark-muted',
                                  'hover:text-primary-500 hover:bg-primary-500/5',
                                  'transition-colors duration-150',
                                  isActive && 'text-primary-500 bg-primary-500/5',
                                )
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                id="navbar-search-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-light-muted dark:text-dark-muted hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-200"
                aria-label="Search"
              >
                <HiSearch className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                id="navbar-theme-toggle"
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-light-muted dark:text-dark-muted hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <HiSun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <HiMoon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative hidden lg:block">
                  <button
                    id="navbar-user-menu"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <span className="text-white text-sm font-bold">
                          {user?.name?.[0]?.toUpperCase() ?? 'U'}
                        </span>
                      )}
                    </div>
                    <HiChevronDown className={cn('w-4 h-4 text-light-muted dark:text-dark-muted transition-transform', userMenuOpen && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-2xl py-2 bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border shadow-card-lg dark:shadow-dark-lg"
                      >
                        <div className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                          <p className="font-semibold text-sm text-light-text dark:text-dark-text">{user?.name}</p>
                          <p className="text-xs text-light-muted dark:text-dark-muted truncate">{user?.email}</p>
                        </div>
                        <Link to="/dashboard" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-light-muted dark:text-dark-muted hover:text-primary-500 hover:bg-primary-500/5 transition-colors">
                          <HiViewGrid className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/dashboard/profile" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-light-muted dark:text-dark-muted hover:text-primary-500 hover:bg-primary-500/5 transition-colors">
                          <HiUser className="w-4 h-4" /> Profile
                        </Link>
                        <Link to="/dashboard/notifications" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-light-muted dark:text-dark-muted hover:text-primary-500 hover:bg-primary-500/5 transition-colors">
                          <HiBell className="w-4 h-4" /> Notifications
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-500 hover:bg-secondary-500/5 transition-colors">
                            <HiViewGrid className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-light-border dark:border-dark-border mt-1 pt-1">
                          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/5 transition-colors">
                            <HiLogout className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link to="/login" className="btn-ghost btn-sm">Sign In</Link>
                  <Link to="/register" className="btn-primary btn-sm">Get Started</Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                id="navbar-mobile-menu"
                className="lg:hidden p-2.5 rounded-xl text-light-muted dark:text-dark-muted hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <HiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <HiMenu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border"
            >
              <div className="container-custom py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-light-text dark:text-dark-text font-medium hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-colors"
                        >
                          {item.label}
                          <HiChevronDown className={cn('w-4 h-4 transition-transform', dropdownOpen === item.label && 'rotate-180')} />
                        </button>
                        <AnimatePresence>
                          {dropdownOpen === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <NavLink
                                  key={child.href}
                                  to={child.href}
                                  onClick={closeAll}
                                  className={({ isActive }) =>
                                    cn(
                                      'flex items-center px-4 py-2.5 rounded-xl text-sm font-medium',
                                      'text-light-muted dark:text-dark-muted',
                                      'hover:text-primary-500 hover:bg-primary-500/5',
                                      isActive && 'text-primary-500 bg-primary-500/5',
                                    )
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={item.href}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center px-4 py-3 rounded-xl font-medium',
                            'text-light-text dark:text-dark-text',
                            'hover:text-primary-500 hover:bg-primary-500/5',
                            'transition-colors duration-150',
                            isActive && 'text-primary-500 bg-primary-500/5',
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </div>
                ))}

                {/* Mobile auth */}
                <div className="border-t border-light-border dark:border-dark-border pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <Link to="/dashboard" onClick={closeAll} className="flex items-center gap-3 px-4 py-3 rounded-xl text-light-text dark:text-dark-text hover:bg-primary-500/5 transition-colors">
                        <HiViewGrid className="w-5 h-5" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/5 transition-colors">
                        <HiLogout className="w-5 h-5" /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/login" onClick={closeAll} className="btn-outline btn-md w-full">Sign In</Link>
                      <Link to="/register" onClick={closeAll} className="btn-primary btn-md w-full">Get Started Free</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-bg/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-light-muted" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, tools, listings..."
                  className="w-full pl-14 pr-14 py-5 text-lg bg-light-surface dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow-card-lg dark:shadow-dark-lg text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-light-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </form>
              <p className="text-center text-sm text-dark-muted mt-3">
                Press <kbd className="px-2 py-0.5 rounded-md bg-dark-card border border-dark-border text-xs">Esc</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
