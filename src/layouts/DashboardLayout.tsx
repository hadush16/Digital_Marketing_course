import { Navigate, Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { Suspense, useState } from 'react'
import PageLoader from '@/components/ui/PageLoader'
import {
  HiUser,
  HiBookOpen,
  HiShoppingBag,
  HiLogout,
  HiHome,
  HiBell,
  HiHeart,
  HiChatAlt2,
  HiChartBar,
  HiMenu,
  HiX,
} from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/useRedux'
import { logout } from '@/redux/slices/authSlice'
import { cn } from '@/utils'

export default function DashboardLayout() {
  const { isAuthenticated, user } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const menuItems = [
    { label: 'Overview', href: '/dashboard', icon: HiHome },
    { label: 'My Courses', href: '/dashboard/my-courses', icon: HiBookOpen },
    { label: 'My Listings', href: '/dashboard/my-listings', icon: HiShoppingBag },
    { label: 'Favorites', href: '/dashboard/favorites', icon: HiHeart },
    { label: 'Messages', href: '/dashboard/messages', icon: HiChatAlt2 },
    { label: 'Analytics', href: '/dashboard/analytics', icon: HiChartBar },
    { label: 'Edit Profile', href: '/dashboard/profile', icon: HiUser },
  ]

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 flex-col shrink-0">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-display font-black text-sm">
            R
          </div>
          <span className="font-display font-black text-lg text-light-text dark:text-dark-text">
            Ryoit
          </span>
        </Link>

        {/* User Info */}
        <div className="mb-6 px-2 pb-6 border-b border-light-border dark:border-dark-border/40">
          <p className="font-semibold text-sm text-light-text dark:text-dark-text truncate">
            {user?.name}
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted truncate capitalize">
            {user?.role || 'User'}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-colors border border-transparent mt-auto pt-4"
        >
          <HiLogout className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-light-surface dark:bg-dark-surface p-6 flex flex-col border-r border-light-border dark:border-dark-border transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-display font-black text-sm">
              R
            </div>
            <span className="font-display font-black text-lg text-light-text dark:text-dark-text">
              Ryoit
            </span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-1 text-light-muted">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-colors border border-transparent mt-auto"
        >
          <HiLogout className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-4 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-light-muted hover:text-primary-500"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            <h2 className="font-display font-bold text-base sm:text-lg text-light-text dark:text-dark-text">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl text-light-muted hover:text-primary-500 transition-colors">
              <HiBell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-xs uppercase">
              {user?.name?.[0] || 'U'}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
